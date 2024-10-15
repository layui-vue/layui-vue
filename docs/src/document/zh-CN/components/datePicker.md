::: anchor
:::

::: title 基本介绍
:::

::: describe 高级 Web 日历组件，足以应对日期相关的各种业务场景。
:::

::: title 多类型选择
:::

::: demo

<template>
  <lay-form>
    <lay-form-item label="日期" mode="inline">
      <lay-date-picker v-model="endTime" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="时间" mode="inline">
      <lay-date-picker type="time" v-model="endTime2" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="日期时间" mode="inline">
      <lay-date-picker type="datetime" v-model="endTime3" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="年份" mode="inline">
      <lay-date-picker type="year" v-model="endTime4" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="月份" mode="inline">
      <lay-date-picker type="month" v-model="endTime5" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="年份月份" mode="inline">
      <lay-date-picker type="yearmonth" v-model="endTime6" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
  </lay-form>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const endTime = ref(null);
const endTime2 = ref(null);
const endTime3 = ref(null);
const endTime4 = ref(null);
const endTime5 = ref(null);
const endTime6 = ref(null);
</script>

:::

::: title 范围选择
:::

::: demo

<template>
  <lay-form>
    <lay-form-item label="日期范围" :tips="`modelValue: ${rangeTime1}`">
      <lay-date-picker  v-model="rangeTime1" range :placeholder="['开始日期','结束日期']" :allow-clear="true"></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="时间范围" :tips="`modelValue: ${rangeTime4}`">
      <lay-date-picker  v-model="rangeTime4" range type="time" :placeholder="['开始日期','结束日期']"></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="时间日期范围" :tips="`modelValue: ${rangeTime2}`">
      <lay-date-picker  v-model="rangeTime2" range type="datetime" :placeholder="['开始日期','结束日期']"></lay-date-picker>
    </lay-form-item>
    <lay-form-item label=" " :tips="`modelValue: ${rangeTime5}，默认设置时间为 12:30:00`">
      <lay-date-picker v-model="rangeTime5" range :default-time="defaultTime1" type="datetime" :placeholder="['开始日期','结束日期']"></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="年范围" :tips="`modelValue: ${rangeTime6}`">
      <lay-date-picker  v-model="rangeTime6" range type="year" :placeholder="['开始日期','结束日期']"></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="月范围" :tips="`modelValue: ${rangeTime7}`">
      <lay-date-picker  v-model="rangeTime7" range type="month" :placeholder="['开始日期','结束日期']"></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="年月范围" :tips="`modelValue: ${rangeTime3}`">
      <lay-date-picker  v-model="rangeTime3" range type="yearmonth" :placeholder="['开始日期','结束日期']"></lay-date-picker>
    </lay-form-item>
  </lay-form>
</template>

<script setup>
import { ref } from 'vue'
const rangeTime1 = ref([]);
const rangeTime2 = ref(['2001-01-01 01:01:00','2001-02-1 01:01:00']);
const rangeTime3 = ref(['2022-01-01','2023-02-1']);
const rangeTime4 = ref(['01:01:00', '03:03:03']);
const rangeTime5 = ref([]);
const rangeTime6 = ref([]);
const rangeTime7 = ref([]);

const defaultTime1 = '12:30:00'
</script>

:::

::: title 禁止修改
:::

::: demo

<template>
  <lay-date-picker disabled type="year" v-model="endTimeDisabled"></lay-date-picker>
</template>

<script setup>
import { ref } from 'vue'

const endTimeDisabled = ref("2022-03-04 17:35:00");
</script>

:::

::: title 年份选择
:::

::: demo 将 `type` 设置成 `"year"` 使用年份选择模式。可以用 `year-page` 指定每页展示年份的数量。

<template>
  <lay-space>
    <lay-date-picker type="year" v-model="endTimeYearRange"></lay-date-picker>
    <lay-date-picker type="year" v-model="endTimeYearRange" :year-page="32"></lay-date-picker>
  </lay-space>
</template>

<script setup>
import { ref } from 'vue'

const endTimeYearRange = ref("2022");
</script>

:::

::: title 快速选择
:::

::: demo 设置 `simple` 属性后，只需要点击一次后自动关闭，无需点击确认按钮。

