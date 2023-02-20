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
  <lay-date-picker v-model="endTime" placeholder="click me" allowClear></lay-date-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const endTime = ref("");

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

   const endTime2 = ref("");

    return {
      endTime2
    }
  }
}
</script>

:::

::: title 禁止修改
:::

::: demo

<template>
  <lay-date-picker disabled type="year" v-model="endTime3"></lay-date-picker>
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

   const endTime3 = ref("2022");

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
  <lay-date-picker type="month" v-model="mouth"></lay-date-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const mouth = ref("4");

    return {
      mouth
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

   const endTime5 = ref("17:35:00");

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

   const endTime6 = ref("2022-03");

    return {
      endTime6
    }
  }
}
</script>

:::

::: title 一次性选择
:::

::: demo 只需要点击一次后自动关闭，无需点击确认按钮,仅在type等于`year`、`month`、`date`时有效

<template>
<div style="display:flex">
  <lay-date-picker v-model="endTime7" simple type="year"></lay-date-picker>
  <lay-date-picker v-model="endTime7" simple type="month" style="margin:0 10px"></lay-date-picker>
  <lay-date-picker v-model="endTime7" simple type="date"></lay-date-picker>
</div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const endTime7 = ref("2022-03-04 17:35:00");

    return {
      endTime7
    }
  }
}
</script>

:::

::: title 范围选择
:::

::: demo

<template>
  <div style="display:flex;  align-items: center;margin-bottom: 5px;">
    <lay-date-picker  v-model="rangeTime1" range :placeholder="['开始日期','结束日期']"></lay-date-picker>
    <span style="margin-left:10px">modelValue:{{rangeTime1}}</span>
  </div>
  <div style="display:flex;  align-items: center;margin-bottom: 5px;">
    <lay-date-picker  v-model="rangeTime2" range type="datetime" :placeholder="['开始日期','结束日期']"></lay-date-picker>
    <span style="margin-left:10px">modelValue:{{rangeTime2}}</span>
  </div>
  <div style="display:flex;  align-items: center;margin-bottom: 5px;">
    <lay-date-picker  v-model="rangeTime3" range type="yearmonth" :placeholder="['开始日期','结束日期']"></lay-date-picker>
    <span style="margin-left:10px">modelValue:{{rangeTime3}}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const rangeTime1 = ref([]);
const rangeTime2 = ref(['2001-01-01','2001-02-1']);
const rangeTime3 = ref(['2022-01-01','2023-02-1']);
</script>

:::

::: title 时间戳模式
:::

::: demo 仅在type等于`date`、`datetime`时有效 传入的一个 Unix 时间戳 (13 位数字，从1970年1月1日 UTC 午夜开始所经过的毫秒数) 

<template>
  <div style="display:flex;  align-items: center;margin-bottom: 5px;">
    <lay-date-picker v-model="timestamp1" timestamp></lay-date-picker> 
    <span style="margin-left:10px">modelValue:{{timestamp1}}</span>
  </div>
    <div style="display:flex;  align-items: center;margin-bottom: 5px;">
    <lay-date-picker v-model="timestamp2" type='datetime' timestamp></lay-date-picker> 
    <span style="margin-left:10px">modelValue:{{timestamp2}}</span>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const timestamp1 = ref(new Date().getTime());
   const timestamp2 = ref(new Date().getTime());
    return {
      timestamp1,timestamp2
    }
  }

</script>

:::
::: title 格式化
:::

::: demo 目前在type等于`year`、`month`这类输出值为非组合值时无效，使用`format`属性任意组合吧

<template>
  <lay-date-picker v-model="endTime8" simple type="date" :format="'DD/MM/YYYY'" placeholder="click me"></lay-date-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
   const endTime8 = ref();
    return {
      endTime8
    }
  }
}
</script>
:::
::: title Date Picker 属性
:::

::: table

| 属性          | 描述                                                         | 类型           | 默认值 | 可选值         | 版本         |
| ------------- | ------------------------------------------------------------ | -------------- | ------ | -------------- |-------------- |
| v-model      | 当前时间                                                     | `string`         | --    | --             | --             |
| type        | 选择类型                                                   | `string`         | `date`    | `date` `datetime` `year` `month` `time` `yearmonth`             | --             |
| disabled      | 是否禁止修改                                                     | `boolean`         | `false`    | —             | —             |
| simple      | 一次性选择，无需点击确认按钮             | `boolean`         | `false`    | --             | --             |
| readonly      | 只读             | `boolean`         | `false`    | --             | --             |
| allowClear    | 允许清空             | `boolean`         | `true`    | --             | --             |
| size    | 尺寸            | `string`         | `lg` `md` `sm` `xs`    | `md`            | --             |
| prefix-icon    | 前置图标            | `string`         | `layui-icon-date`    |  内置图标集            | `1.4.0`             |
| suffix-icon    | 后置图标            | `string`         | --    | 内置图标集            | `1.4.0`             |
| timestamp    | 时间戳模式(13位),仅对date和datetime有效| `boolean`        | `false`    | `true` `false`         | `1.6.5`             |
| format    | 输出格式化 | `string`        | --   | 例如`YYYY-MM-DD`         | -            |
| contentStyle             | 内容自定义样式     | `StyleValue` | -- | -- |-- |
| contentClass             | 内容自定义Class    | `string` `Array<string \| object>` `object` | -- | -- |-- |
:::

::: title Date Picker 事件
:::

::: table

| 事件  | 描述                | 参数                        |
| ----- | ------------------- | -------------------------- |
| change| 原生 change 事件    | (value : 同v-model) |
| focus | 原生 focus事件     | event : Event               |
| blur  | 原生 blur 事件      | event : Event               |
:::

::: contributor datePicker
:::

::: previousNext datePicker
:::