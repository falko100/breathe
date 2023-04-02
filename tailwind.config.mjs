const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.{tsx,ts,mts}", "./src/**/*.{tsx,ts,mts}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    plugin(({ addVariant, e }) => {
      addVariant("ios", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `html.ios .${e(`ios${separator}${className}`)}`;
        });
      });
    }),
    plugin(({ addVariant }) => {
      addVariant('ios', 'html.plt-ios &');
      addVariant('android', 'html.plt-android &');
    }),
  ],
};
