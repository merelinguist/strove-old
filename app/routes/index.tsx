import { Tab } from "@headlessui/react";
import {
	CalendarIcon,
	ChartBarIcon,
	FolderIcon,
	HomeIcon,
	InboxIcon,
	UsersIcon,
} from "@heroicons/react/outline";
import { Fragment } from "react";
import { json, Link, LoaderFunction, useLoaderData } from "remix";

import { classNames } from "~/utils/classNames";
import { db, Deck } from "~/utils/db.server";
import { routes } from "~/utils/routes";

type LoaderData = { decks: Deck[] };

export const loader: LoaderFunction = async ({ request }) => {
	const decks = await db.deck.findMany();

	return json<LoaderData>({ decks });
};

const navigation = [
	{ name: "Dashboard", href: "#", icon: HomeIcon, current: true },
	{ name: "Team", href: "#", icon: UsersIcon, current: false },
	{ name: "Projects", href: "#", icon: FolderIcon, current: false },
	{ name: "Calendar", href: "#", icon: CalendarIcon, current: false },
	{ name: "Documents", href: "#", icon: InboxIcon, current: false },
	{ name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];

export default function Example() {
	const data = useLoaderData<LoaderData>();

	return (
		<>
			<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
				<div className="flex-1 flex flex-col min-h-0 bg-gray-50" />
			</div>
			<div className="md:pl-64 flex flex-col flex-1">
				<main className="flex-1">
					<div className="max-w-7xl py-8 mx-auto px-4 sm:px-6 md:px-8">
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
									<Link to={routes.decks.show(deck.id)}>
										<p className="font-semibold">{deck.name}</p>
										<div className="mt-1 prose prose-sm text-gray-600">
											<p>
												Sunt non proident dolor labore et aliqua tempor et
												laboris.
											</p>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</main>
			</div>
		</>
	);
}
