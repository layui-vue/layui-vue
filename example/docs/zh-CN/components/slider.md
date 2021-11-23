::: demo

<template>
  <lay-slider></lay-slider>
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