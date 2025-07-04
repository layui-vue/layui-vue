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

<style>
.layui-date-picker-static .layui-laydate-main-date{
  width: auto;
}

.date-cell {
  width: 44px;
  height: 40px;
  display: flex;
  flex-direction: column;
}
</style>

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

::: demo 设置 `simple` 属性后，只需要点击一次后自动关闭，无需点击确认按钮。 对于 `datetime` 、 `time` 与对应 `range` 模式因交互影响无效。

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

::: title 禁止任何日期
:::

::: demo 通过 `disabled-date` 可禁止任何日期，优先级大于 `max` `min`。

<template>
  <lay-space direction="vertical">
    <lay-space>
      年份：
      <lay-date-picker
        type="year"
        :disabledDate="disabledDateYear"
        v-model="date1"
        placeholder="2的倍数年份禁止"
      ></lay-date-picker>
      <lay-date-picker
        type="year"
        :disabledDate="disabledDateYear"
        range
        v-model="date1range"
        placeholder="2的倍数年份禁止 range"
      ></lay-date-picker>
    </lay-space>
    <lay-space>
      月份：
      <lay-date-picker
        type="month"
        :disabledDate="disabledDateMonth"
        v-model="date2"
        placeholder="4月或者6月不可选"
      ></lay-date-picker>
      <lay-date-picker
        type="month"
        :disabledDate="disabledDateMonth"
        range
        v-model="date2range"
        placeholder="4月或者6月不可选 range"
      ></lay-date-picker>
    </lay-space>
    <lay-space>
      年月份：
      <lay-date-picker
        type="yearmonth"
        :disabledDate="disabledDateYearMonth"
        v-model="date3"
        defaultValue="2024-01"
        placeholder="2024-01/2023-03不可选"
      ></lay-date-picker>
      <lay-date-picker
        type="yearmonth"
        :disabledDate="disabledDateYearMonth"
        range
        v-model="date3range"
        defaultValue="2024-01"
        placeholder="2024-01/2023-03不可选 range"
      ></lay-date-picker>
    </lay-space>
    <lay-space>
      日期：
      <lay-date-picker
        type="date"
        :disabledDate="disabledDate"
        v-model="date4"
        defaultValue="2024-10-16"
        placeholder="2024-10-01/02、2024-09-02"
      ></lay-date-picker>
      <lay-date-picker
        type="date"
        :disabledDate="disabledDate"
        range
        defaultValue="2024-10-16"
        v-model="date4range"
        placeholder="2024-10-01/02、2024-09-02 range"
      ></lay-date-picker>
    </lay-space>
    <lay-space>
      日期时分秒：
      <lay-date-picker
        type="datetime"
        :disabledDate="disabledDateTime"
        v-model="date5"
        defaultValue="2024-10-16"
        placeholder="2024-10-12 01:00:00"
      ></lay-date-picker>
      <lay-date-picker
        type="datetime"
        :disabledDate="disabledDateTime"
        range
        defaultValue="2024-10-16"
        v-model="date5range"
        placeholder="2024-10-12 01:00:00"
      ></lay-date-picker>
    </lay-space>
    <lay-space>
      时分秒：
      <lay-date-picker
        type="time"
        :disabledDate="disabledTime"
        v-model="date6"
        defaultValue="2024-10-16"
        placeholder="当前之后时间禁止"
      ></lay-date-picker>
      <lay-date-picker
        type="time"
        :disabledDate="disabledTime"
        range
        defaultValue="2024-10-16"
        v-model="date6range"
        placeholder="当前之后时间禁止"
      ></lay-date-picker>
    </lay-space>
  </lay-space>
</template>

<script setup>
import { ref } from "vue";

const date1 = ref();
const date1range = ref();
const date2 = ref();
const date2range = ref();
const date3 = ref();
const date3range = ref();
const date4 = ref();
const date4range = ref();
const date5 = ref();
const date5range = ref();
const date6 = ref();
const date6range = ref();

const disabledDateYear = (date) => {
  return date.getFullYear() % 2;
};

const disabledDateMonth = (date) => {
  return date.getMonth() + 1 === 4 || date.getMonth() + 1 === 6;
};

const disabledDateYearMonth = (date) => {
  return date.getFullYear() === 2024 && [1, 3].includes(date.getMonth() + 1)
};

const isSameDay = (dateA, dateB) => {
    return (
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
    );
  };
