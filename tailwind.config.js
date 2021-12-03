const forms = require('@tailwindcss/forms')
const aspectRatio = require('@tailwindcss/aspect-ratio')
const typography = require('@tailwindcss/typography')


module.exports = {
	mode: "jit",
	purge: ["./app/**/*.{js,ts,tsx}"],
  plugins: [aspectRatio, forms, typography]
};