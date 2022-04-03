import path from 'path'
import { defineConfig } from 'vite'
import plugins from './src/plugin/common-plugins'
import pkg from '../package.json'

export default defineConfig({
  resolve: {
    alias: {
      '/@src': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'import.meta.env.LAYUI_VUE_VERSION': JSON.stringify(pkg.version),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  },
  plugins,
})