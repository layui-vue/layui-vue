::: anchor
:::

::: title 基本介绍
:::

::: describe 高级 Web 日历组件，足以应对日期相关的各种业务场景。
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-date-picker v-model="endTime" placeholder="click me" allowClear></lay-date-picker>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {

    const endTime = ref(null);

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
  <lay-date-picker type="datetime" v-model="endTime2" placeholder="click me"></lay-date-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

   const endTime2 = ref(null);

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

::: demo 将 `type` 设置成 `"year"` 使用年份选择模式。可以用 `yearPage` 指定每页展示年份的数量，用 `yearStep` 指定生成年份的步进值。

<template>
  <lay-space>
    <lay-date-picker type="year" v-model="endTime3"></lay-date-picker>
    <lay-date-picker type="year" v-model="endTime3" :year-page="32"></lay-date-picker>
    <lay-date-picker type="year" v-model="endTime3" :year-page="29" :year-step="2"></lay-date-picker>
  </lay-space>
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

::: demo 只需要点击一次后自动关闭，无需点击确认按钮,仅在 type 等于`year`、`month`、`date`时有效

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
    <lay-space direction="vertical">
    <lay-space>
      <lay-date-picker  v-model="rangeTime1" range :placeholder="['开始日期','结束日期']" :allow-clear="true"></lay-date-picker>
      modelValue:{{rangeTime1}}
    </lay-space>
    <lay-space>
      <lay-date-picker  v-model="rangeTime2" range type="datetime" :placeholder="['开始日期','结束日期']"></lay-date-picker>
      modelValue:{{rangeTime2}}
    </lay-space>
    <lay-space>
      <lay-date-picker v-model="rangeTime5" range :default-time="defaultTime1" type="datetime" :placeholder="['开始日期','结束日期']"></lay-date-picker>
      default-time: 12:30:00
    </lay-space>
    <lay-space>
      <lay-date-picker  v-model="rangeTime3" range type="yearmonth" :placeholder="['开始日期','结束日期']"></lay-date-picker>
      modelValue:{{rangeTime3}}
    </lay-space>
    <lay-space>
      <lay-date-picker  v-model="rangeTime4" range type="time" :placeholder="['开始日期','结束日期']"></lay-date-picker>
      modelValue:{{rangeTime4}}
    </lay-space>
  </lay-space>
</template>

<script setup>
import { ref } from 'vue'
const rangeTime1 = ref([]);
const rangeTime2 = ref(['2001-01-01 01:01:00','2001-02-1 01:01:00']);
const rangeTime3 = ref(['2022-01-01','2023-02-1']);
const rangeTime4 = ref(['01:01:00', '03:03:03']);
const rangeTime5 = ref([]);

const defaultTime1 = '12:30:00'
</script>

:::

::: title 时间戳模式
:::

::: demo 仅在 type 等于`date`、`datetime`时有效 传入的一个 Unix 时间戳 (13 位数字，从 1970 年 1 月 1 日 UTC 午夜开始所经过的毫秒数)

<template>
  <lay-space direction="vertical">
    <lay-space>
      <lay-date-picker v-model="timestamp1" timestamp></lay-date-picker>
      model-value: {{ timestamp1 }}
    </lay-space>
    <lay-space>
      <lay-date-picker v-model="timestamp2" type='datetime' timestamp></lay-date-picker> 
      model-value: {{ timestamp2 }}
    </lay-space>
  </lay-space>
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

::: title 最大值,最小值
:::

::: demo 通过预设`min`、`max`属性限制组件选择的最大值与最小值,目前仅支持`date`、`year`、`month`、`time(不包含range)`模式，且无法在初始化时强制变更 modelValue,在未来的版本中将补齐这一特性并支持更多模式

<template>
  <lay-space direction="vertical">
    <lay-space>
      <span style='width:70px'> 日期：</span>
      <lay-date-picker v-model='limitDate' :min='minDate' :max='maxDate' placeholder="限制日期"></lay-date-picker>
    </lay-space>
    <lay-space>
      <span style='width:70px'> 年：</span>
      <lay-date-picker type="year" v-model='limitYear'  min='2017' max='2026' placeholder="限制年"></lay-date-picker>
    </lay-space>
    <lay-space>
      <span style='width:70px'> 月:</span>
      <lay-date-picker type="month" v-model='limitMonth' min='2' max='11' placeholder="限制月"></lay-date-picker>
    </lay-space>
    <lay-space>
      <span style='width:70px'> 时间:</span>
      <lay-date-picker type="time" v-model='endTime5' min='14:30:00' max='21:40:00' placeholder="限制时间"></lay-date-picker>
    </lay-space>
    <lay-space>
      <span style='width:70px'> 日期区间：</span>
      <lay-date-picker range v-model='limitDateRange' :min='minDate' :max='maxLimitDate' placeholder="请选择"></lay-date-picker>
    </lay-space>
  </lay-space>
</template>

<script>
import { ref } from 'vue'
import dayjs from "dayjs";
export default {
  setup() {
   const minDate = dayjs().startOf('month').add(10,'day').format('YYYY-MM-DD HH:mm');
   const maxDate = dayjs().endOf('month').subtract(10,'day').format('YYYY-MM-DD HH:mm');
   const limitDate=ref(dayjs().startOf('month').add(11,'day').format('YYYY-MM-DD HH:mm'));
   const limitYear=ref(dayjs().year());
   const limitMonth=ref(dayjs().month()+1);
   const limitDateRange=ref([])
   const maxLimitDate = dayjs().add(1,'month').endOf('month').subtract(10,'day').format('YYYY-MM-DD HH:mm');
   const limitTimeRange = ref([]);
    return {
      minDate,
      maxDate,
      limitDate,
      limitYear,
      limitMonth,
      limitDateRange,
      maxLimitDate,
      limitTimeRange
    }
  }
}
</script>

:::

::: title 格式化
:::

::: demo 目前在 type 等于`year`、`month`这类输出值为非组合值时无效，使用`format`属性任意组合吧

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

| 属性           | 描述                                         | 类型                                        | 默认值              | 可选值                                              | 版本     |
| -------------- | -------------------------------------------- | ------------------------------------------- | ------------------- | --------------------------------------------------- | -------- |
| name           | 原始属性 name                                | `string`                                    | --                  | --                                                  | --       |
| v-model        | 当前时间                                     | `string` `number` `string[]`                | --                  | --                                                  | --       |
| type           | 选择类型                                     | `string`                                    | `date`              | `date` `datetime` `year` `month` `time` `yearmonth` | --       |
| disabled       | 是否禁止修改                                 | `boolean`                                   | `false`             | —                                                   | —        |
| readonly       | `input` 是否只读                             | `boolean`                                   | `false`             | —                                                   | —        |
| placeholder    | `input` 占位符                               | `string`                                    | --                  | —                                                   | —        |
| allowClear     | 允许清空                                     | `boolean`                                   | `false`             | --                                                  | --       |
| simple         | 一次性选择，无需点击确认按钮                 | `boolean`                                   | `false`             | --                                                  | --       |
| max            | 最大可选日期                                 | `string`                                    | --                  | --                                                  | --       |
| min            | 最小可选日期                                 | `string`                                    | --                  | --                                                  | --       |
| rang           | 是否范围选择                                 | `boolean`                                   | `false`             | --                                                  | --       |
| rangeSeparator | 范围分隔符                                   | `string`                                    | `至`                | --                                                  | --       |
| size           | 尺寸                                         | `string`                                    | `lg` `md` `sm` `xs` | `md`                                                | --       |
| prefix-icon    | 前置图标                                     | `string`                                    | `layui-icon-date`   | 内置图标集                                          | `1.4.0`  |
| suffix-icon    | 后置图标                                     | `string`                                    | --                  | 内置图标集                                          | `1.4.0`  |
| timestamp      | 时间戳模式(13 位),仅对 date 和 datetime 有效 | `boolean`                                   | `false`             | `true` `false`                                      | `1.6.5`  |
| format         | 输出格式化                                   | `string`                                    | --                  | 例如`YYYY-MM-DD`                                    | -        |
| default-time   | 范围日期 `type=datetime` 时分秒默认时间      | `string` `Array<string>`                    | --                  | 例如`12:30:00`                                      | `2.17.2` |
| contentStyle   | 内容自定义样式                               | `StyleValue`                                | --                  | --                                                  | --       |
| contentClass   | 内容自定义 Class                             | `string` `Array<string \| object>` `object` | --                  | --                                                  | --       |
| yearPage       | 年份选择器每页年份的个数                     | `2.18.4`                                    | `number`            | `15`                                                | --       |
| yearStep       | 年份选择器年份的步进值                       | `2.18.4`                                    | `number`            | `1`                                                 | --       |

:::

::: title Date Picker 事件
:::

::: table

| 事件   | 描述             | 参数                 |
| ------ | ---------------- | -------------------- |
| change | 原生 change 事件 | (value : 同 v-model) |
| focus  | 原生 focus 事件  | event : Event        |
| blur   | 原生 blur 事件   | event : Event        |
| clear  | 原生 clear 事件  |                      |

:::

::: previousNext datePicker
:::
