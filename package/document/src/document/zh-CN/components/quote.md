::: anchor
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-quote>引用区域的文字</lay-quote>
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

::: title 灰色主题
:::

::: demo

<template>
  <lay-quote type="nm">引用区域的文字</lay-quote>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const nm = ref(true)

    return {
      nm
    }
  }
}
</script>

:::

::: title Quote 属性
:::

::: table

| Name | Description | Accepted Values |
| ---- | ----------- | --------------- |
| nm   | 灰色样式    | --              |

:::

::: contributor quote
:::  

::: previousNext quote
:::