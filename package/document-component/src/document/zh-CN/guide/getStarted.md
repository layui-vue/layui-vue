::: title 快速上手
:::

[![Edit layui-vue](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/11mvy)

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