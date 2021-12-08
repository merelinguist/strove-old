import { Link, LoaderFunction } from "remix";
import { useLoaderData } from "remix";

import { Card, Deck, Response, prisma } from "~/utils/prisma.server";
import { routes } from "~/utils/routes";
import { score } from "~/utils/score";

type LoaderData = {
	deck: Deck & {
		cards: (Card & {
			responses: Response[];
		})[];
	};
};

export const loader: LoaderFunction = async ({ params }) => {
	const deck = await prisma.deck.findUnique({
		where: { id: params.id },
		include: { cards: { include: { responses: true } } },
	});

	if (!deck) {
		throw new Error("Deck not found");
	}

	deck.cards.sort(
		(cardA, cardB) => score(cardA.responses) - score(cardB.responses),
	);

	return { deck };
};

export default function ShowDeckRoute() {
	const data = useLoaderData<LoaderData>();

	return (
		<>
			<h1>{data.deck.name}</h1>
			<Link to={routes.decks.quiz(data.deck.id)}>Start learning</Link>
			<ul>
				{data.deck.cards.map((card) => (
					<li>
						{card.front} - {card.back} - {score(card.responses).toPrecision(2)}
					</li>
				))}
			</ul>
		</>
	);
}
