::: demo

<template>
  <lay-slider v-model="value1" :disabled="true"></lay-slider>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value1 = ref(50)
    return {
      value1
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-slider v-model="value2" :vertical="vertical"></lay-slider>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const vertical = ref(true)
    const value2 = ref(10)

    return {
        vertical,
        value2
    }
  }
}
</script>

:::

::: comment
:::