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
    // https://gitee.com/layui-vue/layui-vue/issues/I90CI0
    esbuild: {
      charset: "ascii",
    },
    build: {
      lib: {
        name: "LayuiIcons",
        fileName: (format) => `icons-vue.${format}.js`,
      },
      rollupOptions: {
        plugins: [
          babel({
            exclude: "node_modules/**",
            extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          }),
        ],
      },
    },
  })
);
