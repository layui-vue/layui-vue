import path from "path";
import { defineConfig } from "vite";
import plugins from "./src/plugin/all-plugins";

export default defineConfig({
  resolve: {
    alias: {
      "/@src": path.resolve(__dirname, "./src"),
      "layui-component": path.resolve(__dirname, "../packages/component"),
      "layui-vue": path.resolve(__dirname, "../packages/layui"),
      "layui-layer": path.resolve(__dirname, "../packages/layer"),
      "json-schema-form": path.resolve(__dirname,"../packages/json-schema-form"),
    },
  },
  plugins,
  server: {
    host: true,
  },
});
