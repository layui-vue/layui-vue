::: field 普通容器
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
        border-radius: 4px;
    }
</style>

:::

::: field 流式容器
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

::: field 容器属性
:::

| Name   | Description | Accepted Values   |
| ----- | ------ | -------------- |
| fluid | 流模式 | `true` `false` |
