::: title 基础使用
:::

::: demo

<template>
  <lay-collapse :openKeys="openKeys">
    <lay-collapse-item title="标题" id="1"> 内容 </lay-collapse-item>
    <lay-collapse-item title="标题" id="2"> 内容 </lay-collapse-item>
    <lay-collapse-item title="标题" id="3"> 内容 </lay-collapse-item>
  </lay-collapse>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const openKeys = ref(["1","2","3"])

    return {
      openKeys
    }
  }
}
</script>

:::

::: title Collapse attributes

:::

| Name     | Description | Accepted Values |
| -------- | ----------- | --------------- |
| openKeys | 打开的目录  | `array`         |

::: title Collapse-item attributes

:::

| Name  | Description | Accepted Values |
| ----- | ----------- | --------------- |
| id    | 编号        | --              |
| title | 标题        | --              |
