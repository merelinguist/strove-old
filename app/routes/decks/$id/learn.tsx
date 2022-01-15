import {
	ActionFunction,
	Form,
	json,
	Link,
	LoaderFunction,
	useActionData,
	useLoaderData,
} from "remix";
import invariant from "tiny-invariant";

import { Input } from "~/components/Input";
import { Answer, Card, db, Deck } from "~/utils/db.server";
import { routes } from "~/utils/routes";
import { compareTwoStrings } from "~/utils/string/compareTwoStrings";

type LoaderData = { deck: Deck; card: Card | null };

export const loader: LoaderFunction = async ({ params }) => {
	const deck = await db.deck.findUnique({
		where: { id: params.id },
		include: { cards: true },
	});

	if (!deck) {
		throw new Error("Deck not found");
	}

	const card = deck.cards[Math.floor(Math.random() * deck.cards.length)];

	return json<LoaderData>({ deck, card });
};

type ActionData = { correctness?: number; answer?: Answer };

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const cardId = formData.get("cardId");
	const answer = formData.get("answer");

	invariant(typeof cardId === "string");
	invariant(typeof answer === "string");

	const card = await db.card.findUnique({ where: { id: cardId } });

	if (!card) {
		throw new Error("Card not found");
	}

	const correctness = compareTwoStrings(answer, card.back);

	return json<ActionData>({
		correctness,
		answer: await db.answer.create({
			data: { correctness, cardId },
		}),
	});
};

export default function LearnDeckRoute() {
	const data = useLoaderData<LoaderData>();
	const actionData = useActionData<ActionData>();

	if (!data.card) {
		return (
			<main className="px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
				<div className="max-w-3xl mx-auto">
					<div className="max-w-xl">
						<h1 className="text-sm font-semibold uppercase tracking-wide text-blue-600">
							Congrats!
						</h1>
						<p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
							It’s on the way!
						</p>
						<p className="mt-2 text-base text-gray-500">
							Your order #14034056 has shipped and will be with you soon.
						</p>
						<div className="mt-12">
							<Link
								className="text-sm font-medium text-blue-600"
								to={routes.decks.index}
							>
								Go home →
							</Link>
						</div>
					</div>
				</div>
			</main>
		);
	}

	return (
		<div className="prose mx-auto p-8">
			<h1>Learn {data.deck.name}</h1>
			<p>
				Eiusmod laboris ut ad esse duis aute occaecat ut nulla id sunt nisi anim
				eiusmod. Culpa occaecat anim quis non id sint labore laboris dolore
				laboris et ad amet amet.
			</p>
			{actionData?.correctness && (
				<p>{actionData.correctness > 0.5 ? "Correct" : "Incorrect"}</p>
			)}
			<Form method="post" replace>
				<input name="cardId" type="hidden" value={data.card.id} />
				<Input>
					<Input.Label>{data.card.front}</Input.Label>
					<Input.Field name="answer" type="text" />
				</Input>
			</Form>
		</div>
	);
}
