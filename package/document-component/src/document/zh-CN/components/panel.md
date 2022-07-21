::: anchor
:::

::: title 基本介绍
:::

::: describe 面板通常是指一个独立的容器
:::

::: title 基础使用
:::

::: demo 使用 `lay-panel` 标签, 创建面板组件

<template>
  <lay-panel><div style="padding: 30px;">面板</div></lay-panel>
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

::: title Panel 属性
:::

::: table

| 插槽    | 描述     | 类型 | 默认值 | 可选值 |
| ------- | -------- | ------ | ------ | ----- |
| shadow | 阴影 | `string`     | `always` | `always`  `hover`  `never` |

:::

::: title Panel 插槽
:::

::: table

| 插槽    | 描述     | 参数 |
| ------- | -------- | ------ |
| default | 默认插槽 | --     |

:::

::: contributor panel
:::  

::: previousNext panel
:::