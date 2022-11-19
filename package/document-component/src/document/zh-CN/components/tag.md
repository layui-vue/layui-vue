::: anchor
:::

::: title 基本介绍
:::

::: describe 进行标记和分类的小标签, 用于标记事物的属性与纬度。
:::

::: title 基础使用
:::

::: demo 使用 `lay-tag` 标签, 创建标签组件。

<template>
  <lay-space size="md">
    <lay-tag maxWidth="100px">标签</lay-tag>
    <lay-tag v-for="type in TAG_TYPES" :type="type">标签</lay-tag>
  </lay-space>
</template>

<script setup>
const TAG_TYPES = [
  "primary",
  "normal",
  "warm",
  "danger",
];
</script>

:::

::: title 图标插槽
:::

::: demo 通过 icon 插槽自定义 tag 前置图标。

<template>
<lay-space size="md">
  <lay-tag>
    <template #icon>
      <lay-icon type="layui-icon-vercode" />
    </template>
    tag
  </lay-tag>
  <lay-tag>
    <template #icon>
      <lay-icon type="layui-icon-login-qq" />
    </template>
    tag
  </lay-tag>
  <lay-tag>
    <template #icon>
      <lay-icon type="layui-icon-star-fill" />
    </template>
    tag
  </lay-tag>
</lay-space>
</template>

<script>
</script>
<style>
.tag-demo {
  width: 500px;
  display: flex;
  margin-bottom: 15px;
}
.tag-demo .layui-tag{
  margin-right: 15px;
}
</style>

:::

::: title 允许关闭
:::

::: demo 通过 closable 属性开启关闭按钮, 使用 close-icon 插槽定义关闭图标。

<template>
<lay-space size="md">
  <lay-tag closable>Tag</lay-tag>
  <lay-tag closable>
    Tag 2
  </lay-tag>
  <lay-tag closable>
    custom close icon
    <template #close-icon><lay-icon type="layui-icon-close-fill" /></template>
  </lay-tag>
</lay-space>
</template>

<script>
</script>
<style>
.tag-demo {
  width: 500px;
  display: flex;
  margin-bottom: 15px;
}
.tag-demo .layui-tag{
  margin-right: 15px;
}
</style>

:::

::: title 指定颜色
:::

::: demo 标签颜色, 通过 color 属性自定义颜色

<template>
<lay-space direction="vertical" size="md">
  <lay-space size="md">
    <lay-tag v-for="color in COLORS" :color="color" variant="light">标签</lay-tag>
  </lay-space>
</lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const COLORS = [
      "#165DFF",
      "#722ED1",
      "#D91AD9",
      "#F5319D",
    ];

    return {
      TAG_COLORS,
      COLORS
    }
  }
}
</script>
<style>
.tag-demo {
  width: 500px;
  display: flex;
  margin-bottom: 15px;
}
.tag-demo .layui-tag{
  margin-right: 15px;
}
.tag-demo-variant{
  margin-bottom: 10px;
}
</style>

:::

::: title 动态编辑
:::

::: demo 配合自定义逻辑, 实现标签的动态编辑

<template>
  <template v-for="(tag, index) of tagData" :key="`tag-${index}`">
  <lay-tag 
    closable
    maxWidth="100px"
    @close="handleClose(index)"
    style="margin-right: 5px;"
    >
    {{tag}} 
  </lay-tag>
  </template>
  <span id="tagDemo" @click="handlerFocus">
    <lay-input 
    v-if="showInput"   
    ref="inputRef"      
    v-model.trim="inputVal"
    autofocus
    style="width:60px; height:24px"
    @keyup.enter="handleAdd"
    @blur="handleAdd" />
  <lay-tag 
    v-else 
    >
    <template #icon>
      <lay-icon type="layui-icon-addition"/>
    </template>
    添加
  </lay-tag>
  </span>
</template>

<script>
import { ref, nextTick } from 'vue';

export default {
  setup() {
    const tagData = ref(['Tag', 'Selected1111111111111111111111111111111', 'Tags']);
    const inputRef = ref(null);
    const showInput = ref(false);
    const inputVal = ref('');

    const handleAdd = () => {
      if (inputVal.value) {
        tagData.value.push(inputVal.value);
        inputVal.value = '';
      }
      showInput.value = false;
    };

    const handleClose = (index) => {
      tagData.value.splice(index, 1);
    };

    const handlerFocus = (e) => {
      showInput.value = true;
      console.log("FIXME 临时")
      setTimeout(() => {
        document.querySelector('#tagDemo input').focus()
      },200)
 
    }

    return {
      tagData,
      inputRef,
      showInput,
      inputVal,
      handleAdd,
      handleClose,
      handlerFocus,
    };
  },
};
</script>
:::


::: title Tag 属性
:::

::: table

| 属性        | 描述     | 类型    | 默认值    | 可选值                             |
| ----------- | -------- | ------ | ------ | ------ |
| type        | 标签类型  | `string` | -| `primary` `normal` `warm` `danger`
| size | 标签大小 |`string` | `md` | `lg` `md` `sm` `xs`|
| color | 自定义标签颜色 | `string` | -| - | 
| bordered | 是否显示边框 | `boolean` | `true` | `true` `false`|
| closable | 是否可关闭 | `boolean` | `false` | `true` `false`|
| variant  | 标签风格  | `string` | `dark` | `dark` `light` `plain`|
| disabled | 禁用标签  | `boolean` | `false` | `true` `false`|
| shape    | 标签形状  | `string` | `square` | `square` `round`|
| maxWidth | 标签最大宽度 | `string`| -- | --|

:::

:::title Tag 插槽
:::

:::table
| 插槽 | 描述 | 参数 |
|------ |----------|-----------|
| default | 默认插槽 | - |
| icon | 图标 | - |
| close-icon | 关闭图标 | - |
:::

:::title Tag 事件
:::

:::table
| 事件 | 描述 | 参数 |
|------ |----------|-----------|
| close | 点击关闭图标时触发 | (e: MouseEvent) |
:::

::: contributor tag
:::  

::: previousNext tag
:::