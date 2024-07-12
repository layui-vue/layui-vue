import { defineConfig } from "vite";
import { name } from "./package.json";
import vue from "@vitejs/plugin-vue";
import path from "path";

const camelize = (name: string) =>
  name.replace(/(^|-)(\w)/g, (a, b, c) => c.toUpperCase());

export default defineConfig({
  plugins: [vue()],
  build: {
    target: "es2015",
    outDir: path.resolve("dist", "lib"),
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: camelize(name),
      fileName: (format) => `json-schema-form.${format}.js`,
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
