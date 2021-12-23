import { Dialog, Tab, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { json, Link, LoaderFunction, useLoaderData } from "remix";

import { classNames } from "~/utils/classNames";
import { getDailyLesson } from "~/utils/getDailyLesson";
import { Card, Deck, prisma, Response } from "~/utils/prisma.server";
import { routes } from "~/utils/routes";

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

export default function DecksRoute() {
	const data = useLoaderData<LoaderData>();

	return (
		<div className="flex min-h-screen">
			<div className="w-72 bg-gray-50 hidden lg:block">Hello</div>
			<div className="shadow flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mx-auto max-w-lg lg:max-w-none grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
					{data.decks.map((deck) => (
						<div>
							<Link className="block" to="/">
								<p className="text-lg font-medium leading-6">{deck.name}</p>
								<p className="mt-1 text-sm text-gray-500">
									Lorem ipsum dolor sit amet consectetur adipisicing elit quam
									corrupti consectetur.
								</p>
							</Link>
							<div className="mt-3">
								<Link
									className="text-sm font-semibold text-blue-600 hover:text-blue-500"
									to={routes.decks.learn(deck.id)}
								>
									Read full story
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
