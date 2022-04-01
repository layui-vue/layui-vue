::: anchor
:::


::: title 基本介绍
:::

::: describe 高级 Web 日历组件，完全开源无偿且颜值与功能兼备，足以应对日期相关的各种业务场景。
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-date-picker v-model="endTime"></lay-date-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const endTime = ref("2022-03-04 17:35:00");

    return {
      endTime
    }
  }
}
</script>

:::

::: title 日期时间
:::

::: demo

<template>
  <lay-date-picker type="datetime" v-model="endTime2"></lay-date-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const endTime2 = ref("2022-03-04 17:35:00");

    return {
      endTime2
    }
  }
}
</script>

:::

::: title 年份选择
:::

::: demo

<template>
  <lay-date-picker type="year" v-model="endTime3"></lay-date-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const endTime3 = ref("2022-03-04 17:35:00");

    return {
      endTime3
    }
  }
}
</script>

:::

::: title 月份选择
:::

::: demo

<template>
  <lay-date-picker type="month" v-model="endTime4"></lay-date-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const endTime4 = ref("2022-03-04 17:35:00");

    return {
      endTime4
    }
  }
}
</script>

:::

::: title 时间选择
:::

::: demo

<template>
  <lay-date-picker type="time" v-model="endTime5"></lay-date-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const endTime5 = ref("2022-03-04 17:35:00");

    return {
      endTime5
    }
  }
}
</script>

:::

::: title 年月选择
:::

::: demo

<template>
  <lay-date-picker type="yearmonth" v-model="endTime6"></lay-date-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const endTime6 = ref("2022-03-04 17:35:00");

    return {
      endTime6
    }
  }
}
</script>

:::

::: title Date Picker 属性
:::

::: table

| 属性          | 描述                                                         | 类型           | 默认值 | 可选值         |
| ------------- | ------------------------------------------------------------ | -------------- | ------ | -------------- |
| v-model      | 当前时间                                                     | `string`         | --    | —             |
| type        | 选择类型                                                   | `string`         | `date`    | `date` `datetime` `year` `month` `time` `yearmonth`             |

:::

::: previousNext transfer
:::