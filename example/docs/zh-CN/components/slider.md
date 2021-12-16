::: demo

<template>
  <lay-slider v-model="value"></lay-slider>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(50)
    return {
      value
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-slider :vertical="vertical"></lay-slider>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const vertical = ref(true)

    return {
        vertical
    }
  }
}
</script>

:::

::: comment
:::