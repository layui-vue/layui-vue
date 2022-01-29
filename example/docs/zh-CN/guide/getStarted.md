::: title 快速上手
:::

```
npm install @layui/layui-vue --save
```

```
yarn add @layui/layui-vue --save
```

```
pnpm install @layui/layui-vue --save
```

<br>

::: title 全局注册
:::

```js
import App from './App.vue'
import { createApp } from 'vue'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'

createApp(App).use(Layui).mount('#app')
```

<br>

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
<br>


::: title 简单使用
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
