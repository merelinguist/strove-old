import {
  ComponentProps,
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useMemo,
} from "react";

const InputStateContext = createContext<{ id: string } | undefined>(undefined);

function InputProvider({ children }: { children: ReactNode }) {
  const id = "";

  const value = useMemo(() => ({ id }), []);

  return (
    <InputStateContext.Provider value={value}>
      {children}
    </InputStateContext.Provider>
  );
}

function useInput() {
  const context = useContext(InputStateContext);

  if (!context) {
    throw new Error("useInput must be used within a InputProvider");
  }

  return context;
}

export function Input({ children }: { children: ReactNode }) {
  return (
    <InputProvider>
      <div>{children}</div>
    </InputProvider>
  );
}

function Label(props: Omit<ComponentProps<"label">, "className" | "htmlFor">) {
  const { id } = useInput();

  return (
    <label
      {...props}
      htmlFor={id}
      className="block text-sm font-medium text-gray-700"
    />
  );
}

Input.Label = Label;

const Field = forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<"input">, "className" | "id">
>((props, ref) => {
  const { id } = useInput();

  return (
    <div className="mt-1">
      <input
        ref={ref}
        {...props}
        id={id}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  );
});

Input.Field = Field;
