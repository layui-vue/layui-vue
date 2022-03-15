::: anchor
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-date-picker  v-model="endTime"  frontText="结束时间:"></lay-date-picker>
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

::: previousNext datePicker
:::