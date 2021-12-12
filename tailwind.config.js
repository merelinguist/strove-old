const aspectRatio = require("@tailwindcss/aspect-ratio");
const forms = require("@tailwindcss/forms");
const lineClamp = require("@tailwindcss/line-clamp");
const typography = require("@tailwindcss/typography");

module.exports = {
	content: ["./app/**/*.{js,ts,tsx}"],
	plugins: [aspectRatio, forms, lineClamp, typography],
};
