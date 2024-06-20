import { UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import terser from "@rollup/plugin-terser";
import { componentDir } from "./constant";

export default (): UserConfigExport => {
  return {
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
      outDir: "lib",
      emptyOutDir: true,
      lib: {
        entry: resolve(componentDir, "./index.ts"),
        name: "layui-vue",
        formats: ["es"],
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
