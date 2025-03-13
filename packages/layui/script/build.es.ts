import { UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import terser from "@rollup/plugin-terser";
import { resolve } from "path";
import * as fs from "fs";
import { componentDir } from "./constant";
import packages from "../package.json";

const inputDir = resolve(componentDir, "./component");

const inputsArray = fs.readdirSync(inputDir).filter((name) => {
  const componentDir = resolve(inputDir, name);
  const isDir = fs.lstatSync(componentDir).isDirectory();
  return isDir && fs.readdirSync(componentDir).includes("index.ts");
});

const inputs = inputsArray.reduce(
  (backObj: Record<string, string>, pkgName) => {
    backObj[pkgName] = resolve(componentDir, `./component/${pkgName}/index.ts`);
    return backObj;
  },
  {}
);

inputs["index"] = resolve(componentDir, "./index.ts");

const getDependencies = () => {
  return (id: string) => {
    const dependencies = ["@vue", "vue", ...Object.keys(packages.dependencies)];

    return dependencies.some((name) => {
      return name === id || id.startsWith(`${name}/`);
    });
  };
};

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

              return `${name}.js`;
            }
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.startsWith("theme")) {
              return "index/index.css";
            } else {
              return assetInfo.name?.split("/")[0] + "/index.css";
            }
          },
          preserveModules: true,
          preserveModulesRoot: resolve(componentDir, "./component"),
        },
        external: getDependencies(),
      },
    },
  };
};
