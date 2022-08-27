::: anchor
:::

::: title 基本介绍
:::

::: describe 最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。
:::

::: title 基础使用
:::

::: demo 使用 `lay-card` 标签, 创建卡片组件

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
      <template v-slot:title>
      标题
      </template>
      <template v-slot:body>
      内容
      </template>
      <template v-slot:footer>
      底部
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

::: title 使用插槽
:::

::: demo

<template>
<div class="card-container">
  <lay-card>
      <template v-slot:title>
        标题
      </template>
      <template v-slot:extra>
        更多
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

::: title 边框阴影
:::

::: demo 通过 shadow 属性设置卡片阴影出现的时机。 该属性的值可以是：always、hover或never。

<template>
<div class="card-container">
  <lay-card>
      内容
  </lay-card>
  <lay-card shadow="hover">
      内容
  </lay-card>
  <lay-card shadow="never">
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

::: title Card 属性
:::

::: table

| 属性  | 描述 | 类型 | 可选值 | 可选值 |
| ----- | ---- | ------ | ----- | ----- |
| title | 标题 | `string` | -- | -- |
| shadow | 阴影 | `string` | `always` | `always` `hover` `never` |

:::

::: title Card 插槽
:::

::: table

| 插槽    | 描述      | 可选值 | 版本 |
| ------- | -------- | ------ |------ |
| default | 默认插槽  | --     |--     |
| header  | 头部插槽  | --     |--     |
| body    | 内容插槽  | --     |--     |
| extra   | 扩展插槽  | --     |--     |
| footer   | 扩展插槽 | --     |`1.4.3`|
:::

::: contributor card
:::

::: previousNext card
:::
