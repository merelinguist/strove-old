import { useMemo } from "react";
import { createEditor, Editor, Element, Point, Range, Transforms } from "slate";
import { withReact } from "slate-react";

const shortcuts: { [key: string]: Element["type"] } = {
	"*": "list-item",
	"-": "list-item",
	"+": "list-item",
	">": "blockquote",
};

const withShortcuts = (editor: Editor) => {
	const { deleteBackward, insertText } = editor;

	// eslint-disable-next-line no-param-reassign
	editor.insertText = (text) => {
		const { selection } = editor;

		if (text === " " && selection && Range.isCollapsed(selection)) {
			const { anchor } = selection;

			const block = Editor.above(editor, {
				match: (node) => Editor.isBlock(editor, node),
			});

			const path = block ? block[1] : [];
			const start = Editor.start(editor, path);
			const range = { anchor, focus: start };
			const beforeText = Editor.string(editor, range);
			const type = shortcuts[beforeText];

			if (type) {
				Transforms.select(editor, range);
				Transforms.delete(editor);

				const newProperties: Partial<Element> = {
					type,
				};

				Transforms.setNodes<Element>(editor, newProperties, {
					match: (node) => Editor.isBlock(editor, node),
				});

				if (type === "list-item") {
					const list: Element = {
						type: "unordered-list",
						children: [],
					};

					Transforms.wrapNodes(editor, list, {
						match: (node) =>
							!Editor.isEditor(node) &&
							Element.isElement(node) &&
							node.type === "list-item",
					});
				}

				return;
			}
		}

		insertText(text);
	};

	// eslint-disable-next-line no-param-reassign
	editor.deleteBackward = (...args) => {
		const { selection } = editor;

		if (selection && Range.isCollapsed(selection)) {
			const match = Editor.above(editor, {
				match: (node) => Editor.isBlock(editor, node),
			});

			if (match) {
				const [block, path] = match;
				const start = Editor.start(editor, path);

				if (
					!Editor.isEditor(block) &&
					Element.isElement(block) &&
					block.type !== "paragraph" &&
					Point.equals(selection.anchor, start)
				) {
					const newProperties: Partial<Element> = {
						type: "paragraph",
					};

					Transforms.setNodes(editor, newProperties);

					if (block.type === "list-item") {
						Transforms.unwrapNodes(editor, {
							match: (node) =>
								!Editor.isEditor(node) &&
								Element.isElement(node) &&
								node.type === "unordered-list",
							split: true,
						});
					}

					return;
				}
			}

			deleteBackward(...args);
		}
	};

	return editor;
};

export const useEditor = () =>
	useMemo(() => withShortcuts(withReact(createEditor())), []);
