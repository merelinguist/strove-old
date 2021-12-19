import { useCallback, useState } from "react";
import {
	ActionFunction,
	LoaderFunction,
	useFetcher,
	useLoaderData,
} from "remix";
import { Descendant } from "slate";
import { Editable, RenderElementProps, Slate } from "slate-react";

import { captureKeys } from "~/utils/captureKeys";
import { Note, prisma } from "~/utils/prisma.server";
import { JSONToSlate, slateToJSON } from "~/utils/slateSerializers";
import { useEditor } from "~/utils/useEditor";

type LoaderData = {
	note: Note & { slate: Descendant[] };
};

export const loader: LoaderFunction = async () => {
	const notes = await prisma.note.findMany({ orderBy: { createdAt: "desc" } });

	const note = notes[0];

	if (!note) {
		throw new Error("no note");
	}

	const noteWithSlate = Object.assign(note, { slate: JSONToSlate(note.body) });

	return { note: noteWithSlate };
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

export default function App() {
	const data = useLoaderData<LoaderData>();
	const fetcher = useFetcher();

	const editor = useEditor();
	const [value, setValue] = useState<Descendant[]>(data.note.slate);

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
					{ id: data.note.id, body: slateToJSON(newValue) },
					{ method: "post", action: "?index" },
				);
			}}
			value={value}
		>
			<div className="bg-white h-full overflow-y-scroll">
				<div className="prose mx-auto px-6 pt-8">
					<h1>Hello world</h1>
				</div>
				<Editable
					className="prose mx-auto mt-5 px-6"
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
