::: field 基础使用
:::

::: demo

<template>
  <lay-rate></lay-rate>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: field 响应结果
:::

::: demo

<template>
  <lay-rate v-model="all"></lay-rate> {{all}}
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const all = ref(4)

    return {
      all
    }
  }
}
</script>

:::

::: field 指定长度
:::

::: demo

<template>
  <lay-rate v-model="all2" :length="length"></lay-rate> {{all2}}
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    const all2 = ref(4);
    const length = ref(10)

    return {
      all2,
      length
    }
  }
}
</script>

:::

::: field 评分属性
:::

|         |          |     |
| ------- | -------- | --- |
| v-model | 评分值   | --  |
| length  | 评分长度 | --  |