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
				<li className="flex">
					<Link
						className="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium p-4"
						to={routes.decks.new}
					>
						<svg
							aria-hidden="true"
							className="group-hover:text-blue-500 mb-1 text-slate-400"
							fill="currentColor"
							height="20"
							width="20"
						>
							<path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
						</svg>
						New project
					</Link>
				</li>
			</ul>
		</>
	);
}
