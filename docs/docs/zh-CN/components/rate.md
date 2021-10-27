::: title 基础使用
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

::: title 响应结果
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

::: title 指定长度
:::

::: demo

<template>
  <lay-rate v-model="all2" :length="length"></lay-rate>
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

::: title 只读模式
:::

::: demo

<template>
  <lay-rate v-model="all3" readonly="true"></lay-rate>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    const all3 = ref(4)

    return {
      all3
    }
  }
}
</script>

:::

::: title 定义主题
:::

::: demo

<template>
  <lay-rate v-model="all4" theme="#FF8000"></lay-rate><br>
  <lay-rate v-model="all4" theme="#009688"></lay-rate><br>
  <lay-rate v-model="all4" theme="#1E9FFF"></lay-rate><br>
  <lay-rate v-model="all4" theme="#2F4056"></lay-rate><br>
  <lay-rate v-model="all4" theme="#FE0000"></lay-rate><br>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    const all4 = ref(4)

    return {
      all4
    }
  }
}
</script>

:::

::: title 评分属性
:::

|          |          |     |
| -------- | -------- | --- |
| v-model  | 评分值   | --  |
| length   | 评分长度 | --  |
| readonly | 只读模式 | --  |
