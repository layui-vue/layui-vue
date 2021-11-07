::: title 基础使用
:::

::: demo

<template>
  <lay-block>引用区域的文字</lay-block>
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
  <lay-block :nm="nm">引用区域的文字</lay-block>
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

::: title Block 属性
:::

::: table

| Name | Description | Accepted Values |
| ---- | ----------- | --------------- |
| nm   | 灰色样式    | --              |

:::
