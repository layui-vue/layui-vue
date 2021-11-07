::: title 基础使用
:::

::: demo

<template>
  <lay-input v-model="data1"></lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const data1 = ref("内容");

    return {
      data1
    }
  }
}
</script>

:::

::: title 提示信息
:::

::: demo

<template>
  <lay-input placeholder="提示信息"></lay-input>
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

::: title 事件回调
:::

::: demo

<template>
  <lay-input v-model="data2" @input="input"></lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const data2 = ref("Input 事件");
    const input = function( val ) {
        console.log("当前值:" + val)
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
  <lay-input placeholder="禁止输入" :disabled="disabled"></lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const disabled = ref(true)

    return {
        disabled
    }
  }
}
</script>

:::

::: title 输入框属性
:::

::: table

| 属性        | 描述          | 可选值         |
| ----------- | ------------- | -------------- |
| name        | 原始属性 name | --             |
| placeholder | 提示信息      | --             |
| disabled    | 禁用          | `true` `false` |
| v-model     | 值            | --             |

:::

::: title 输入框属性
:::

::: table

| 事件  | 描述            | 参数             |
| ----- | --------------- | ---------------- |
| input | 原生 input 事件 | event : 事件对象 |
| foucs | 原生 foucs 事件 | event : 事件对象 |
| blur  | 原生 blur 事件  | --               |

:::