::: anchor
:::


::: title 基本介绍
:::

::: describe 高级 Web 日历组件，完全开源无偿且颜值与功能兼备，足以应对日期相关的各种业务场景。
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-date-picker v-model="endTime"></lay-date-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const endTime = ref("2022-03-04 17:35:00");

    return {
      endTime
    }
  }
}
</script>

:::

::: title 日期时间
:::

::: demo

<template>
  <lay-date-picker type="datetime" v-model="endTime"></lay-date-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const endTime = ref("2022-03-04 17:35:00");

    return {
      endTime
    }
  }
}
</script>

:::

::: comment
:::

::: previousNext transfer
:::