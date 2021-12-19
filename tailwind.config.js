const aspectRatio = require("@tailwindcss/aspect-ratio");
const forms = require("@tailwindcss/forms");
const lineClamp = require("@tailwindcss/line-clamp");
const typography = require("@tailwindcss/typography");
const colors = require("tailwindcss/colors");

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
	plugins: [aspectRatio, forms, lineClamp, typography],
};
