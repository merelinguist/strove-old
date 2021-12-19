import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

type CustomElement =
	| { type: "unordered-list"; children: Descendant[] }
	| { type: "list-item"; children: Descendant[] }
	| { type: "blockquote"; children: Descendant[] }
	| { type: "paragraph"; children: Descendant[] };

type CustomText = { text: string };

declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
