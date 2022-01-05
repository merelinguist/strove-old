import { nanoid } from "nanoid";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";

import { Input } from "~/components/Input";
import { managedEventListener } from "~/utils/managedEventListener";

type Card = { id: string; front: string; back: string };

export function CardEditor({
	cardsRef,
	cards,
	setCards,
	card,
	index,
}: {
	cardsRef: RefObject<HTMLDivElement>;
	cards: Card[];
	setCards: Dispatch<SetStateAction<Card[]>>;
	card: Card;
	index: number;
}) {
	const fieldsetRef = useRef<HTMLFieldSetElement>(null);
	const backRef = useRef<HTMLInputElement>(null);

	useEffect(
		() =>
			managedEventListener(window, "keydown", (event) => {
				const parent = cardsRef.current;
				const child = fieldsetRef.current;
				const back = backRef.current;

				if (
					event.key === "Tab" &&
					document.activeElement instanceof HTMLInputElement &&
					parent &&
					child &&
					back &&
					document.activeElement === back &&
					child.contains(document.activeElement) &&
					[...parent.children].indexOf(child) === parent.children.length - 1
				) {
					setCards([...cards, { id: nanoid(), front: "", back: "" }]);
				}
			}),
		[cards],
	);

	return (
		<fieldset
			ref={fieldsetRef}
			className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
		>
			<div className="px-4 py-5 sm:px-6">
				<span>
					<legend>{index + 1}</legend>
				</span>
			</div>
			<div className="px-4 py-5 sm:p-6 grid grid-cols-2 gap-x-4">
				<Input>
					<Input.Label>Front</Input.Label>
					<Input.Field defaultValue={card.front} name="front" type="text" />
				</Input>
				<Input>
					<Input.Label>Back</Input.Label>
					<Input.Field
						ref={backRef}
						defaultValue={card.back}
						name="back"
						type="text"
					/>
				</Input>
			</div>
		</fieldset>
	);
}
