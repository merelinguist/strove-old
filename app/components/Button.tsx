import { forwardRef, ElementType, ForwardedRef } from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
  PolymorphicPropsWithoutRef,
} from "react-polymorphic-types";

import { classNames } from "~/utils/classNames";
import { createMaps } from "~/utils/createMaps";

const shapeMaps = createMaps({
  default: "",
  stretch: "w-full justify-center",
});

const sizeMaps = createMaps({
  extraSmall: "rounded px-2.5 py-1.5 text-xs",
  small: "rounded-md px-3 py-2 text-sm",
  default: "rounded-md px-4 py-2 text-sm",
  large: "rounded-md px-4 py-2 text-base",
  extraLarge: "rounded-md px-6 py-3 text-base",
});

const variantMaps = createMaps({
  primary:
    "border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  white:
    "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
  danger:
    "border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
});

const ButtonDefaultElement = "button";

type ButtonOwnProps = {
  shape?: keyof typeof shapeMaps;
  size?: keyof typeof sizeMaps;
  variant?: keyof typeof variantMaps;
};

export type ButtonProps<
  T extends React.ElementType = typeof ButtonDefaultElement,
> = PolymorphicPropsWithRef<ButtonOwnProps, T>;

export const Button: PolymorphicForwardRefExoticComponent<
  ButtonOwnProps,
  typeof ButtonDefaultElement
> = forwardRef(function Button<
  T extends ElementType = typeof ButtonDefaultElement,
>(
  {
    as,
    shape = "default",
    size = "default",
    variant = "primary",
    ...props
  }: PolymorphicPropsWithoutRef<ButtonOwnProps, T>,
  ref: ForwardedRef<Element>,
) {
  const Element: ElementType = as || ButtonDefaultElement;

  return (
    <Element
      ref={ref}
      className={classNames(
        "inline-flex items-center border font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
        shapeMaps[shape],
        sizeMaps[size],
        variantMaps[variant],
      )}
      {...props}
    />
  );
});
