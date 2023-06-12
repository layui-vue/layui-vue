::: anchor
:::

::: title 基础使用
:::

::: describe
:::

::: demo 

<template>
    <lay-loading></lay-loading>
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

::: title Line 属性
:::

::: table

| 属性  | 说明 | 可选值                               |
| ----- | ----------- | --------------------------------------------- |
| direction  | 分割线的方向 | `horizontal` `vertical`|

:::

::: title Line 插槽
:::

::: table

| 插槽 | 说明       |
| ------ | ---------- |
| default| 默认插槽，仅支持 direction 为 `horizontal`|

::: 

::: previousNext line
:::