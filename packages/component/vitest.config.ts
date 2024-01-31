import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
  },
  plugins: [Vue(), VueJsx()] as any[],
});
