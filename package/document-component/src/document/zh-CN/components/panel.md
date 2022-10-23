::: anchor
:::

::: title 基本介绍
:::

::: describe 面板通常是指一个独立的容器
:::

::: title 基础使用
:::

::: demo 使用 `lay-panel` 标签, 创建面板。

<template>
  <lay-panel>面板</lay-panel>
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

::: title 边框阴影
:::

::: demo 通过 `shadow` 属性设置阴影出现的时机，可选值为 `always` `hover` `never`， 默认为 `always`。

<template>
<div class="panel-container">
  <lay-panel>
      内容
  </lay-panel>
  <lay-panel shadow="hover">
      内容
  </lay-panel>
  <lay-panel shadow="never">
      内容
  </lay-panel>
</div>
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

<style>
.panel-container > * {
  background: whitesmoke;
  margin-top: 20px;
}
</style>

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