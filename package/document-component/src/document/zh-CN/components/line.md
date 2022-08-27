::: anchor
:::

::: title 基础使用
:::

::: describe 区分内容的分割线。
:::

::: demo 默认为水平分割线

<template>
<lay-space direction="vertical" fill>
  默认分割线
  <lay-line></lay-line>
  赤色分割线
  <lay-line theme="red"></lay-line>
  橙色分割线
  <lay-line theme="orange"></lay-line>
  墨绿分割线
  <lay-line theme="green"></lay-line>
  青色分割线
  <lay-line theme="cyan"></lay-line>
  蓝色分割线
  <lay-line theme="blue"></lay-line>
  黑色分割线
  <lay-line theme="black"></lay-line>
  自定义颜色
  <lay-line theme="#EEF08D"></lay-line>
</lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 带内容的分割线
:::

::: demo `contentPosition` 属性设置内容位置，`offset` 属性设置内容偏移量, 单位 `px` 或百分比值。也可以通过 `border-style` 和`border-width` 自定义样式

<template>
<lay-space direction="vertical" fill>
  <lay-line>🌲 🌲 🌲 🌲</lay-line>
  <lay-line contentPosition="left">left 默认</lay-line>
  <lay-line contentPosition="right" offset="8%">right 百分比</lay-line>
  <lay-line border-style="dashed" border-width="3px">自 定 义 宽 度 和 样 式</lay-line>
</lay-space>
</template>

<script>
</script>

:::


::: title 竖直分割线
:::

::: demo 设置 `direction = "vertical"` 即可使用竖直分割线

<template>
  默认分割线
  <lay-line direction="vertical"></lay-line>
  赤色分割线
  <lay-line direction="vertical" theme="red"></lay-line>
  橙色分割线
  <lay-line direction="vertical" theme="orange"></lay-line>
  墨绿分割线
  <lay-line direction="vertical" theme="green"></lay-line>
  青色分割线
  <lay-line direction="vertical" theme="cyan"></lay-line>
  蓝色分割线
  <lay-line direction="vertical" theme="blue"></lay-line>
  黑色分割线
  <lay-line direction="vertical" theme="black"></lay-line>
</template>

<script>
</script>

:::

::: title Line 属性
:::

::: table

| 属性  | 说明 | 可选值                               |
| ----- | ----------- | --------------------------------------------- |
| direction  | 分割线的方向 | `horizontal` `vertical`|
| contentPosition  | 分割线内容位置 | `center` `left` `right` |
| offset  | 分割线内容偏移量，单位 px | eg: `30px` `20%`|
| theme | 主题        | `red` `orange` `green` `cyan` `blue` `black` `gray` 或 string |
| borderWidth  | 分割线宽度，单位 px | eg: `2px`|
| borderStyle  | 分割线样式 | <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style">参见MDN：border-style</a> |
| margin | 分割线边距，默认 8px |- |

:::

::: title Line 插槽
:::

::: table

| 插槽 | 说明       |
| ------ | ---------- |
| default| 默认插槽，仅支持 direction 为 `horizontal`|

:::

::: contributor line
:::   

::: previousNext line
:::