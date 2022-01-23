::: anchor
:::

::: title 横向
:::

::: demo

<template>
  <lay-slider :step="5" v-model="value1" :disabled="false"></lay-slider>
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
  <lay-slider v-model:standardrange="value3" :range="true"></lay-slider>
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

::: title 纵向区间
:::

::: demo

<template>
  <lay-slider v-model:verticalrange="value4" :range="true" :vertical="true"></lay-slider>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const value4 = ref([23,56])
    return {
      value4
    }
  }
}
</script>
:::

::: title Slider 属性
:::

::: table

| 属性          |         描述          |             类型          |     可选值      |   默认值 |
| ------------ | --------------------- | ------------------------- | -------------- | -------- |
| v-model      | 选中值                | `number`  |        -       |    -    |
| vertical  |  是否垂直     | `Boolean`                   |        -       |    -    |
| range  |  是否区间     | `Boolean`                   |        -       |    -    |
| verticalrange  |  垂直区间值     | `Array`                   |        -       |    -    |
| standardrange  |  水平区间值     | `Array`                   |        -       |    -    |

:::

::: comment
:::

::: previousNext slider
:::
