::: title 快速上手
:::

<br>

::: describe 这里是 Layui 的 Vue 实现，开发和服务于企业级后台产品。
:::

<img src="https://portrait.gitee.com/uploads/avatars/namespace/2849/8547475_layui-vue_1633242524.png" style="margin-left:24px;border-radius: 10px;" width="140px" />

<br>
<br>
<br>

::: describe 1.使用 npm 下载
:::

```
npm install @layui/layui-vue --save
```

<br>

::: describe 2.在 main.ts 中依赖
:::

```js
import App from './App.vue'
import { createApp } from 'vue'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'

createApp(App).use(Layui).mount('#app')
```

<br>

::: describe 3.在 index.vue 使用
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

- 前往: [layui-vue-sample](https://gitee.com/layui-vue/layui-vue-sample)
