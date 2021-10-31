::: title 基础使用
:::

::: demo

<template>
<div class="card-container">
  <lay-card title="标题">
      内容
  </lay-card>
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
.card-container {
  background: whitesmoke;
  padding: 20px;
}
</style>

:::

::: title 卡片插槽
:::

::: demo

<template>
<div class="card-container">
  <lay-card>
      <template v-slot:header>
      标题
      </template>
      <template v-slot:body>
      内容
      </template>
  </lay-card>
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
.card-container {
  background: whitesmoke;
  padding: 20px;
}
</style>

:::

::: title 简单使用
:::

::: demo

<template>
<div class="card-container">
  <lay-card>
      内容
  </lay-card>
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
.card-container {
  background: whitesmoke;
  padding: 20px;
}
</style>

:::

::: title 卡片属性
:::

| 属性  | 描述 | 可选值 |
| ----- | ---- | ------ |
| title | 标题 | --     |

::: title 卡片插槽
:::

| 插槽   | 描述     | 可选值 |
| ------ | -------- | ------ |
| header | 头部插槽 | --     |
| body   | 内容插槽 | --     |
