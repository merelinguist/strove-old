import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useId } from "@react-aria/utils";
import { ReactNode, useEffect, useState } from "react";

import { createContainer } from "~/utils/createContainer";

const { Provider: InputProvider, useContainer: useInput } = createContainer(
	(
		initialState: {
			id: string | undefined;
			descriptionId: string | undefined;
			errorId: string | undefined;
		} = { id: undefined, descriptionId: undefined, errorId: undefined },
	) => {
		const [state, setState] = useState(initialState);

		const registerDescription = () =>
			setState({ ...state, descriptionId: `${state.id}-description` });

		const registerError = () =>
			setState({ ...state, errorId: `${state.id}-error` });

		return { state, registerDescription, registerError };
	},
);

function Input({ children }: { children: ReactNode }) {
	const id = useId();

	return (
		<InputProvider
			initialState={{
				id,
				descriptionId: undefined,
				errorId: undefined,
			}}
		>
			<div>{children}</div>
		</InputProvider>
	);
}

function Label({ children }: { children: ReactNode }) {
	const { state } = useInput();

	return (
		<label
			className="block text-sm font-medium text-gray-700"
			htmlFor={state.id}
		>
			{children}
		</label>
	);
}

function Field({
	type,
	placeholder,
	name,
}: {
	type: string;
	placeholder?: string;
	name?: string;
}) {
	const {
		state: { id, descriptionId, errorId },
	} = useInput();

	if (errorId) {
		return (
			<div className="relative mt-1 rounded-md shadow-sm">
				<input
					aria-describedby={errorId}
					aria-invalid
					className="block pr-10 w-full sm:text-sm placeholder-red-300 text-red-900 rounded-md border-red-300 focus:border-red-500 focus:ring-red-500 focus:outline-none"
					id={id}
					name={name}
					placeholder={placeholder}
					type={type}
				/>
				<div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
					<ExclamationCircleIcon aria-hidden className="w-5 h-5 text-red-500" />
				</div>
			</div>
		);
	}

	return (
		<div className="mt-1">
			<input
				aria-describedby={descriptionId}
				className="block w-full sm:text-sm rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
				id={id}
				name={name}
				placeholder={placeholder}
				type={type}
			/>
		</div>
	);
}

function Description({ children }: { children: ReactNode }) {
	const {
		state: { descriptionId, errorId },
		registerDescription,
	} = useInput();

	useEffect(() => registerDescription(), []);

	if (!errorId) {
		return (
			<p className="mt-2 text-sm text-gray-500" id={descriptionId}>
				{children}
			</p>
		);
	}

	return null;
}

function FieldError({ children: errors }: { children?: string[] }) {
	const {
		state: { errorId },
		registerError,
	} = useInput();

	useEffect(() => registerError(), []);

	if (errors && errors.length > 0) {
		return (
			<p className="mt-2 text-sm text-red-600" id={errorId}>
				{errors.join(". ")}.
			</p>
		);
	}

	return null;
}

FieldError.displayName = "Error";

Input.Label = Label;
Input.Field = Field;
Input.Description = Description;
Input.Error = FieldError;

export { Input };
