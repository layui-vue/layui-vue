import { UserConfigExport, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import terser from "@rollup/plugin-terser";
import { componentDir } from "./constant";

export default ({ mode }): UserConfigExport => {
  const env = loadEnv(mode, componentDir, "");
  return {
    define: {
      "process.env": env,
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
      outDir: resolve("dist", "umd"),
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
