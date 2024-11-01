import type { UserConfigExport, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import terser from "@rollup/plugin-terser";
import { componentDir } from "./constant";

export default ({ mode }: UserConfig): UserConfigExport => {
  return {
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    publicDir: false,
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(componentDir, "./"),
        },
      ],
    },
    plugins: [vue(), vueJsx()],
    build: {
      cssCodeSplit: false,
      outDir: "umd",
      emptyOutDir: true,
      lib: {
        entry: resolve(componentDir, "./index.ts"),
        name: "LayuiVue",
        formats: ["umd"],
        fileName: (name) => `index.js`,
      },
      rollupOptions: {
        output: {
          globals: {
            vue: "Vue",
          },
          assetFileNames: "index.css",
        },
        plugins: [terser()],
        external: ["vue"],
      },
    },
  };
};
