import path from "path";
import { defineConfig } from "vite";
import plugins from "./src/plugin/all-plugins";

export default defineConfig({
  resolve: {
    alias: {
      "/@src": path.resolve(__dirname, "./src"),
      "layui-vue": path.resolve(__dirname, "../../packages/component"),
      "layui-layer": path.resolve(__dirname, "../../packages/layer"),
      "json-schema-form": path.resolve(
        __dirname,
        "../../packages/json-schema-form"
      ),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  plugins,
});
