import type { ElementType } from "react";
import type { PolymorphicPropsWithoutRef } from "react-polymorphic-types";

import { classNames } from "~/utils/classNames";
import { createMaps } from "~/utils/createMaps";

const sizeMaps = createMaps({
  h1: "text-[2.625rem] font-semibold leading-[4rem]",
  h2: "text-[2rem] font-medium leading-[3rem]",
  h3: "text-2xl font-medium leading-[2rem]",
  h4: "text-base font-medium leading-[1.5rem]",
});

export const HeadingDefaultElement = "h2";

type HeadingOwnProps = {
  size: keyof typeof sizeMaps;
};

type HeadingProps<T extends ElementType = typeof HeadingDefaultElement> =
  PolymorphicPropsWithoutRef<HeadingOwnProps, T>;

export const Heading = <T extends ElementType = typeof HeadingDefaultElement>({
  as,
  size,
  ...props
}: HeadingProps<T>) => {
  const Element: ElementType = as || HeadingDefaultElement;

  <h1 className="text-4xl font-semibold leading-3">Hello World</h1>;

  return <Element className={classNames("", sizeMaps[size])} {...props} />;
};
