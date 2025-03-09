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

// const inputs = {};
const inputs = inputsArray.reduce((backObj, pkgName) => {
  backObj[pkgName] = resolve(componentDir, `./component/${pkgName}/index.ts`);
  return backObj;
}, {});

inputs["index"] = resolve(componentDir, "./index.ts");
// inputs["splitPanel"] = resolve(componentDir, `./component/splitPanel/index.ts`);
// inputs["splitPanelItem"] = resolve(
//   componentDir,
//   `./component/splitPanelItem/index.ts`
// );

// inputs["datePicker"] = resolve(componentDir, `./component/datePicker/index.ts`);

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
      postcss: {},
    },
    plugins: [vue(), vueJsx()],
    build: {
      cssCodeSplit: true,
      outDir: "es",
      lib: {
        entry: resolve(componentDir, "./index.ts"),
        formats: ["es"],
      },
      rollupOptions: {
        input: inputs,
        plugins: [terser()],
        output: {
          entryFileNames: (chunkInfo) => {
            // console.log(chunkInfo.name, "entryFileNames");
            // node_modules
            if (chunkInfo.name.includes("node_modules")) {
              const chunksName = "_chunks/";
              return (
                chunksName +
                chunkInfo.name
                  .toString()
                  .split("node_modules/")[2]
                  .split("/")[0]
                  .toString() +
                "/index.js"
              );
            }

            const result = chunkInfo.name.replace(/\.vue$/, "").split("/");
            const name = result.join("/");

            if (result.length === 1) {
              return name === "index" ? "index.js" : `${name}/index.js`;
            } else {
              /**
               * packages/component/provider
               * packages/component/utils
               */
              if (name.includes("packages/component/")) {
                return `${name.replace("packages/component/", "")}.js`;
              }

              /**
               * packages/layer
               * packages/icons
               */
              if (/packages\/(component|layer|icons)/.test(name)) {
                return `${name.replace("packages/", "")}.js`;
              }

              return `${name}.js`;
            }
          },
          assetFileNames: (assetInfo) => {
            /**
             * button/index.css
             * form/index.css
             */
            if (/^[a-zA-Z]+\/index\.css$/.test(assetInfo.name!)) {
              return "[name].css";
            }

            /**
             * packages/layer/lib/index -> layer/lib/index
             * packages/icons/lib/index -> icons/lib/index
             */
            if (/^packages\/.*$/.test(assetInfo.name!)) {
              return `${assetInfo.name?.replace(/packages\//, "")}`;
            }

            return `index/${assetInfo.name?.replace(/packages\//, "")}.css`;
          },
          // assetFileNames: "[name].css",
          preserveModules: true,
          preserveModulesRoot: resolve(componentDir, "./component"),
        },
        external: ["vue"],
      },
    },
  };
};
