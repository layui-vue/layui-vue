import path from "path";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { LayuiVueResolver } from "unplugin-layui-vue-resolver";
import plugins from "./src/plugin/common-plugins";

export default defineConfig({
  resolve: {
    alias: {
      "/@src": path.resolve(__dirname, "./src"),
    },
  },
  mode: "demand",
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
  plugins: [
    AutoImport({
      // 自动导入 vue 相关函数
      imports: ["vue"],
      // 自动导入 layer-vue 相关函数,例如 layer 等
      resolvers: [
        LayuiVueResolver({
          exclude: [/^Lay[A-Z]/],
        }),
      ],
      dts: path.resolve(path.resolve(__dirname, "src"), "auto-imports.d.ts"),
    }),
    Components({
      // 用于搜索组件的目录
      dirs: ["src/document/zh-CN/components"],
      // 允许在 'src/document/zh-CN/components' 下自动加载 markdown
      extensions: ["vue", "md"],
      // 允许自动导入和注册 markdown 中使用的组件
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      // 自动解析 layui-vue 组件
      resolvers: [
        LayuiVueResolver({
          resolveIcons: true,
          exclude: [
            "LaySearch",
            "LayAnchor",
            "LayTableBox",
            "LayCode",
            // "component",
            // "guide",
            // "index",
            // "resource",
          ],
        }),
      ],
    }),
    ...plugins,
  ],
});
