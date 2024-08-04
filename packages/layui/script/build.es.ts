import { UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import * as fs from "fs";
import terser from "@rollup/plugin-terser";
import { componentDir } from "./constant";
const inputDir = resolve(componentDir, "./component");

const inputsArray = fs.readdirSync(inputDir).filter((name) => {
  const componentDir = resolve(inputDir, name);
  const isDir = fs.lstatSync(componentDir).isDirectory();
  return isDir && fs.readdirSync(componentDir).includes("index.ts");
});

const inputs = inputsArray.reduce((backObj, pkgName) => {
  backObj[pkgName] = resolve(componentDir, `./component/${pkgName}/index.ts`);
  return backObj;
}, {});

inputs["index"] = resolve(componentDir, "./index.ts");
// todo
// inputs["theme"] = resolve(process.cwd(), "./theme/index.less");

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
  "selectOptionGroup",
  "select",
  "cascaderPanel",
];

function replaceImportStatement(text: string) {
  // 正则表达式模式
  const pattern =
    /^@import\s*\(\s*reference\s*\)\s*["'](\.\.\/[^\/]+\/index\.less)["'];/gm;
  // 替换字符串
  const replacement = (_: any, p1: string) => {
    const css = p1.replace(/index\.less$/, "index.css");
    return `/* less-to-css ${css} */`;
  };
  // 进行替换
  return text.replaceAll(pattern, replacement);
}

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
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      {
        name: "vite-plugin-layui-less-to-css-pre",
        enforce: "pre",
        async transform(code, id) {
          if (id.endsWith("index.less") && !/node_modules/.test(id)) {
            const CommentsCode = replaceImportStatement(code);

            return CommentsCode;
          }
          return code;
        },
      },
      {
        name: "vite-plugin-layui-less-to-css",
        async transform(code, id) {
          if (id.endsWith("index.less") && !/node_modules/.test(id)) {
            const toCssCode = code.replace(
              /^\/\*\sless-to-css\s(.*)\s\*\//gm,
              "@import url($1);"
            );

            return toCssCode;
          }
          return code;
        },
      },
    ],
    build: {
      cssCodeSplit: true,
      emptyOutDir: true,
      outDir: "es",
      lib: {
        entry: resolve(componentDir, "./index.ts"),
        formats: ["es"],
      },
      rollupOptions: {
        input: inputs,
        plugins: [terser()],
        output: {
          globals: {
            vue: "Vue",
          },
          manualChunks(id) {
            const arr = id.toString().split("/");
            if (id.includes("node_modules")) {
              const chunksName = "_chunks/";
              return (
                chunksName +
                id.toString().split("node_modules/")[2].split("/")[0].toString()
              );
            } else if (arr.length >= 2) {
              const entryPoint = arr[arr.length - 2].toString();
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
        external: ["vue"],
      },
    },
  };
};
