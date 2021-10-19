::: field 快速上手
:::

<br>

- 使用 npm 下载

```
npm install @layui/layui-vue --save
```

<br>

- 在 main.ts 中

```js
import App from './App.vue'
import { createApp } from 'vue'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/layui.css'

createApp(App).use(Layui).mount('#app')
```

<br>

- 在 index.vue 使用：

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
