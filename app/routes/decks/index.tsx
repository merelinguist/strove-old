import { matchSorter } from "match-sorter";
import { Form, json, Link, LoaderFunction, useLoaderData } from "remix";

import { getDailyLesson } from "~/utils/getDailyLesson";
import { Card, Deck, prisma, Response } from "~/utils/prisma.server";
import { routes } from "~/utils/routes";

type LoaderData = {
	status: "resultsFound" | "noResults" | "emptySearch";
	searchTerm: string;
	decks: (Deck & {
		cards: (Card & {
			responses: Response[];
		})[];
	})[];
};

export const loader: LoaderFunction = async ({ request }) => {
	const decks = await prisma.deck.findMany({
		include: { cards: { include: { responses: true } } },
	});

	const url = new URL(request.url);
	const searchTerm = url.searchParams.get("search");

	if (!searchTerm) {
		return json<LoaderData>({
			status: "emptySearch",
			searchTerm: searchTerm || "",
			decks,
		});
	}

	const results = matchSorter(decks, searchTerm, { keys: ["name"] });

	if (results.length === 0) {
		return json<LoaderData>({
			status: "noResults",
			searchTerm,
			decks: results,
		});
	}

	return json<LoaderData>({
		status: "resultsFound",
		searchTerm,
		decks: results,
	});
};

export default function DecksRoute() {
	const data = useLoaderData<LoaderData>();

	return (
		<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
			<h3 className="text-xl font-medium">Decks</h3>
			<div className="mt-6 border divide-y rounded-lg overflow-hidden">
				<Form method="get">
					<input
						className="w-full border-0 focus:ring-0 px-4 py-5 sm:px-6"
						name="search"
						placeholder="Search..."
						type="search"
					/>
				</Form>

				{data.status === "noResults" && (
					<p className="px-4 py-5 sm:p-6">
						Ooops, no results{" "}
						<span aria-label="crying emoji" role="img">
							😢
						</span>
					</p>
				)}

				{data.decks.map((deck) => (
					<Link
						className="block px-4 py-5 sm:p-6"
						to={routes.decks.lesson(deck.id)}
					>
						<h3 className="text-lg font-medium">{deck.name}</h3>
						<p className="mt-1 text-sm text-gray-500">
							<span className="text-gray-900 font-medium">
								{deck.cards.length}
							</span>{" "}
							cards.{" "}
							<span className="text-gray-900 font-medium">
								{getDailyLesson(deck.cards).all.length}
							</span>{" "}
							to learn.
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}
