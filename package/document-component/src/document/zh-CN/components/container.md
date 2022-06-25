::: anchor
:::

::: title 基本介绍
:::

::: describe 页面容器, 用于控制内容的边距。
:::

::: title 普通容器
:::

::: demo

<template>
  <lay-container>
    <div class="container-demo"></div>
  </lay-container>
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
    .container-demo {
        width:100%;
        height: 300px;
        background: #79C48C;
        border-radius: 2px;
    }
</style>

:::

::: title 流式容器
:::

::: demo

<template>
  <lay-container fluid>
      <div class="container-demo"></div>
  </lay-container>
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
    .container-demo {
        width:100%;
        height: 300px;
        background: #79C48C;
    }
</style>

:::

::: title 容器属性
:::

::: table

| 属性  | 描述   | 类型         | 默认值   | 可选值         |
| ----- | ------ | -------------- |------ | -------------- |
| fluid | 流模式 | `boolean` `string` | `flase` | `true` `false` |

:::

::: contributor container
:::

::: previousNext container
:::