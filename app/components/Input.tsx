import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useId } from "@react-aria/utils";
import { ReactNode, useEffect } from "react";

import { createReducerContext } from "~/utils/createReducerContext";

const { Provider: InputProvider, useValue: useInput } = createReducerContext<
	{
		id: string;
		descriptionId: string | undefined;
		errorId: string | undefined;
	},
	| { type: "registerDescription" }
	| { type: "registerError" }
	| { type: "never" }
>("InputStateContext", (state, action) => {
	switch (action.type) {
		case "registerDescription": {
			return { ...state, descriptionId: `${state.id}-description` };
		}

		case "registerError": {
			return { ...state, errorId: `${state.id}-error` };
		}

		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
});

function Input({ children }: { children: ReactNode }) {
	const id = useId();

	return (
		<InputProvider
			initialState={{ id, descriptionId: undefined, errorId: undefined }}
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

function Field({ type, placeholder }: { type: string; placeholder?: string }) {
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
					name={id}
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
				name={id}
				placeholder={placeholder}
				type={type}
			/>
		</div>
	);
}

function Description({ children }: { children: ReactNode }) {
	const {
		state: { descriptionId, errorId },
		dispatch,
	} = useInput();

	useEffect(() => dispatch({ type: "registerDescription" }), []);

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
		dispatch,
	} = useInput();

	useEffect(() => dispatch({ type: "registerError" }), []);

	if (errors && errors.length > 0) {
		return (
			<p className="mt-2 text-sm text-red-600" id={errorId}>
				{errors.join(". ")}.
			</p>
		);
	}

	return null;
}

Input.Label = Label;
Input.Field = Field;
Input.Description = Description;
Input.Error = FieldError;

export { Input };
