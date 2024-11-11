import { defineConfig, mergeConfig } from "vite";
import { babel } from "@rollup/plugin-babel";
import path from "path";

import baseConfig from "../../build/baseConfig";

export default defineConfig(
  mergeConfig(baseConfig(__dirname), {
    resolve: {
      alias: {
        "/@src": path.resolve(__dirname, "src"),
      },
    },
    esbuild: {
      charset: "ascii",
    },
    build: {
      lib: {
        name: "LayuiLayer",
        fileName: (format) => `layer-vue.${format}.js`,
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
  })
);