<template>
  <lay-form>
    <lay-form-item label="日期" mode="inline">
      <lay-date-picker simple v-model="endTime" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="日期 range" mode="inline">
      <lay-date-picker simple range v-model="endTimeRange" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="年份" mode="inline">
      <lay-date-picker simple type="year" v-model="endTime4" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="年份" mode="inline">
      <lay-date-picker simple type="year" range v-model="endTime4Range" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="月份" mode="inline">
      <lay-date-picker simple type="month" v-model="endTime5" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="月份" mode="inline">
      <lay-date-picker simple type="month" range v-model="endTime5Range" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
    <lay-form-item label="年份月份" mode="inline">
      <lay-date-picker simple type="yearmonth" v-model="endTime6" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
     <lay-form-item label="年份月份range" mode="inline">
      <lay-date-picker simple type="yearmonth" range v-model="endTime6Range" placeholder="click me" allow-clear></lay-date-picker>
    </lay-form-item>
  </lay-form>
</template>

<script setup>
import { ref } from 'vue'

const endTime = ref(null);
const endTimeRange = ref(null);
const endTime4 = ref(null);
const endTime4Range = ref(null);
const endTime5 = ref(null);
const endTime5Range = ref(null);
const endTime6 = ref(null);
const endTime6Range = ref(null);
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

<script setup>
import { ref } from 'vue'

const timestamp1 = ref(new Date().getTime());
const timestamp2 = ref(new Date().getTime());
</script>

:::

::: title 限制可选范围
:::

::: demo 通过预设`min`、`max`属性限制组件选择的最大值与最小值。

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

<script setup>
import { ref } from 'vue'
import dayjs from "dayjs";

const minDate = dayjs().startOf('month').add(10,'day').format('YYYY-MM-DD HH:mm');
const maxDate = dayjs().endOf('month').subtract(10,'day').format('YYYY-MM-DD HH:mm');
const limitDate=ref(dayjs().startOf('month').add(11,'day').format('YYYY-MM-DD HH:mm'));
const limitYear=ref(dayjs().year());
const limitMonth=ref(dayjs().month()+1);
const limitDateRange=ref([])
const maxLimitDate = dayjs().add(1,'month').endOf('month').subtract(10,'day').format('YYYY-MM-DD HH:mm');
const limitTimeRange = ref([]);
</script>

:::

::: title 格式化
:::

::: demo 目前在 type 等于`year`、`month`这类输出值为非组合值时无效，使用`format`属性任意组合吧

<template>
  endTimeFormat: {{endTimeFormat}}
  <lay-date-picker v-model="endTimeFormat" simple type="date" :format="'DD/MM/YYYY'" placeholder="format"></lay-date-picker>
  endTimeInputFormat: {{endTimeInputFormat}}
  <lay-date-picker v-model="endTimeInputFormat" simple type="date" :inputFormat="'DD/MM/YYYY'" placeholder="inputFormat"></lay-date-picker>
</template>

<script setup>
import { ref } from 'vue'

const endTimeFormat = ref(null);
const endTimeInputFormat = ref(null);
</script>

:::

::: title 快捷选项
:::

::: demo 通过 `shortcuts` 在左侧添加快捷选项

<template>
  <lay-space>
    <lay-date-picker v-model="value1" :shortcuts="shortcuts1" type="date" placeholder="format"></lay-date-picker>
    <lay-date-picker v-model="value2" :shortcuts="shortcuts2" type="date" range  placeholder="范围"></lay-date-picker>
  </lay-space>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(null);
const value2 = ref(null);

const shortcuts1 = [
  {text: '明天', value: new Date(new Date().setDate(new Date().getDate() + 1))},
  {text: '后天', value: new Date(new Date().setDate(new Date().getDate() + 2))}
]

const shortcuts2 = [
  {
    text: '上周',
    value: () => {
      const end1 = new Date()
      const start1 = new Date()
      start1.setTime(start1.getTime() - 3600 * 1000 * 24 * 7)
      return [start1, end1]
    },
  },
  {
    text: '上月',
    value: () => {
      const end2 = new Date()
      const start2 = new Date()
      start2.setTime(start2.getTime() - 3600 * 1000 * 24 * 30)
      return [start2, end2]
    },
  },
  {
    text: '之前3个月',
    value: () => {
      const end3 = new Date()
      const start3 = new Date()
      start3.setTime(start3.getTime() - 3600 * 1000 * 24 * 90)
      return [start3, end3]
    },
  },
]
</script>

