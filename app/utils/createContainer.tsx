import React, { createContext, useContext } from "react";

const EMPTY: unique symbol = Symbol("EMPTY");

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type ContainerProviderProps<State = void> = {
  initialState?: State;
  children: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type Container<Value, State = void> = {
  Provider: React.ComponentType<ContainerProviderProps<State>>;
  useContainer: () => Value;
};

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const createContainer = <Value, State = void>(
  useHook: (initialState?: State) => Value,
): Container<Value, State> => {
  const Context = createContext<Value | typeof EMPTY>(EMPTY);

  function Provider({ initialState, children }: ContainerProviderProps<State>) {
    const value = useHook(initialState);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function createUseContainer(): Value {
    const value = useContext(Context);

    if (value === EMPTY) {
      throw new Error("Component must be wrapped with <Container.Provider>");
    }

    return value;
  }

  return { Provider, useContainer: createUseContainer };
};

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const useContainer = <Value, State = void>(
  container: Container<Value, State>,
): Value => container.useContainer();
