import { useCallback, useState } from "react";
import {
	ActionFunction,
	LoaderFunction,
	useFetcher,
	useLoaderData,
} from "remix";
import { Descendant, Node } from "slate";
import { Editable, RenderElementProps, Slate } from "slate-react";

import { captureKeys } from "~/utils/captureKeys";
import { Note, prisma } from "~/utils/prisma.server";
import { useEditor } from "~/utils/useEditor";

type LoaderData = {
	note: Note;
};

export const loader: LoaderFunction = async () => {
	const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } });

	const note = notes[0];

	if (!note) {
		throw new Error("no note");
	}

	return { note };
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const id = formData.get("id");
	const body = formData.get("body");

	if (typeof id !== "string") {
		throw new Error("id is not a string");
	}

	if (typeof body !== "string") {
		throw new Error("body is not a string");
	}

	const note = await prisma.note.update({ where: { id }, data: { body } });

	return note;
};

const serialize = (nodes: Descendant[]) => {
	return nodes.map((node) => Node.string(node)).join("\n");
};

const deserialize = (string: string): Descendant[] => {
	return string
		.split("\n")
		.map((line) => ({ type: "paragraph", children: [{ text: line }] }));
};

export default function App() {
	const data = useLoaderData<LoaderData>();
	const fetcher = useFetcher();

	const editor = useEditor();
	const [value, setValue] = useState<Descendant[]>(deserialize(data.note.body));

	const renderElement = useCallback(
		({ element, attributes, children }: RenderElementProps) => {
			switch (element.type) {
				case "unordered-list":
					return <ul {...attributes}>{children}</ul>;
				case "list-item":
					return <li {...attributes}>{children}</li>;
				case "blockquote":
					return <blockquote {...attributes}>{children}</blockquote>;
				default:
					return <p {...attributes}>{children}</p>;
			}
		},
		[],
	);

	return (
		<Slate
			editor={editor}
			onChange={(newValue) => {
				setValue(newValue);
				fetcher.submit(
					{ id: data.note.id, body: serialize(newValue) },
					{ method: "post", action: "?index" },
				);
			}}
			value={value}
		>
			<div className="py-8 px-4 sm:px-6 lg:px-8">
				<div className="prose mx-auto">
					<h1>Hello world</h1>
				</div>
				<Editable
					className="prose mx-auto mt-5"
					onKeyDown={(event) => {
						if (captureKeys("CmdOrCtrl", "l")(event)) {
							event.preventDefault();
							editor.insertText(
								"Ea ea tempor aliqua ipsum non nisi ea Lorem. In non elit Lorem exercitation tempor laboris incididunt occaecat qui. Eiusmod elit minim tempor incididunt nisi cillum esse excepteur nostrud dolor est do culpa. Adipisicing eiusmod ex adipisicing ut nulla dolore occaecat aute aliqua exercitation sunt. Aute ipsum est anim eiusmod culpa laborum ex cupidatat consequat consequat do aliqua Lorem incididunt. Ea exercitation qui do labore consectetur laboris et ex cillum ullamco. Elit nostrud nostrud commodo culpa eiusmod Lorem dolor proident non culpa reprehenderit Lorem cillum consectetur.",
							);
						}
					}}
					renderElement={renderElement}
				/>
			</div>
		</Slate>
	);
}
