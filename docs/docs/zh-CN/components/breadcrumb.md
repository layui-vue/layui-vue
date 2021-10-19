::: demo

<template>
    <lay-breadcrumb>
        <lay-breadcrumb-item title="工作空间"></lay-breadcrumb-item>
        <lay-breadcrumb-item title="控制台"></lay-breadcrumb-item>
        <lay-breadcrumb-item title="访问量"></lay-breadcrumb-item>
    </lay-breadcrumb>
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

::: demo

<template>
    <lay-breadcrumb separator=">">
        <lay-breadcrumb-item title="热门音乐"></lay-breadcrumb-item>
        <lay-breadcrumb-item title="王杰"></lay-breadcrumb-item>
        <lay-breadcrumb-item title="谁明浪子心"></lay-breadcrumb-item>
    </lay-breadcrumb>
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

::: demo

<template>
    <lay-breadcrumb separator="--">
        <lay-breadcrumb-item>今天</lay-breadcrumb-item>
        <lay-breadcrumb-item>有些</lay-breadcrumb-item>
        <lay-breadcrumb-item>不开心</lay-breadcrumb-item>
    </lay-breadcrumb>
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

::: field 面包屑属性
:::

| Name   | Description | Accepted Values  |
| --------- | ------ | --- |
| separator | 分割符 | `/` |

::: field 面包屑插槽
:::

| Name   | Description | Accepted Values  |
| --------- | ------ | --- |
| default | 默认插槽 | `--` |
