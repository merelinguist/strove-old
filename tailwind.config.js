const forms = require("@tailwindcss/forms");
const typography = require("@tailwindcss/typography");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}"],
  safelist: [".bar"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [forms, typography],
};
