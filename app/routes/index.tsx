import { json, Link, LoaderFunction, useLoaderData } from "remix";

import { getDailyLesson } from "~/utils/getDailyLesson";
import { Card, Deck, prisma, Response } from "~/utils/prisma.server";

type LoaderData = {
	decks: (Deck & {
		cards: (Card & {
			responses: Response[];
		})[];
	})[];
};

export const loader: LoaderFunction = async () => {
	const decks = await prisma.deck.findMany({
		include: { cards: { include: { responses: true } } },
	});

	return json<LoaderData>({ decks });
};

export default function IndexRoute() {
	const data = useLoaderData<LoaderData>();

	return (
		<div className="prose mx-auto p-8">
			<h1>Index</h1>
			<p>
				Labore ipsum non velit fugiat voluptate ad id. Exercitation ut et sit
				ipsum ut magna duis aute culpa Lorem eu culpa qui. Laboris tempor qui
				qui mollit do esse duis voluptate reprehenderit velit. Non cillum ea
				Lorem ullamco. Commodo irure veniam voluptate ea magna. Nisi consectetur
				Lorem aliqua nulla elit mollit sunt deserunt fugiat esse.
			</p>
			<h2>Pages</h2>
			<ul>
				<li>
					<Link to="/components">Components</Link>
				</li>
			</ul>
			<h2>Decks</h2>
			<ul>
				{data.decks.map((deck) => (
					<li key={deck.id}>
						<Link to={`/decks/${deck.id}/learn`}>{deck.name}</Link>
						<p>New: {getDailyLesson(deck.cards).new.length}</p>
						<p>Review: {getDailyLesson(deck.cards).review.length}</p>

						<pre>{JSON.stringify(getDailyLesson(deck.cards), null, 2)}</pre>
					</li>
				))}
			</ul>
		</div>
	);
}
