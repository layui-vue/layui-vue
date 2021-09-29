##### 安装

npm 下载
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