import { json, Link, LoaderFunction, useLoaderData } from "remix";

import { Card, db, Deck, User } from "~/utils/db.server";

type LoaderData = {
	decks: (Deck & {
		user: User;
		cards: Card[];
	})[];
};

export const loader: LoaderFunction = async () => {
	const decks = await db.deck.findMany({
		include: { user: true, cards: true },
	});

	return json({ decks });
};

export default function IndexRoute() {
	const data = useLoaderData<LoaderData>();

	return (
		<>
			<h1>Decks</h1>
			<ul>
				{data.decks.map((deck) => (
					<li>
						<Link to={`/decks/${deck.id}`}>{deck.name}</Link>
						<p>
							{deck.cards.length} cards created by{" "}
							<Link to={`/users/${deck.user.id}`}>{deck.user.name}</Link>
						</p>
					</li>
				))}
			</ul>
		</>
	);
}
