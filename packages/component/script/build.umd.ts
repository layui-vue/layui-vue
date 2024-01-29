import { UserConfigExport, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import terser from "@rollup/plugin-terser";

export default ({ mode }): UserConfigExport => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    publicDir: false,
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(process.cwd(), "./"),
        },
      ],
    },
    plugins: [vue(), vueJsx()],
    build: {
      cssCodeSplit: false,
      outDir: "umd",
      emptyOutDir: true,
      lib: {
        entry: resolve(process.cwd(), "./src/index.ts"),
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
