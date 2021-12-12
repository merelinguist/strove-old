import { json, Link, LoaderFunction, useLoaderData } from "remix";

import { Deck, prisma, User } from "~/utils/prisma.server";

type LoaderData = {
	decks: (Deck & {
		user: User;
		_count: {
			cards: number;
		};
	})[];
};

const decks = prisma.deck.findMany({
	include: { user: true, _count: { select: { cards: true } } },
});

const a = json({ decks });

export const loader: LoaderFunction = async () => {
	const decks = await prisma.deck.findMany({
		include: { user: true, _count: { select: { cards: true } } },
	});

	return json({ decks });
};

export default function IndexRoute() {
	const data = useLoaderData<LoaderData>();

	const lesson = data.decks.map((deck) => deck.id).join(";");

	return (
		<>
			<h1>Decks</h1>
			<ul>
				{data.decks.map((deck) => (
					<li key={deck.id}>
						<Link to={`/decks/${deck.id}`}>{deck.name}</Link>
						<div className="px-4 py-3 text-sm text-green-700 bg-green-500 rounded-md dark:text-green-400 bg-opacity-10">
							Hello
						</div>
						<p>
							{/* eslint-disable-next-line no-underscore-dangle */}
							{deck._count.cards} cards created by{" "}
							<Link to={`/users/${deck.user.id}`}>{deck.user.name}</Link>
						</p>
					</li>
				))}
			</ul>
		</>
	);
}
