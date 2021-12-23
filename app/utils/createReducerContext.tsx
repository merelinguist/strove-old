import { createContext, ReactNode, useContext, useReducer } from "react";

export const createReducerContext = <State, Action>(
	name: string,
	reducer: (state: State, action: Action) => State,
) => {
	const Context = createContext<
		{ state: State; dispatch: (action: Action) => void } | undefined
	>(undefined);

	Context.displayName = name;

	function Provider({
		children,
		initialState,
	}: {
		children: ReactNode;
		initialState: State;
	}) {
		const [state, dispatch] = useReducer(reducer, initialState);

		// eslint-disable-next-line react/jsx-no-constructed-context-values
		const value = { state, dispatch };

		return <Context.Provider value={value}>{children}</Context.Provider>;
	}

	const useValue = () => {
		const context = useContext(Context);

		if (context === undefined) {
			throw new Error("useValue must be used within a Provider");
		}

		return context;
	};

	return { Provider, useValue };
};
