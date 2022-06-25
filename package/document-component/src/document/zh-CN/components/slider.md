::: anchor
:::

::: title 基本介绍
:::

::: describe 作为一个拖拽式的交互性组件，滑块往往能给产品带来更好的操作体验。
:::

::: title 横向
:::

::: demo 使用 `lay-slider` 标签, 创建滑块

<template>
  <lay-slider :showDots="true" :step="10" :max="100" v-model="value1" :disabled="false"></lay-slider>
  <lay-input-number v-model="value1"></lay-input-number>
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
  <lay-slider :showDots="false" :step="10" v-model="value2" :vertical="true" :disabled="false"></lay-slider>
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
  <lay-slider :disabled="false" :min="0" :max="100" v-model:rangeValue="value3" :range="true"></lay-slider>
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
  <lay-slider v-model:rangeValue="value4" :range="true" :vertical="true" :disabled="false"></lay-slider>
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
| v-model      | 选中值                | `Number`  |        -       |    -    |
| vertical  |  是否垂直     | `Boolean`                   |        -       |    -    |
| range  |  是否区间     | `Boolean`                   |        -       |    -    |
| rangeValue  |  区间值     | `Array`                   |        -       |    -    |
| step  |  步长     | `Number`                   |        -       |    -    |
| min  |  最小值     | `Number`                   |        -       |    -    |
| max  |  最大值     | `Number`                   |        -       |    -    |
| showDots  |  是否显示断点     | `Boolean`                   |        -       |    false    |
:::

::: contributor slider
::: 

::: previousNext slider
:::
