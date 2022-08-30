import { UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

export default (): UserConfigExport => {
  return {
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
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log"],
        },
        output: {
          comments: true,
        },
      },
      rollupOptions: {
        output: {
          globals: {
            vue: "Vue",
          },
          assetFileNames: "index.css",
        },
        external: ["vue"],
      },
    },
  };
};
