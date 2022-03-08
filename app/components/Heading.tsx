import type { ElementType } from "react";
import type { PolymorphicPropsWithoutRef } from "react-polymorphic-types";

import { classNames } from "~/utils/classNames";
import { createMaps } from "~/utils/createMaps";

const sizeMaps = createMaps({
  h1: "text-5xl font-semibold",
  h2: "text-[32px] font-medium",
  h3: "text-[24px] font-medium",
  h4: "text-[16px] font-medium",
});

const HeadingDefaultElement = "h2";

type HeadingOwnProps = {
  size?: keyof typeof sizeMaps;
};

type HeadingProps<T extends ElementType = typeof HeadingDefaultElement> =
  PolymorphicPropsWithoutRef<HeadingOwnProps, T>;

export function Heading<T extends ElementType = typeof HeadingDefaultElement>({
  as,
  size,
  ...props
}: HeadingProps<T>) {
  const Element: ElementType = as || HeadingDefaultElement;

  function getSize() {
    if (size) {
      return size;
    }

    if (as && as in sizeMaps) {
      return as as keyof typeof sizeMaps;
    }

    return "h2";
  }

  return <Element className={classNames(sizeMaps[getSize()])} {...props} />;
}
