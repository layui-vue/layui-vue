import antfu from "@antfu/eslint-config";
import stylistic from "@stylistic/eslint-plugin";

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
      "docs/",
      "**/*.test.*",
    ],
  },

  stylistic.configs.customize({
    semi: true,
    quotes: "double",
  }),
);
