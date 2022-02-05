::: anchor
:::

::: title 基本介绍
:::

::: describe 当目前没有数据时，用于显式的用户提示。
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-empty></lay-empty>
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

::: title 指定描述
:::

::: demo

<template>
  <lay-empty description="刷新试试"></lay-empty>
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

::: title Empty 属性
:::

::: table

| 属性        | 描述     | 可选值 |
| ----------- | -------- | ------ |
| description | 描述信息 | --     |

:::

::: comment
:::

::: previousNext empty
:::