const forms = require("@tailwindcss/forms");
const typography = require("@tailwindcss/typography");
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}"],
  safelist: [".bar"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    forms,
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
          height: "2px",
        },
      });
    }),
  ],
};
