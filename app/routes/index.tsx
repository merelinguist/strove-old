import type { LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";

import { db } from "~/utils/db.server";

type IndexData = {
	resources: { name: string; url: string }[];
	demos: { name: string; to: string }[];
};

export const loader: LoaderFunction = async () => {
	const decks = await db.deck.findMany();

	return json(decks);
};

export default function IndexRoute() {
	const decks = useLoaderData<IndexData>();

	return (
		<>
			<h1>Welcome to Strove!</h1>
			<pre>{JSON.stringify(decks, null, 2)}</pre>
		</>
	);
}
