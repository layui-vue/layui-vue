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

::: field rate attributes

:::

|         |          |     |
| ------- | -------- | --- |
| v-model | 评分值   | --  |
| length  | 评分长度 | --  |