import { defineConfig, mergeConfig } from "vite";
import { babel } from "@rollup/plugin-babel";

import baseConfig from "../../build/baseConfig";

export default defineConfig(({ mode }) => {
  return mergeConfig(baseConfig(__dirname), {
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    build: {
      lib: {
        name: "LayuiJsonSchemaForm",
        fileName: (format) => `json-schema-form.${format}.js`,
      },
      rollupOptions: {
        plugins: [
          babel({
            babelHelpers: "runtime",
            exclude: "node_modules/**",
            extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
            plugins: [["@babel/plugin-transform-runtime"]],
          }),
        ],
      },
    },
  });
});
