import {
  forwardRef,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

export function Input({ children }: { children: ReactNode }) {
  return <label className="block">{children}</label>;
}

function Label(
  props: Omit<LabelHTMLAttributes<HTMLLabelElement>, "className">,
) {
  return <span {...props} className="text-sm font-medium text-gray-700" />;
}

Input.Label = Label;

const Field = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "className">
>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
    />
  );
});

Input.Field = Field;

const Textarea = forwardRef<
  HTMLTextAreaElement,
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">
>((props, ref) => {
  return (
    <textarea
      ref={ref}
      {...props}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
    />
  );
});

Input.Textarea = Textarea;
