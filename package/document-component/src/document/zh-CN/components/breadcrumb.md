::: anchor
:::

::: title 基本介绍
:::

::: describe 显示当前页面在系统层级结构中的位置，并能向上返回。
:::

::: title 基础使用
:::

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

::: title 指定分割
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

::: title 使用插槽
:::

::: demo

<template>
    <lay-breadcrumb separator="-">
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

::: title Breadcrumb 属性
:::

::: table

| 属性      | 描述   | 默认值 |
| --------- | ------ | ------ |
| separator | 分割符 | `/`    |

:::

::: title Breadcrumb 插槽
:::

::: table

| 插槽    | 描述     | 默认值 |
| ------- | -------- | ------ |
| default | 默认插槽 | `--`   |

:::

::: contributor breadcrumb
:::

::: previousNext breadcrumb
:::