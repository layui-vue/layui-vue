::: title 快速上手
:::

<br>
  <p>
    <a href="http://layui-vue.pearadmin.com" style="margin-left:30px;">
      <img src="https://unpkg.com/outeres@0.0.6/img/layui/icon-1.png" alt="layui" width="105" style="border-radius:4px;">
    </a>
    <span style="font-size:32px;color:#e2e2e2;margin:30px;">+</span>
    <a href="http://layui-vue.pearadmin.com">
      <img src="https://qn.antdv.com/vue.png" alt="layui" width="105" style="border-radius:4px;">
    </a>
    <span style="font-size:32px;color:#e2e2e2;margin:30px;">=</span>
    <a href="http://layui-vue.pearadmin.com">
      <img src="../../../assets/logo.jpg" alt="layui" width="105" style="border-radius:4px;">
    </a>
  </p>
<br>

::: title 使用包管理
:::

::: describe 使用 npm 工具安装 layui vue, 然后你可以使用打包工具, 如 vite rollup.
:::

```
npm install @layui/layui-vue --save
```
::: title 完整引入
:::

```js
import App from './App.vue'
import { createApp } from 'vue'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'

createApp(App).use(Layui).mount('#app')
```
::: describe 以上代码便完成了 layui-vue 的引入。需要注意的是，样式文件需要单独引入。
:::

::: title 自动按需
:::

::: describe 安装 <a href="https://github.com/antfu/unplugin-vue-components" target="_blank" style="color:#5FB878"><code>unplugin-vue-components</code></a> 和 <a href="https://github.com/antfu/unplugin-auto-import" target="_blank" style="color:#5FB878"><code>unplugin-auto-import</code></a> 插件，插件会自动解析模板中用到的组件，并引入组件和样式。
:::

```
npm install -D unplugin-vue-components unplugin-auto-import
```

::: describe 修改 vite.config.js 文件
:::

```js
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { LayuiVueResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    // ...其它插件
    AutoImport({
      resolvers: [LayuiVueResolver()],
    }),
    // 自动解析 layui-vue 组件
    Components({
      resolvers: [LayuiVueResolver()],
    }),
  ],
}
```

::: describe LayuiVueResolver 类型声明
:::

```ts
export declare function LayuiVueResolver(
  options?: LayuiVueResolverOptions = {}
): ComponentResolver

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

::: title 手动按需
:::

::: describe 需要手动引入组件样式
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

::: title 基础示例
:::

```html
<lay-layout>
  <lay-header>
    <lay-logo>Layui Admin</lay-logo>
  </lay-header>
  <lay-side></lay-side>
  <lay-body>
    <router-view></router-view>
  </lay-body>
  <lay-footer>pearadmin.com</lay-footer>
</lay-layout>
```
::: title 浏览器导入
:::

::: describe 根据不同的 CDN 提供商有不同的引入方式，我们在这里以 unpkg 举例。
:::

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Document</title>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 引入 layui-vue 样式 -->
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/@layui/layui-vue/lib/index.css">
  <!-- 引入 Vue 3, 使用全局变量 Vue -->
  <script src="https://unpkg.com/vue@3"></script>
  <!-- 引入 layui-vue 组件库, 使用全局变量 LayuiVue -->
  <script src="https://unpkg.com/@layui/layui-vue"></script>
</head>

<body>
  <div id="app">
    <lay-button @click="openLayer">Hello</lay-button>
  </div>
</body>
<script>
  const { createApp, ref } = Vue;
  const { layer } = LayuiVue;

  const App = {
    setup() {
      const openLayer = function () {
        layer.msg("hello");
      }
      return {
        openLayer
      }
    }
  };
    
  const app = createApp(App); 
  app.use(LayuiVue);
  app.mount('#app');
</script>

</html>
```