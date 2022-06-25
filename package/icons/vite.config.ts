import path from "path";
import { defineConfig } from "vite";
import { name } from "./package.json";
import babel from "@rollup/plugin-babel";
import vue from "@vitejs/plugin-vue";

const camelize = (name: string) =>
  name.replace(/(^|-)(\w)/g, (a, b, c) => c.toUpperCase());

export default defineConfig({
  resolve: {
    alias: {
      "/@src": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: "es2015",
    outDir: path.resolve(__dirname, "lib"),
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: camelize(name),
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
      plugins: [
        babel({
          exclude: "node_modules/**",
          extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
          presets: ["@babel/preset-env", "@babel/preset-typescript"],
        }),
      ],
      external: ["vue", "vue-router"],
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
  ],
});
