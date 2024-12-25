import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import HmrRefreshUrlLog from "./plugins/vite-plugin-hmr-refresh-url-log";
import "./vite.init";

export default defineConfig(() => {
  return {
    plugins: [vue(), vueJsx(), HmrRefreshUrlLog()],
    server: {
      host: true,
      open: true,
    },
  };
});
