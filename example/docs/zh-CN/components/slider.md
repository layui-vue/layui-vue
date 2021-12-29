::: anchor
:::

::: title 横向
:::

::: demo

<template>
  <lay-slider v-model="value1" :disabled="false"></lay-slider>
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

::: title 纵向
:::
::: demo

<template>
  <lay-slider v-model="value2" :vertical="true" :disabled="true"></lay-slider>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value2 = ref(10)

    return {
        value2
    }
  }
}
</script>

:::

::: title 区间
:::

::: demo

<template>
  <lay-slider v-model="value3" :range="true"></lay-slider>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const value3 = ref([20,50])
    return {
      value3
    }
  }
}
</script>
:::

::: comment
:::
