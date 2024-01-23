<fieldset class="layui-elem-field layui-field-title">
    <legend>安装</legend>
</fieldset>

通过 npm 工具安装 :

```
npm install @layui/layer-vue
```

在 main.ts 完成 layer-vue 的注册, 并导入 css 文件 :

```
import App from './App';
import { createApp } from 'vue';
import layer from '@layui/layer-vue';
import '@layui/layer-vue/lib/index.css';

const app = createApp(App);

app.use(layer).mount('#app');
```

<fieldset class="layui-elem-field layui-field-title">
    <legend>场景</legend>
</fieldset>

因 layer-vue 可以独立使用，也可以在 layui-vue 中使用。所以请按照你的实际需求来选择。

如果你想独立使用 layer-vue, 你需要通过 npm 安装。如果你使用的是 layui-vue, 那么你无需安装 layer-vue, 已内置。 

<fieldset class="layui-elem-field layui-field-title">
    <legend>入门</legend>
</fieldset>

我们提供 `layer` 函数来创建弹出层 :

```
<template>
  <button type="button" @click="open">打开</button>
</template>

<script setup>
import { layer } from "@layui/layer-vue";

const open = function () {
  layer.open({title:"标题", content: "内容"});
};
</script>
```

但在较为复杂的应用场景中, `lay-layer` 是一个更好的选择 :

```
<template>
  <button @click="changeVisible">显示/隐藏</button>
  <lay-layer v-model="visible">
    content
  </lay-layer>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);

const changeVisible = () => {
  visible.value = !visible.value;
}
</script>
```