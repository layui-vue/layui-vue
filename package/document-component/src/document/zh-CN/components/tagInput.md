::: anchor
:::

::: title 基本介绍
:::

::: describe 通过鼠标或键盘，输入范围内的数值。
:::

::: title 基础使用
:::

::: demo 使用 `lay-tag-input` 标签, 创建标签输入框。  

<template>
  <lay-tag-input v-model="data1" v-model:inputValue="inputValue"></lay-tag-input>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const data1 = ref(['Vue', 'React']);
    const inputValue = ref();
    watch(data1, (val) => {
      console.log("tagData",val)
    })
    watch(inputValue, (val) => {
      console.log("inputValue",val)
    })

    return {
      data1,
      inputValue
    }
  }
}
</script>

:::