const disabledS = [
  new Date("2024-10-01"),
  new Date("2024-10-03"),
  new Date("2024-09-02"),
];

const disabledDate = (date) => {
  return disabledS.some((itemDate) => {
    return isSameDay(itemDate, date);
  });
};

const disabledDateTime = (date) => {
  return date.getTime() === new Date("2024-10-12T01:00:00").getTime();
}

const disabledTime = (date) => {
  return date.getTime() > Date.now();
}
</script>
 
:::

::: title 最大或最小日期
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

::: title 默认日期
:::

::: demo `default-value` 可用于在 `modelValue` 为空时，面板展示的默认日期。 在 `range` 模式时，会设置 `左侧` 面板默认日期。

<template>
  <lay-space direction="vertical">
    <lay-date-picker v-model="date1" type="date" :defaultValue="defaultValue" placeholder="defaultValue 2000-01-01"></lay-date-picker>
    <lay-date-picker v-model="date1" type="date" :defaultValue="defaultValue" range placeholder="defaultValue 2000-01-01"></lay-date-picker>
    <lay-date-picker v-model="date1" type="datetime" :defaultValue="defaultValue" defaultTime="12:30:00" range placeholder="defaultTime 12:30:00"></lay-date-picker>
  </lay-space>
</template>

<script setup>
import { ref } from 'vue'

const date1 = ref();
const date2 = ref([]);
const defaultValue = '2000-01-01'
</script>

:::

::: title 格式化
:::

::: demo `format` 用于格式化输出 `modelValue`，`inputFormat` 用于格式化输入框显示。

<template>
  <lay-space direction="vertical">
    endTimeFormat: {{endTimeFormat}}
    <lay-date-picker v-model="endTimeFormat" simple type="date" :format="'DD/MM/YYYY'" placeholder="format"></lay-date-picker>
    endTimeInputFormat: {{endTimeInputFormat}}
    <lay-date-picker v-model="endTimeInputFormat" simple type="date" :inputFormat="'DD/MM/YYYY'" placeholder="inputFormat"></lay-date-picker>
  </lay-space>
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

::: title 静态面板
:::

::: demo 通过 `static` 开启静态面板模式

<template>
  <lay-space direction="vertical">
    modelValue: {{value11}}
    <lay-date-picker v-model="value11" static type="date" placeholder="format"></lay-date-picker>
  </lay-space>
  <lay-space style="margin-top: 10px" direction="vertical">
    modelValue: {{value12}}
    <lay-date-picker v-model="value12" static type="date" range  placeholder="范围"></lay-date-picker>
  </lay-space>
</template>

<script setup>
import { ref } from 'vue'

const value11 = ref(null);
const value12 = ref([]);

</script>

:::

::: title 自定义内容
:::

::: demo 通过 `default` 插槽自定义渲染内容。

<template>
  <lay-date-picker static v-model="value13" content-class="custom-date-picker" placeholder="click me" allow-clear>
    <template #default="{ type, unix, dayjs }">
      <div v-if="type === 'date'" class="date-cell">
        {{ `${dayjs.format('D')}` }}
        <span>{{ dayjs.day() === 0 || dayjs.day() === 6 ? '休息' : '上班' }}</span>
      </div>
      <template v-if="type === 'month'">
        {{ `${dayjs.month() + 1}月` }}
      </template>
      <template v-if="type === 'year'">
        {{ `${dayjs.year() + 1}年` }}
      </template>
    </template>
  </lay-date-picker>
</template>

<script setup>
import { ref } from 'vue'

const value13 = ref()
</script>

<style>
.layui-date-picker-static .layui-laydate-main-date{
  width: auto;
}

