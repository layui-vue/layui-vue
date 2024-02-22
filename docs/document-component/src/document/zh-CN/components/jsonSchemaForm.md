::: anchor
:::

::: title 基本介绍
:::

::: describe json-schema-form 是基于 layui-vue form 封装的组件。
:::

::: describe 通过简单的 JSON 配置来定义表单的结构和验证规则，从而实现动态生成表单的功能。
:::

::: title 安装
:::

::: describe 不内置在 layui-vue 中，需要单独安装。
:::

```
npm install @layui/json-schema-form --save
```

::: describe 全局注册
:::

```js
import App from "./App.vue";
import { createApp } from "vue";
import LayJsonSchemaForm from "@layui/json-schema-form";
import "@layui/json-schema-form/lib/index.css";

createApp(App).use(LayJsonSchemaForm).mount("#app");
```

::: title 基本使用
:::

::: demo 使用 `lay-json-schema-form` 标签, 创建一个 JSON 表单。

<template>
  <LayJsonSchemaForm :model="form" :inputs="inputs" />
</template>

<script setup>
import { ref, reactive } from 'vue';

const form = reactive({
  name: '凡凡'
})

const inputs = [
  {
    label: '姓名',
    type: 'text',
    name: "name",
    placeholder: '请输入姓名',
  },
   {
    label: '爱好',
    type: 'select',
    name: "like",
    placeholder: '请选择爱好',
    options: [
      { label: '唱', value: '1' },
      { label: '跳', value: '2' },
      { label: 'rap', value: '3' },
      { label: '篮球', value: '4' }
    ]
  }
]
</script>

:::
