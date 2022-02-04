import { forwardRef, HTMLProps, ReactNode } from "react";

const Input = ({ children }: { children: ReactNode }) => (
  <label className="block">{children}</label>
);

const Label = ({ children }: { children: ReactNode }) => (
  <span className="block font-medium text-gray-700">{children}</span>
);

const Field = forwardRef<
  HTMLInputElement,
  Omit<
    HTMLProps<HTMLInputElement>,
    "aria-describedby" | "aria-invalid" | "className" | "id"
  > & { type: string }
>(({ type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className="block mt-1 w-full placeholder:text-gray-400 disabled:text-gray-500 bg-white disabled:bg-gray-50 rounded-md border border-gray-300 focus:border-sky-500 disabled:border-gray-200 focus:outline-none focus:ring-1 focus:ring-sky-500 shadow-sm disabled:shadow-none"
      type={type}
      {...props}
    />
  );
});

Input.Label = Label;
Input.Field = Field;

export { Input };
