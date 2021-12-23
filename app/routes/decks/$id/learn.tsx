import {
	ActionFunction,
	Form,
	json,
	LoaderFunction,
	useLoaderData,
} from "remix";
import invariant from "tiny-invariant";

import { Input } from "~/components/Input";
import { compareTwoStrings } from "~/utils/compareTwoStrings";
import { getDailyLesson } from "~/utils/getDailyLesson";
import { Card, Deck, prisma } from "~/utils/prisma.server";

type LoaderData = { deck: Deck; card: Card | null };

export const loader: LoaderFunction = async ({ params }) => {
	const deck = await prisma.deck.findUnique({
		where: { id: params.id },
		include: { cards: { include: { responses: true } } },
	});

	if (!deck) {
		throw new Error("Deck not found");
	}

	const card = getDailyLesson(deck.cards).all[0];

	return json<LoaderData>({ deck, card });
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const cardId = formData.get("cardId");
	const response = formData.get("response");

	invariant(typeof cardId === "string");
	invariant(typeof response === "string");

	const card = await prisma.card.findUnique({ where: { id: cardId } });

	if (!card) {
		throw new Error("Card not found");
	}

	const correctness = compareTwoStrings(response, card.back);

	return prisma.response.create({ data: { correctness, cardId } });
};

export default function LearnDeckRoute() {
	const data = useLoaderData<LoaderData>();

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
			<Form method="post" replace>
				<input name="cardId" type="hidden" value={data.card.id} />
				<Input>
					<Input.Label>{data.card.front}</Input.Label>
					<Input.Field name="response" type="text" />
				</Input>
			</Form>
		</div>
	);
}
