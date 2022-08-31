::: anchor
:::

::: title 基本介绍
:::

::: describe 虚拟滚动, 常用于美化浏览器原生滚动条。
:::

::: title 基础使用
:::

::: demo 使用 `lay-scroll` 标签, 创建一个虚拟滚动容器

<template>
  <lay-button @click="changeTotal">修改数据</lay-button>
  <lay-button @click="changeMaxTotal">修改数据</lay-button>
  <lay-scroll height="200px" style="background-color:whitesmoke;height: calc(100% - 62px);">
    <lay-panel v-for="(n,index) in total" :key="n" style="margin:10px;padding:10px;">内容</lay-panel>
  </lay-scroll>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const total = ref(50);

    const changeTotal = () => {
      total.value = 2;
    }

    const changeMaxTotal = () => {
      total.value = 50;
    }

    return {
      total, 
      changeTotal,
      changeMaxTotal
    }
  }
}
</script>

:::

::: title Scroll 属性
:::

::: table

| 属性        | 描述     | 可选值 |
| ----------- | -------- | ------ |
| height      |   高度   | --     |
| thumbWidth |   滑块宽度   | --     |
| thumbColor |   滑块颜色   | --     |
| trackColor   |   滑槽颜色   | --     |

:::

::: contributor scroll
:::  

::: previousNext scroll
:::