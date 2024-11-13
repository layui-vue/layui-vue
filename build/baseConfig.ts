import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

export default (rootPath: string) => {
  return {
    plugins: [vue(), vueJsx()],
    build: {
      target: "es2015",
      outDir: path.resolve(rootPath, "lib"),
      lib: {
        entry: path.resolve(rootPath, "src/index.ts"),
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
          exports: "named",
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
