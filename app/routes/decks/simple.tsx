import { RefObject, useEffect, useRef } from "react";

function Input({
	index,
	inputsRef,
}: {
	index: number;
	inputsRef: RefObject<HTMLDivElement>;
}) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			const parent = inputsRef.current;
			const child = inputRef.current;

			if (document.activeElement === child) {
				event.preventDefault();

				console.log(parent, child);
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => window.removeEventListener("keydown", handleKeyPress);
	}, []);

	return <input ref={inputRef} id={index} type="text" />;
}

export default function Example() {
	const inputsRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={inputsRef}>
			{Array(5)
				.fill(0)
				.map((_, index) => (
					<Input key={index} index={index} inputsRef={inputsRef} />
				))}
		</div>
	);
}
