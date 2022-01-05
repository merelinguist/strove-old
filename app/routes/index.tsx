import { Form, json, Link, LoaderFunction, useLoaderData } from "remix";

import { Answer, Card, db, Deck } from "~/utils/db.server";
import { getDailyLesson } from "~/utils/getDailyLesson";
import { routes } from "~/utils/routes";
import { getUserId } from "~/utils/session.server";

type LoaderData = {
	userId: string | null;
	decks: (Deck & {
		cards: (Card & {
			answers: Answer[];
		})[];
	})[];
};

export const loader: LoaderFunction = async ({ request }) => {
	const userId = await getUserId(request);

	const decks = await db.deck.findMany({
		include: { cards: { include: { answers: true } } },
	});

	return json<LoaderData>({ userId, decks });
};

export default function IndexRoute() {
	const data = useLoaderData<LoaderData>();

	return (
		<div className="prose mx-auto p-8">
			<ul>
				<li>
					<Link to={routes.index}>Home</Link>
				</li>
				{data.userId ? (
					<>
						<li>
							<Link to={routes.me}>Profile</Link>
						</li>
						<li>
							<Form action={routes.logout} method="post">
								<button className="" type="submit">
									Logout
								</button>
							</Form>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to={routes.login}>Login</Link>
						</li>
						<li>
							<Link to={routes.register}>Register</Link>
						</li>
					</>
				)}
			</ul>
			<h1>Index</h1>
			<p>
				Labore ipsum non velit fugiat voluptate ad id. Exercitation ut et sit
				ipsum ut magna duis aute culpa Lorem eu culpa qui. Laboris tempor qui
				qui mollit do esse duis voluptate reprehenderit velit. Non cillum ea
				Lorem ullamco. Commodo irure veniam voluptate ea magna. Nisi consectetur
				Lorem aliqua nulla elit mollit sunt deserunt fugiat esse.
			</p>
			<h2>Decks</h2>
			<Link to={routes.decks.new}>New Deck</Link>
			<ul>
				{data.decks.map((deck) => (
					<li key={deck.id}>
						<Link to={`/decks/${deck.id}/lesson`}>
							{deck.name} - {getDailyLesson(deck.cards).new.length},{" "}
							{getDailyLesson(deck.cards).review.length}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
