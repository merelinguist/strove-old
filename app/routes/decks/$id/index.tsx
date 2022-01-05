import { json, LoaderFunction, useLoaderData } from "remix";

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
		throw new Response("What a joke! Not found.", { status: 404 });
	}

	return json<LoaderData>({ deck });
};

export default function ShowDeckRoute() {
	const data = useLoaderData<LoaderData>();

	return (
		<div className="prose mx-auto p-8">
			<h1>{data.deck.name}</h1>
			<ul>
				{data.deck.cards.map((card) => (
					<li key={card.id}>
						{card.front} - {card.back}
					</li>
				))}
			</ul>
		</div>
	);
}
