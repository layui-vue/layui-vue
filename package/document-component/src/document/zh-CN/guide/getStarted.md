::: title 快速上手
:::

::: describe 最简单的使用方式参照以下 CodeSandbox 演示，也推荐 Fork 本例来进行 Bug Report。
:::

<a href="https://codesandbox.io/p/github/layui-vue/layui-vue-sample/master?workspaceId=6944e84c-d9d7-4a7e-a0e9-1355b1955817&file=%2FREADME.md&workspace=%257B%2522activeFileId%2522%253A%2522cle8a7gxr0001fyf1dn8ca7d5%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522spaces%2522%253A%257B%2522cle8a7l7d000x3n6jeerlli8c%2522%253A%257B%2522key%2522%253A%2522cle8a7l7d000x3n6jeerlli8c%2522%252C%2522name%2522%253A%2522Default%2522%252C%2522devtools%2522%253A%255B%257B%2522key%2522%253A%2522cle8a7l7e000y3n6j1ggt7qgc%2522%252C%2522type%2522%253A%2522PROJECT_SETUP%2522%252C%2522isMinimized%2522%253Atrue%257D%252C%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A3333%252C%2522key%2522%253A%2522cle8a7xfb008c3n6jhlbohe5r%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522key%2522%253A%2522cle8a7vhi00683n6jlxod11l5%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D%257D%252C%2522currentSpace%2522%253A%2522cle8a7l7d000x3n6jeerlli8c%2522%252C%2522spacesOrder%2522%253A%255B%2522cle8a7l7d000x3n6jeerlli8c%2522%255D%252C%2522hideCodeEditor%2522%253Afalse%257D" style="margin-left: 30px; margin-bottom: 30px; margin-top: 10px; display:block;"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" /></a>

::: title 安装组件
:::

::: describe 使用 npm 工具安装 layui vue，若安装缓慢，可尝试用 pnpm 或其他镜像源。
:::

```
npm install @layui/layui-vue --save
```

::: title 全局注册
:::

```js
import App from './App.vue'
import { createApp } from 'vue'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'

createApp(App).use(Layui).mount('#app')
```
::: describe 以上代码便完成了 layui-vue 的注册。需要注意的是，样式文件需要单独引入。
:::

::: title 自动按需
:::

::: describe 首先你需要安装 <a href="https://github.com/antfu/unplugin-vue-components" target="_blank" style="color:#5FB878"><code>unplugin-vue-components</code></a> 和 <a href="https://github.com/antfu/unplugin-auto-import" target="_blank" style="color:#5FB878"><code>unplugin-auto-import</code></a> 两款插件。
:::

```
npm install -D unplugin-vue-components unplugin-auto-import
```

::: describe 然后修改 vite.config.js 或 vue.config.js 的配置。 
:::

```js
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { LayuiVueResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    AutoImport({
      resolvers: [LayuiVueResolver()],
    }),
    Components({
      resolvers: [LayuiVueResolver()],
    }),
  ],
}
```
::: describe Resolver 解析器选项配置。 
:::

```ts
export interface LayuiVueResolverOptions {
  /**
   * 将样式与组件一起导入
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css'

  /**
   * 是否解析图标
   *
   * @default false
   */
  resolveIcons?: boolean

  /**
   * 排除不需要自动导入的组件
   * 
   * eg: exclude: ['LayDocTable', /^LayDoc[A-Z]/,]
   */
  exclude?: Array<string | RegExp>;
}
```

::: title 手动引入
:::

::: describe 原生支持 es-module 的 tree shaking 用法。
:::

::: describe 如果你完全使用 layui-vue 构建项目, 我们更推荐全局注册与自动按需的方式。
:::

```js
import App from './App.vue'
import { createApp } from 'vue'
import { LayButton, LayTable } from '@layui/layui-vue'
import '@layui/layui-vue/es/button/index.css';
import '@layui/layui-vue/es/table/index.css';

var app = createApp(App).

app.component("LayButton", LayButton);
app.component("LayTable", LayTable);

app.mount('#app')
```

::: title 在线安装
:::

::: describe 根据不同的 CDN 提供商有不同的引入方式，我们在这里以 unpkg 举例。
:::

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="//unpkg.com/@layui/layui-vue/lib/index.css" />
    <script src="//unpkg.com/vue@3"></script>
    <script src="//unpkg.com/@layui/layui-vue"></script>
</head>
<body>
    <div id="app">
        <lay-button type="primary">{{ message }}</lay-button>
    </div>
    <script>
        const App = {
            data() {
                return {
                    message: "Hello World"
                };
            },
        };
        const app = Vue.createApp(App);
        app.use(LayuiVue);
        app.mount("#app");
    </script>
</body>
</html>
```