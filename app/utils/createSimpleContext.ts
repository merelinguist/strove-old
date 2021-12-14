import { createContext, useContext } from "react";

export const createSimpleContext = <ContextType>(name: string) => {
	const defaultValue = Symbol(`Default ${name} context value`);

	const Context = createContext<ContextType | null | typeof defaultValue>(
		defaultValue,
	);

	Context.displayName = name;

	const useValue = () => {
		const value = useContext(Context);

		if (value === defaultValue) {
			throw new Error(`use${name} must be used within ${name}Provider`);
		}

		if (!value) {
			throw new Error(
				`No value in ${name}Provider context. If the value is optional in this situation, try useOptional${name} instead of use${name}`,
			);
		}

		return value;
	};

	const useOptionalValue = () => {
		const value = useContext(Context);

		if (value === defaultValue) {
			throw new Error(`useOptional${name} must be used within ${name}Provider`);
		}

		return value;
	};

	return { Provider: Context.Provider, useValue, useOptionalValue };
};
