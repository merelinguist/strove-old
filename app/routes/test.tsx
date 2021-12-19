import { useState } from "react";
import { LoaderFunction, useLoaderData } from "remix";

import { Note, prisma } from "~/utils/prisma.server";

type LoaderData = {
	note: Note;
};

export const loader: LoaderFunction = async () => {
	const notes = await prisma.note.findMany();

	const note = notes[0];

	if (!note) {
		throw new Error("no note");
	}

	return { note };
};

export default function App() {
	const data = useLoaderData<LoaderData>();

	const [value] = useState(data.note.body);

	return (
		<div className="prose mx-auto p-8">
			<pre>{JSON.stringify(value, null, 2)}</pre>
		</div>
	);
}
