import { UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import * as fs from "fs";

const inputDir = resolve(process.cwd(), "./src/component");

const inputsArray = fs.readdirSync(inputDir).filter((name) => {
  const componentDir = resolve(inputDir, name);
  const isDir = fs.lstatSync(componentDir).isDirectory();
  return isDir && fs.readdirSync(componentDir).includes("index.ts");
});

const inputs = inputsArray.reduce((backObj, pkgName) => {
  backObj[pkgName] = resolve(
    process.cwd(),
    `./src/component/${pkgName}/index.ts`
  );
  return backObj;
}, {});

inputs["index"] = resolve(process.cwd(), "./src/index.ts");

const matchModule: string[] = [
  "input",
  "dropdown",
  "carousel",
  "transition",
  "datePicker",
  "header",
  "selectOption",
  "skeletonItem",
  "tabItem",
  "upload",
  "checkbox",
  "badge",
  "button",
  "tooltip",
  "page",
  "scroll",
  "radio",
  "empty",
  "dropdownMenu",
  "dropdownMenuItem",
  "tag",
  "tagInput",
  "footer",
  "tree",
  "utils",
];

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
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
      postcss: {},
    },
    plugins: [vue(), vueJsx()],
    build: {
      cssCodeSplit: true,
      emptyOutDir: true,
      outDir: "es",
      lib: {
        entry: resolve(process.cwd(), "./src/index.ts"),
        formats: ["es"],
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
        input: inputs,
        output: {
          globals: {
            vue: "Vue",
          },
          manualChunks(id) {
            let arr = id.toString().split("/");
            if (id.includes("node_modules")) {
              //id => layui-vue/node_modules/.pnpm/@vue+devtools-api@6.1.4/node_modules/@vue/devtools-api/lib/esm/api/app.js
              const chunksName = "_chunks/";
              return (
                chunksName +
                id.toString().split("node_modules/")[2].split("/")[0].toString()
              );
            } else if (arr.length >= 2) {
              //if (arr.length >= 2 && arr[arr.length - 1].split('.')[1] != 'ts'){
              let entryPoint = arr[arr.length - 2].toString();
              if (matchModule.includes(entryPoint)) {
                return entryPoint;
              }
            }
          },
          chunkFileNames: ({ name }) => {
            return name === "index" ? "index.js" : "[name]/index.js";
          },
          entryFileNames: ({ name }) => {
            return name === "index" ? "index.js" : "[name]/index.js";
          },
          assetFileNames: "[name]/index.css",
        },
        external: ["vue", "vue-router"],
      },
    },
  };
};
