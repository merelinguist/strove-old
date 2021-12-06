import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";

import { Card, db, Deck } from "~/utils/db.server";

type LoaderData = {
	deck: Deck & {
		cards: Card[];
	};
};

export const loader: LoaderFunction = async ({ params }) => {
	const deck = await db.deck.findUnique({
		where: { id: params.id },
		include: { cards: true },
	});

	if (!deck) {
		throw new Error("Joke not found");
	}

	return { deck };
};

export default function ShowDeckRoute() {
	const data = useLoaderData<LoaderData>();

	return (
		<>
			<h1>{data.deck.name}</h1>
			<ul>
				{data.deck.cards.map((card) => (
					<li>
						{card.front} - {card.back}
					</li>
				))}
			</ul>
		</>
	);
}