:::

::: title Date Picker 属性
:::

::: table

| 属性            | 描述                                                                     | 类型                                                                     | 默认值              | 可选值                                              | 版本     |
| --------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------- | --------------------------------------------------- | -------- |
| name            | 原始属性 name                                                            | `string`                                                                 | --                  | --                                                  | --       |
| v-model         | 当前时间                                                                 | `DatePickerModelValueSingleType` `Array<DatePickerModelValueSingleType>` | --                  | --                                                  | --       |
| type            | 选择类型                                                                 | `string`                                                                 | `date`              | `date` `datetime` `year` `month` `time` `yearmonth` | --       |
| disabled        | 是否禁止修改                                                             | `boolean`                                                                | `false`             | —                                                   | —        |
| readonly        | `input` 是否只读                                                         | `boolean`                                                                | `false`             | —                                                   | —        |
| placeholder     | `input` 占位符                                                           | `string`                                                                 | --                  | —                                                   | —        |
| allow-clear     | 允许清空                                                                 | `boolean`                                                                | `false`             | --                                                  | --       |
| simple          | 一次性选择，无需点击确认按钮                                             | `boolean`                                                                | `false`             | --                                                  | --       |
| max             | 最大可选日期                                                             | `string`                                                                 | --                  | --                                                  | --       |
| min             | 最小可选日期                                                             | `string`                                                                 | --                  | --                                                  | --       |
| rang            | 是否范围选择                                                             | `boolean`                                                                | `false`             | --                                                  | --       |
| range-separator | 范围分隔符                                                               | `string`                                                                 | `至`                | --                                                  | --       |
| size            | 尺寸                                                                     | `string`                                                                 | `lg` `md` `sm` `xs` | `md`                                                | --       |
| prefix-icon     | 前置图标                                                                 | `string`                                                                 | `layui-icon-date`   | 内置图标集                                          | `1.4.0`  |
| suffix-icon     | 后置图标                                                                 | `string`                                                                 | --                  | 内置图标集                                          | `1.4.0`  |
| timestamp       | 时间戳模式(13 位),仅对 date 和 datetime 有效                             | `boolean`                                                                | `false`             | `true` `false`                                      | `1.6.5`  |
| format          | 输出格式化                                                               | `string`                                                                 | --                  | 例如`YYYY-MM-DD`                                    | -        |
| input-format          | 输入框格式化                                                               | `string`                                                                 | --                  | 例如`YYYY-MM-DD`                                    | `2.19.0`    |
| default-value   | `首次未点击` 时，下拉弹窗打开时默认显示的时间，传空为组件首次 `渲染时间` | `DatePickerModelValueSingleType` `Array<DatePickerModelValueSingleType>` | --                  | --                                                  | `2.19.0` |
| default-time    | 范围日期 `type=datetime` 时分秒默认时间                                  | `string` `Array<string>`                                                 | --                  | 例如`12:30:00`                                      | `2.17.2` |
| content-style   | 内容自定义样式                                                           | `StyleValue`                                                             | --                  | --                                                  | --       |
| content-class   | 内容自定义 Class                                                         | `string` `Array<string \| object>` `object`                              | --                  | --                                                  | --       |
| year-page       | 年份选择器每页年份的个数           |  `number`            | `15`             | --|              `2.19.0`                    |      
| shortcuts       | 设置快捷选项，需要传入数组对象       |  `Array<Shortcuts>`            | `15`             | --|              `2.19.0`                    |  


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

::: title Types

```ts

import type { ConfigType } from "dayjs";

type DatePickerModelValueSingleType = ConfigType;

interface Shortcuts {
  text: string | number;
  value:
    | DatePickerModelValueSingleType
    | Array<DatePickerModelValueSingleType>
    | (() => DatePickerModelValueSingleType)
    | (() => Array<DatePickerModelValueSingleType>);
}

```

::: previousNext datePicker
:::
