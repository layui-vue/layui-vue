<br> 

使用 npm 下载
```
npm install @layui/layui-vue --save
```

在 main.ts 中
```js
import App from './App.vue'
import { createApp } from 'vue'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/layui.css'

createApp(App)
.use(Layui)
.mount('#app')
```

这是一个基本的入门页面：
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