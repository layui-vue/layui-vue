import stackblitzSdk from "@stackblitz/sdk";

export const mainCode = `
import { createApp } from 'vue';
import App from './App.vue';
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css';
import './index.css';

const app = createApp(App);
app.use(Layui);
app.mount('#app');`;

export const styleCode = `#app { padding: 20px; }`;

export const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
`;

export const stackblitzRc = `
  {
    "installDependencies": false,
    "startCommand": "turbo && turbo dev"
  }
`;

export const viteConfigCode = `
  import { defineConfig } from 'vite';
  import vue from '@vitejs/plugin-vue';
  import vueJsx from '@vitejs/plugin-vue-jsx';
  export default defineConfig({
    plugins: [vue(), vueJsx()],
  });
`;

export const packageJSONCode = JSON.stringify(
  {
    name: "layui-vue-demo",
    version: "0.0.1",
    private: true,
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
    },
    dependencies: {
      vue: "^3.2.0",
      "@layui/layui-vue": "latest",
    },
    devDependencies: {
      vite: "^2.9.8",
      "@vue/compiler-sfc": "^3.2.0",
      "@vitejs/plugin-vue": "^2.3.2",
      "@vitejs/plugin-vue-jsx": "^1.3.10",
    },
  },
  null,
  2
);

export const openStackblitz = (content: string) => {
  stackblitzSdk.openProject(
    {
      title: `layui-vue-demo`,
      description: "layui-vue-demo",
      template: "node",
      files: {
        "src/App.vue": content,
        "src/index.css": styleCode,
        "src/main.js": mainCode,
        "index.html": htmlCode,
        "package.json": packageJSONCode,
        "vite.config.js": viteConfigCode,
        ".stackblitzrc": stackblitzRc,
      },
    },
    {
      openFile: "src/App.vue",
    }
  );
};
