const aspectRatio = require("@tailwindcss/aspect-ratio");
const forms = require("@tailwindcss/forms");
const lineClamp = require("@tailwindcss/line-clamp");
const typography = require("@tailwindcss/typography");
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
	content: ["./app/**/*.{js,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				gray: colors.neutral,
			},
		},
	},
	plugins: [
		aspectRatio,
		forms,
		lineClamp,
		typography,
		plugin(({ addComponents, theme }) => {
			addComponents({
				"#nprogress": {
					pointerEvents: "none",
				},
				".bar": {
					backgroundColor: theme("colors.blue.500"),
					position: "fixed",
					zIndex: "1031",
					top: "0px",
					left: "0px",
					width: "100%",
					height: "2px",
				},
			});
		}),
	],
};