.date-cell {
  width: 44px;
  height: 40px;
  display: flex;
  flex-direction: column;
}
</style>

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
| placeholder     | `input` 占位符                           | `string` `Array<string>`                           | --                  | —                                                   | —        |
| allow-clear     | 允许清空                                                                 | `boolean`                                                                | `false`             | --                                                  | --       |
| simple          | 一次性选择，无需点击确认按钮                                             | `boolean`                                                                | `false`             | --                                                  | --       |
| disabled-date       | 判断是否禁止日期的函数，接收一个 `Date` 对象参数，并返回一个 `boolean` 用于是否禁止           |  `(value: Date)=> boolean`            | --             | --|              `2.19.0`                    |      
| max             | 最大可选日期 存在 `disabled-date` 此属性无效                                          | `DatePickerModelValueSingleType `                                                                 | --                  | --                                                  | --       |
| min             | 最小可选日期 存在 `disabled-date` 此属性无效                                         | `DatePickerModelValueSingleType `                                                                 | --                  | --                                                  | --       |
| range            | 是否范围选择                                                             | `boolean`                                                                | `false`             | --                                                  | --       |
| range-separator | 范围分隔符                                                               | `string`                                                                 | `至`                | --                                                  | --       |
| size            | 尺寸                                                                     | `string`                                                                 | `lg` `md` `sm` `xs` | `md`                                                | --       |
| prefix-icon     | 前置图标                                                                 | `string`                                                                 | `layui-icon-date`   | 内置图标集                                          | `1.4.0`  |
| suffix-icon     | 后置图标                                                                 | `string`                                                                 | --                  | 内置图标集                                          | `1.4.0`  |
| timestamp       | 时间戳模式(13 位),仅对 date 和 datetime 有效                             | `boolean`                                                                | `false`             | `true` `false`                                      | `1.6.5`  |
| format          | 输出格式化                                                               | `string`                                                                 |   [查看映射](https://gitee.com/layui-vue/layui-vue/tree/master/packages/component/component/datePicker/hook/useDatePicker.ts#L56)                | 参考[dayjs format](https://day.js.org/docs/en/display/format#list-of-all-available-formats)                                    | -        |
| input-format          | 输入框格式化                                                               | `string`                                                                 | [查看映射](https://gitee.com/layui-vue/layui-vue/tree/master/packages/component/component/datePicker/hook/useDatePicker.ts#L56)                  | 参考[dayjs format](https://day.js.org/docs/en/display/format#list-of-all-available-formats)                                    | `2.19.0`    |
| default-value   | `首次未点击` 时，下拉弹窗打开时默认显示的时间，传空为组件首次 `渲染时间` | `DatePickerModelValueSingleType` `Array<DatePickerModelValueSingleType>` | --                  | --                                                  | `2.19.0` |
| default-time    | `type=datetime` 时分秒默认时间                                  | `string` `Array<string>`                                                 | --                  | 例如`12:30:00`                                      | `2.17.2` |
| content-style   | 内容自定义样式                                                           | `StyleValue`                                                             | --                  | --                                                  | --       |
| content-class   | 内容自定义 Class                                                         | `string` `Array<string \| object>` `object`                              | --                  | --                                                  | --       |
| year-page       | 年份选择器每页年份的个数           |  `number`            | `15`             | --|              `2.19.0`                    |      
| shortcuts       | 设置快捷选项，需要传入数组对象       |  `Array<Shortcuts>`            | --             | --|              `2.19.0`                    |  
| static          | 静态日期面板模式       |  `boolean`            | `false`            | --|              `2.22.1`                    |  
| teleportProps   | 继承至 dropdown 组件，下拉面板 `传递` 属性  | `object`             | `{to: 'body', disabled: false}`   |  --  | `2.22.1` |


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

::: title Date Picker 插槽
:::

::: table

| 插槽       | 描述              | 参数              | 版本     |
| ---------- | -----------------| ----------------- | -------- |
| default    |  默认             | `DatePickerDefaultSlotParams` | `2.23.0` |
| footer     |  底部            | `DatePickerFooterSlotParams` | `2.23.0` |

:::

::: title Types

```ts

import type { Dayjs } from "dayjs";

type DatePickerModelValueSingleType = string | number | Date | Dayjs | null | undefined;

interface Shortcuts {
  text: string | number;
  value:
    | DatePickerModelValueSingleType
    | Array<DatePickerModelValueSingleType>
    | (() => DatePickerModelValueSingleType)
    | (() => Array<DatePickerModelValueSingleType>);
}

interface DatePickerDefaultSlotParams {
  type: "date" | "month" | "year";
  unix: number; // 字符戳(毫秒)
  dayjs: Dayjs; // dayjs
}

interface DatePickerFooterSlotParams {
  // 非范围选择选中日期
  current: Dayjs | null | undefined;
  // 范围选择 左侧面板选中日期
  start: Dayjs | null | undefined;
  // 范围选择 右侧面板选中日期
  end: Dayjs | null | undefined;
}

```

::: previousNext datePicker
:::
