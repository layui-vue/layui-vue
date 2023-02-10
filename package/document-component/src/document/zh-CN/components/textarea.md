::: anchor
:::

::: title 基本介绍
:::

::: describe 当需要录入大量的文本文字。
:::

::: title 基础使用
:::

::: demo 使用 `lay-textarea` 标签, 创建文本域

<template>
  <lay-textarea placeholder="请输入描述" style="width:100px;height:100px;min-height:50px;"  v-model="data1">
  </lay-textarea>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const data1 = ref(``);

    return {
      data1
    }
  }
}
</script>

:::

::: title 事件回调
:::

::: demo 通过 `input` 事件, 触发 input 输入回调。

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

::: demo 通过 `disabled` 属性, 禁止输入

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

::: title 清空内容
:::

::: demo 通过 `allow-clear` 属性, 开启清空操作, 默认不显示。

<template>
  <lay-textarea placeholder="请输入内容" v-model="data3" allow-clear></lay-textarea>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const data3 = ref("");

    return {
      data3
    }
  }
}
</script>

:::

::: title 显示字数
:::

::: demo 通过 `show-count` 与 `max-length` 属性, 展示限制长度与当前长度。

<template>
  <lay-textarea placeholder="显示字数" v-model="data4" show-count></lay-textarea>
  <br>
  <lay-textarea placeholder="最大输入长度" v-model="data5" show-count :maxlength="10"></lay-textarea>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const data4 = ref("");
    const data5 = ref("");
    return {
      data4,
      data5
    }
  }
}
</script>

:::

::: title Textarea 属性
:::

::: table

| 属性        | 描述          | 可选值         |可选值         |
| ----------- | ------------- | -------------- | -------------- |
| name        | 原始属性 name | --             | |
| placeholder | 提示信息      | --             | |
| show-count  | 显示字数       | `true` `false`  | |
| disabled    | 禁用          | `true` `false` | |
| v-model     | 值            | --             | |
| maxlength   | 限制输入长度   | --             | |
| rows   | 原生 rows 属性       | --             | 1.8.7 |
| cols   | 原生 cols 属性      | --             | 1.8.7 |
:::

::: title Textarea 事件
:::

::: table

| 事件  | 描述            | 可选值           |
| ----- | --------------- | ---------------- |
| input | 原生 input 事件 | event : 事件对象 |
| foucs | 原生 foucs 事件 | event : 事件对象 |
| blur  | 原生 blur 事件  | --               |

:::

::: contributor textarea
:::

::: previousNext textarea
:::