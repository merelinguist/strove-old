import {
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { ActionFunction, redirect } from "remix";
import { z } from "zod";

import { Input } from "~/components/Input";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";

const Cards = z.array(z.object({ front: z.string(), back: z.string() }));

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const fields = Array.from(formData).map(([key, value]) => ({ [key]: value }));

	const halfLength = Math.floor(fields.length / 2);

	const front = fields.slice(0, halfLength);
	const back = fields.slice(halfLength, fields.length);

	const result = Cards.safeParse(
		front.map((child, index) => ({ ...child, ...back[index] })),
	);

	if (!result.success) {
		throw new Error(
			'cards must be an array of objects with "front" and "back" keys',
		);
	}

	const userId = await requireUserId(request);

	const cards = result.data.filter(
		(card) => card.front.length > 0 && card.back.length > 0,
	);

	const deck = await db.deck.create({
		data: {
			name: "Basics",
			userId,
			cards: { createMany: { data: cards } },
		},
	});

	return redirect(`/decks/${deck.id}`);
};

function CardEditor({
	cardsRef,
	cards,
	setCards,
	card,
	index,
}: {
	cardsRef: RefObject<HTMLDivElement>;
	cards: { front: string; back: string }[];
	setCards: Dispatch<SetStateAction<{ front: string; back: string }[]>>;
	card: { front: string; back: string };
	index: number;
}) {
	const fieldsetRef = useRef<HTMLFieldSetElement>(null);
	const backRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			const parent = cardsRef.current;
			const child = fieldsetRef.current;
			const back = backRef.current;

			if (
				event.key === "Tab" &&
				document.activeElement instanceof HTMLInputElement &&
				parent &&
				child &&
				back &&
				document.activeElement === back &&
				child.contains(document.activeElement) &&
				[...parent.children].indexOf(child) === parent.children.length - 1
			) {
				setCards([...cards, { front: "", back: "" }]);
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [cards]);

	return (
		<fieldset
			ref={fieldsetRef}
			className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
			id={index.toString()}
		>
			<div className="px-4 py-5 sm:px-6">
				<span>
					<legend>{index + 1}</legend>
				</span>
			</div>
			<div className="px-4 py-5 sm:p-6 grid grid-cols-2 gap-x-4">
				<Input>
					<Input.Label>Front</Input.Label>
					<Input.Field defaultValue={card.front} name="front" type="text" />
				</Input>
				<Input>
					<Input.Label>Back</Input.Label>
					<Input.Field
						ref={backRef}
						defaultValue={card.back}
						name="back"
						type="text"
					/>
				</Input>
			</div>
		</fieldset>
	);
}

export default function NewDeckRoute() {
	const cardsRef = useRef<HTMLDivElement>(null);

	const [cards, setCards] = useState([
		{ front: "puer", back: "puer" },
		{ front: "puella", back: "girl" },
	]);

	return (
		<form className="bg-gray-50 max-w-3xl space-y-10 mx-auto p-8" method="post">
			<div ref={cardsRef} className="space-y-10">
				{cards.map((card, index) => (
					<CardEditor
						key={index}
						card={card}
						cards={cards}
						cardsRef={cardsRef}
						index={index}
						setCards={setCards}
					/>
				))}
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}
