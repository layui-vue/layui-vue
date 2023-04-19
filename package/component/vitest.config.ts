import { defineConfig  } from "vitest/config";
import vuePlugin from "@vitejs/plugin-vue";

export default defineConfig({
    test: {
        globals: true,
        environment: 'happy-dom'
    },
    plugins: [vuePlugin()] as any[]
})