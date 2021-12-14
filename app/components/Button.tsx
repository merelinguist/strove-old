import { Children, isValidElement, ReactNode, SVGProps } from "react";

import { classNames } from "~/utils/classNames";
import { createSimpleContext } from "~/utils/createSimpleContext";

enum Size {
	EXTRASMALL,
	SMALL,
	DEFAULT,
	LARGE,
	EXTRALARGE,
}

enum Variant {
	PRIMARY,
	SECONDARY,
	WHITE,
}

enum IconPosition {
	LEADING,
	TRAILING,
}

const SIZE_MAPS: { [key in Size]: string } = {
	[Size.EXTRASMALL]: "px-2.5 py-1.5 text-xs rounded",
	[Size.SMALL]: "px-3 py-2 text-sm leading-4 rounded-md",
	[Size.DEFAULT]: "px-4 py-2 text-sm rounded-md",
	[Size.LARGE]: "px-4 py-2 rounded-md",
	[Size.EXTRALARGE]: "px-6 py-3 rounded-md",
};

const VARIANT_MAPS: { [key in Variant]: string } = {
	[Variant.PRIMARY]:
		"border-transparent text-white bg-blue-600 hover:bg-blue-700",
	[Variant.SECONDARY]:
		"border-transparent text-blue-700 bg-blue-100 hover:bg-blue-200",
	[Variant.WHITE]:
		"border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50",
};

const ICON_SIZE_MAPS: { [key in Size]: string } = {
	[Size.EXTRASMALL]: "h-4 w-4",
	[Size.SMALL]: "h-4 w-4",
	[Size.DEFAULT]: "h-5 w-5",
	[Size.LARGE]: "h-5 w-5",
	[Size.EXTRALARGE]: "h-5 w-5",
};

type ButtonState = {
	size: Size;
	iconPosition?: IconPosition;
};

const { Provider: ButtonProvider, useValue: useButtonState } =
	createSimpleContext<ButtonState>("ButtonState");

function Icon({
	icon: Component,
}: {
	icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}) {
	const { iconPosition, size } = useButtonState();

	return (
		<>
			{iconPosition}
			<Component className={classNames(ICON_SIZE_MAPS[size])} aria-hidden />
		</>
	);
}

export function Button({
	children,
	size = Size.DEFAULT,
	variant = Variant.PRIMARY,
}: {
	children: ReactNode;
	size?: Size;
	variant?: Variant;
}) {
	const getIconPosition = () => {
		Children.toArray(children).forEach((child) => {
			if (isValidElement(child)) {
				return IconPosition.LEADING;
			}

			return undefined;
		});

		return undefined;
	};

	return (
		<ButtonProvider value={{ iconPosition: getIconPosition(), size }}>
			<button
				type="button"
				className={classNames(
					"inline-flex items-center border border-transparent shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
					SIZE_MAPS[size],
					VARIANT_MAPS[variant],
				)}
			>
				{children}
			</button>
		</ButtonProvider>
	);
}

Button.Size = Size;
Button.Variant = Variant;
Button.Icon = Icon;
