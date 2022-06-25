import { defineConfig } from "vite";
import { name } from "./package.json";
import vue from "@vitejs/plugin-vue";
import path from "path";

const camelize = (name: string) =>
  name.replace(/(^|-)(\w)/g, (a, b, c) => c.toUpperCase());

export default defineConfig({
  resolve: {
    alias: {
      "/@src": path.resolve(__dirname, "src"),
    },
  },
  plugins: [vue()],
  build: {
    target: "es2015",
    outDir: path.resolve(__dirname, "lib"),
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: camelize(name),
    },
    rollupOptions: {
      output: {
        exports: "named",
        globals: (id: string) => {
          const name = id.replace(/^@/, "").split("/")[0];
          return camelize(name);
        },
        assetFileNames: "index.css",
      },
      external: ["vue"],
    },
  },
});
