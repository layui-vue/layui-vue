::: anchor
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-textarea placeholder="请输入描述" v-model="data1"></lay-textarea>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const data1 = ref("");

    return {
      data1
    }
  }
}
</script>

:::

::: title 事件回调
:::

::: demo

<template>
  <lay-textarea placeholder="Input 事件" v-model="data2" @input="input"></lay-textarea>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const data2 = ref("");

    const input = function( val ) {
        console.log(val)
    }

    return {
      data2,
      input
    }
  }
}
</script>

:::

::: title 禁止输入
:::

::: demo

<template>
  <lay-textarea placeholder="禁止输入" v-model="data3" :disabled="disabled"></lay-textarea>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const data3 = ref("");
    const disabled = ref(true)
    return {
      data3,
      disabled
    }
  }
}
</script>

:::

::: title 文本域属性
:::

::: table

| 属性        | 描述          | 可选值         |
| ----------- | ------------- | -------------- |
| name        | 原始属性 name | --             |
| placeholder | 提示信息      | --             |
| disabled    | 禁用          | `true` `false` |
| v-model     | 值            | --             |

:::

::: title 文本域事件
:::

::: table

| 事件  | 描述            | 可选值           |
| ----- | --------------- | ---------------- |
| input | 原生 input 事件 | event : 事件对象 |
| foucs | 原生 foucs 事件 | event : 事件对象 |
| blur  | 原生 blur 事件  | --               |

:::

::: comment
:::

::: previousNext textarea
:::