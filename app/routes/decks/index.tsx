import { json, Link, LoaderFunction, useLoaderData } from "remix";

import { routes } from "~/utils/routes";
import { db, Deck } from "~/utils/server/db.server";

type LoaderData = { decks: Deck[] };

export const loader: LoaderFunction = async () => {
	const decks = await db.deck.findMany();

	return json<LoaderData>({ decks });
};

export default function Example() {
	const data = useLoaderData<LoaderData>();

	return (
		<>
			<h1 className="text-2xl font-bold">My decks</h1>
			<div className="mt-2 prose text-gray-600 max-w-3xl">
				<p>
					Lorem est ullamco reprehenderit et duis dolore fugiat nostrud
					consectetur. Fugiat ea officia nostrud elit excepteur aliquip ex
					nostrud Lorem non et non adipisicing.
				</p>
			</div>

			<ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6">
				{data.decks.map((deck) => (
					<li key={deck.id} className="border p-4 rounded-md">
						<Link className="group" to={routes.decks.show(deck.id)}>
							<p className="font-semibold group-hover:text-gray-600">
								{deck.name}
							</p>
							<div className="mt-1 prose prose-sm text-gray-600">
								<p>
									Sunt non proident dolor labore et aliqua tempor et laboris.
								</p>
							</div>
						</Link>
					</li>
				))}
				<li className="border p-4 rounded-md">
					<Link className="group" to={routes.decks.new}>
						<p className="font-semibold group-hover:text-gray-600">New deck</p>
						<div className="mt-1 prose prose-sm text-gray-600">
							<p>Sunt non proident dolor labore et aliqua tempor et laboris.</p>
						</div>
					</Link>
				</li>
			</ul>
		</>
	);
}
