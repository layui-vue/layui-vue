import antfu from "@antfu/eslint-config";

export default antfu(
  {
    vue: {
      overrides: {
        "vue/custom-event-name-casing": ["error", "kebab-case"],
      },
    },

    formatters: {
      markdown: "Prettier",
    },

    ignores: [
      "**/*.md",
      "docs/",
      "**/*.test.*",
    ],

    stylistic: {
      semi: true,
      quotes: "double",

    },

    rules: {
      "ts/no-unsafe-function-type": "off",
    },
  },
);
