import { UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import path, { resolve } from "path";

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
    plugins: [
      vue(),
      vueJsx(),
      dts({
        outputDir: ["types"],
        insertTypesEntry: true,
        cleanVueFileName: true,
        copyDtsFiles: true,
        include: ["src"],
        beforeWriteFile: (filePath: string, content: string) => {
          return {
            filePath: filePath.replace(
              `${path.sep}package${path.sep}component${path.sep}src`,
              ""
            ),
            content: content,
          };
        },
      }),
    ],
    build: {
      cssCodeSplit: false,
      outDir: "lib",
      emptyOutDir: true,
      lib: {
        entry: resolve(process.cwd(), "./src/index.ts"),
        name: "layui-vue",
        formats: ["es"],
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
