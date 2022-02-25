::: title 快速上手
:::

<br>

<p>
  <a href="http://layui-vue.pearadmin.com" style="margin-left:30px;">
    <img src="https://portrait.gitee.com/uploads/avatars/namespace/2868/8605626_layui_1634311144.png" alt="layui" width="110" style="border-radius:12px;">
  </a>
  <span style="font-size:30px;color:#e2e2e2;margin:30px;">+</span>
  <a href="http://layui-vue.pearadmin.com">
    <img src="https://qn.antdv.com/vue.png" alt="layui" width="110" style="border-radius:12px;">
  </a>
  <span style="font-size:30px;color:#e2e2e2;margin:30px;">=</span>
  <a href="http://layui-vue.pearadmin.com">
    <img src="../../../src/assets/logo.jpg" alt="layui" width="110" style="border-radius:12px;">
  </a>
</p>

<br>

::: describe 使用 (npm, yarn, pnpm) 工具安装 layui vue, 然后你就可以使用打包工具, 如 vite
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
::: describe 以上代码便完成了 layui-vue 的引入。需要注意的是，样式文件需要单独引入。
:::

::: title 按需引入
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
::: describe 您可以从现在起启动您的项目。 对于每个组件的用法，请参考单个组件对应的文档。
:::

