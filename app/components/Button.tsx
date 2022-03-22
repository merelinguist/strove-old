import { cva, VariantProps } from "class-variance-authority";
import { ElementType, ForwardedRef, forwardRef } from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
} from "react-polymorphic-types";

const button = cva(
  "inline-flex items-center border font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50",
  {
    variants: {
      intent: {
        primary:
          "border-transparent bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500",
        white:
          "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-sky-500",
        danger:
          "border-transparent bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500",
      },
      shape: {
        default: "",
        stretch: "w-full justify-center",
      },
      size: {
        extraSmall: "rounded px-2.5 py-1.5 text-xs",
        small: "rounded-md px-3 py-2 text-sm",
        default: "rounded-md px-4 py-2 text-sm",
        large: "rounded-md px-4 py-2 text-base",
        extraLarge: "rounded-md px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      intent: "primary",
      shape: "default",
      size: "default",
    },
  },
);

const ButtonDefaultElement = "button";

type ButtonOwnProps = VariantProps<typeof button>;

export const Button: PolymorphicForwardRefExoticComponent<
  ButtonOwnProps,
  typeof ButtonDefaultElement
> = forwardRef(function Button<
  T extends ElementType = typeof ButtonDefaultElement,
>(
  {
    as,
    intent,
    shape,
    size,
    ...props
  }: PolymorphicPropsWithoutRef<ButtonOwnProps, T>,
  ref: ForwardedRef<Element>,
) {
  const Element: ElementType = as || ButtonDefaultElement;

  return (
    <Element ref={ref} className={button({ intent, shape, size })} {...props} />
  );
});
