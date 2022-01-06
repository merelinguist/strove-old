const aspectRatio = require("@tailwindcss/aspect-ratio");
const forms = require("@tailwindcss/forms");
const lineClamp = require("@tailwindcss/line-clamp");
const typography = require("@tailwindcss/typography");
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ["./app/**/*.{js,ts,tsx}"],
	safelist: [".bar"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		aspectRatio,
		forms,
		lineClamp,
		typography,
		plugin(({ addBase, addComponents, theme }) => {
			addBase({
				"@font-face": {
					fontFamily: "Inter var",
					fontWeight: "100 900",
					fontDisplay: "swap",
					fontStyle: "normal",
					fontNamedInstance: "Regular",
					src: "url('/fonts/inter/Inter-roman.var.woff2') format('woff2')",
				},
			});

			addBase({
				"@font-face": {
					fontFamily: "Inter var",
					fontWeight: "100 900",
					fontDisplay: "swap",
					fontStyle: "italic",
					fontNamedInstance: "Italic",
					src: "url('/fonts/inter/Inter-italic.var.woff2') format('woff2')",
				},
			});

			addComponents({
				"#nprogress": {
					pointerEvents: "none",
				},
				".bar": {
					backgroundColor: theme("colors.blue.600"),
					position: "fixed",
					zIndex: "1031",
					top: "0px",
					left: "0px",
					width: "100%",
					height: "3px",
				},
			});
		}),
	],
};
