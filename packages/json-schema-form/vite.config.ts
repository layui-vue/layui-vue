import { defineConfig, mergeConfig } from "vite";
import { babel } from "@rollup/plugin-babel";

import baseConfig from "../../build/baseConfig";
import { getFullFormatName } from "../../build/util";

export default defineConfig(({ mode }) => {
  return mergeConfig(baseConfig(__dirname), {
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    build: {
      lib: {
        name: "LayuiJsonSchemaForm",
        fileName: (format) => getFullFormatName("json-schema-form", format),
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
