::: anchor
:::

::: title 基本介绍
:::

::: describe 过渡效果的使用将大幅提升用户的使用体验。
:::

::: title 基础使用
:::

::: demo 使用 `lay-transition` 标签，为 `element` 提供过渡动画。

<template>
  <lay-button @click="changeVisible">开始</lay-button>
  <br/>
  <br/>
  <lay-transition>
    <lay-card title="标题" v-if="visible">内容</lay-card>
  </lay-transition>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(true);

const changeVisible = () => {
    visible.value = !visible.value;
}
</script>

:::

::: title 淡入淡出
:::

::: demo 通过 `type` 属性，设置你要采用的过渡效果。

<template>
  <lay-button @click="changeVisible1">开始</lay-button>
  <br/>
  <br/>
  <lay-transition type="fade">
    <lay-card title="标题" v-if="visible1">内容</lay-card>
  </lay-transition>
</template>

<script setup>
import { ref } from "vue";

const visible1 = ref(true);

const changeVisible1 = () => {
    visible1.value = !visible1.value;
}
</script>

:::

::: title Transition 属性
:::

::: table

| 属性         | 描述               | 类型                     |默认值    | 可选值   |
| ------------ | ---------------- | ------------- | ---- | ----   |
| enable       | 启用               | `boolean`   | `true` | `true` `false`   |
| type         | 类型               | `string`   |  `collapse` | --   |
| time         | 过渡时间            | `string`|`boolean`|  `0.3` | --   |

:::

::: title Transition 属性值
:::

::: table

| 属性值         | 描述               | 
| ------------ | ---------------- | 
| collapse       | 折叠动画               |
| fade           | 淡入淡出               |
:::

::: contributor transition
:::

::: previousNext transition
:::