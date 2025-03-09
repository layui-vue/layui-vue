import { defineConfig, mergeConfig } from "vite";
import { babel } from "@rollup/plugin-babel";
import path from "path";

import baseConfig from "../../build/baseConfig";
import { getFullFormatName } from "../../build/util";

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
        fileName: (format) => getFullFormatName("icons-vue", format),
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
