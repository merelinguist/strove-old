import { Descendant as SlateDescendant, Element as SlateElement } from "slate";
import { z } from "zod";

type UnionToIntersection<U> = (
	U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
	? I
	: never;

type LastOf<T> = UnionToIntersection<
	T extends unknown ? () => T : never
> extends () => infer R
	? R
	: never;

type Push<T extends unknown[], V> = [...T, V];

type TuplifyUnion<
	T,
	L = LastOf<T>,
	N = [T] extends [never] ? true : false,
> = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>;

const types: TuplifyUnion<SlateElement["type"]> = [
	"unordered-list",
	"list-item",
	"blockquote",
	"paragraph",
];

const Text = z.object({ text: z.string() });

const Element: z.Schema<SlateElement> = z.lazy(() =>
	z.object({
		type: z.enum(types),
		children: z.array(z.union([Text, Element])),
	}),
);

const Slate = z.array(z.union([Text, Element]));

export const JSONToSlate = (json: string): SlateDescendant[] => {
	const slate = JSON.parse(json);

	const result = Slate.safeParse(slate);

	if (!result.success) {
		throw new Error("not a valid slate schema");
	}

	return result.data;
};

export const slateToJSON = (slate: SlateDescendant[]) => JSON.stringify(slate);
