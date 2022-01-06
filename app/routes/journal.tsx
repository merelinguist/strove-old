import { Extension, textInputRule } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import colors from "tailwindcss/colors";

const CustomDocument = Document.extend({
	content: "heading block*",
});

const Lorem = Extension.create({
	name: "lorem",

	addInputRules() {
		return [
			textInputRule({
				find: /lorem $/,
				replace:
					"Commodo ex ullamco esse nostrud excepteur Lorem veniam cillum est. Id reprehenderit minim excepteur nostrud proident consequat mollit fugiat. Irure ad id aliqua sunt. Culpa aliquip excepteur laboris fugiat reprehenderit culpa sit mollit excepteur ad ea. Culpa do do cupidatat aliqua ea est. Cupidatat exercitation veniam eu irure sint. Qui laboris reprehenderit aute labore nulla qui incididunt velit voluptate.",
			}),
		];
	},
});

export default function JournalRoute() {
	const editor = useEditor({
		extensions: [
			CustomDocument,
			StarterKit.configure({
				document: false,
			}),
			Placeholder.configure({
				placeholder: ({ node }) => {
					if (node.type.name === "heading") {
						return "What’s the title?";
					}

					return "Can you add some further context?";
				},
			}),
			Lorem,
		],
	});

	useEffect(() => {}, [editor?.getHTML()]);

	return (
		<>
			<style>
				{`
					.ProseMirror .is-empty::before {
						content: attr(data-placeholder);
						float: left;
						color: ${colors.gray["300"]};
						pointer-events: none;
						height: 0;
					}
				`}
			</style>
			<EditorContent className="prose mx-auto p-8" editor={editor} />
		</>
	);
}
