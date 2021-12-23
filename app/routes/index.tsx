import { json, Link, LoaderFunction, useLoaderData } from "remix";

import { Deck, prisma } from "~/utils/prisma.server";

type LoaderData = { decks: Deck[] };

export const loader: LoaderFunction = async () => {
	const decks = await prisma.deck.findMany();

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
						<Link to="/components">{deck.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
