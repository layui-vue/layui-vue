::: anchor
:::

::: title 时间点选择器
:::

::: describe LayTimeSelect 组件用于选择时间点，它支持自定义时间间隔、时间格式、开始时间和结束时间等属性。
:::

::: describe LayTimeSelect 本身是基于 LaySelect 的，因此你可以传入 LaySelect 的所有属性和事件；在多选模式下，你还可以传入 LayTagInput 的部分属性。
:::

::: demo 基础用法

<template>
  <lay-space direction="vertical">
    <span>modelValue: {{ time1 }}</span>
    <lay-time-select
      v-model="time1"
      :allow-clear="true"
      :inputFormat="'H:i'"
      :interval="'30:00'"
      :start="'08:00:00'"
      :end="'18:30:00'"
      :with-start-time="true"
      :with-end-time="true"
      :format="'H:i:s'"
    >
    </lay-time-select>
  </lay-space>
</template>

<script setup>
import { ref } from "vue";

const time1 = ref("08:00:00");
</script>

:::

::: title 自定义事件格式
:::

::: demo 组件支持自定义时间格式，通过 `inputFormat` 和 `format` 属性来设置。

<template>
  <lay-space direction="vertical">
    <span>modelValue: {{ time2 }}</span>
    <lay-time-select
      v-model="time2"
      :inputFormat="'Y-m-d H:i'"
      :interval="'30:00'"
      :format="'a'"
      ></lay-time-select>
  </lay-space>
</template>

<script setup>
import { ref } from "vue";

const time2 = ref();
</script>

:::

::: title 自定义时间范围
:::

::: demo 组件支持自定义时间范围，通过 `start` 和 `end` 属性来设置。如果你不希望包含 `start` 或者 `end` 的时间点，你可以分别设置 `with-start-time` 或 `with-end-time` 属性为 `false`。

<template>
  <div class="play-container">
    <lay-space direction="vertical">
      <span>modelValue: {{ time3 }}</span>
      <lay-space>
        <lay-time-select
          v-model="time3"
          :inputFormat="'H:i'"
          :start="'08:00:00'"
          :end="'18:30:00'"
        >
        </lay-time-select>
        <span>设置了开始时间和结束时间</span>
      </lay-space>
      <lay-space>
        <lay-time-select
          v-model="time3"
          :inputFormat="'H:i'"
          :start="'08:00:00'"
          :end="'18:30:00'"
          :with-start-time="false"
        >
        </lay-time-select>
        <span>不显示开始时间点 08:00:00</span>
      </lay-space>
      <lay-space>
        <lay-time-select
          v-model="time3"
          :inputFormat="'H:i'"
          :start="'08:00:00'"
          :end="'18:30:00'"
          :with-end-time="false"
        >
        </lay-time-select>
        <span>不显示结束时间点 18:30:00</span>
      </lay-space>
      <lay-space>
        <lay-time-select
          v-model="time3"
          :inputFormat="'H:i'"
          :start="'08:00:00'"
          :end="'18:30:00'"
          :with-start-time="false"
          :with-end-time="false"
        >
        </lay-time-select>
        <span>不显示开始和结束时间点 08:00:00 和 18:30:00</span>
      </lay-space>
    </lay-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const time3 = ref();
</script>

:::

::: title 跳过时间点
:::

::: demo 使用 `skip` 属性来跳过某些时间点。

<template>
  <lay-space direction="vertical">
    <span>modelValue: {{ time6 }}</span>
    <lay-time-select
      v-model="time6"
      :inputFormat="'H:i'"
      :interval="'30:00'"
      :start="'08:00:00'"
      :end="'18:30:00'"
      :skip="['12:00', '12:30', '13:00', '13:30', '14:00', '14:30']"
    >
    </lay-time-select>
  </lay-space>
</template>

<script setup lang="ts">
import { ref } from "vue";

const time6 = ref();
</script>

:::

::: title 时间点多选
:::

::: demo 组件支持时间点多选，通过 `multiple` 属性来设置。多选模式下，编辑框是 LayTagInput 组件，因此你可以传入 `minCollapsedNum` 来折叠多选项。

<template>
  <lay-space direction="vertical">
    <span>modelValue: {{ time4 }}</span>
    <lay-time-select
      v-model="time4"
      :multiple="true"
      :minCollapsedNum="5"
      :allowClear="true"
      :inputFormat="'H:i'"
      :interval="'30:00'"
      :start="'08:00:00'"
      :end="'18:30:00'"
    >
    </lay-time-select>
  </lay-space>
</template>

<script setup>
import { ref } from "vue";

const time4 = ref();
</script>

:::

::: title 尺寸控制
:::

::: demo 组件支持尺寸控制，通过 `size` 属性来设置。这个属性继承于 LaySelect 组件，因此你可以传入 `lg`、`md`、`sm` 和 `xs` 四个值。

<template>
  <lay-space>
    <span>modelValue: {{ time5 }}</span>
    <lay-time-select
      v-model="time5"
      :size="'lg'"
      :inputFormat="'H:i'"
      :interval="'30:00'"
      :start="'08:00:00'"
      :end="'18:30:00'"
    >
    </lay-time-select>
    <lay-time-select
      v-model="time5"
      :size="'md'"
      :inputFormat="'H:i'"
      :interval="'30:00'"
      :start="'08:00:00'"
      :end="'18:30:00'"
    >
    </lay-time-select>
    <lay-time-select
      v-model="time5"
      :size="'sm'"
      :inputFormat="'H:i'"
      :interval="'30:00'"
      :start="'08:00:00'"
      :end="'18:30:00'"
    >
    </lay-time-select>
    <lay-time-select
      v-model="time5"
      :size="'xs'"
      :inputFormat="'H:i'"
      :interval="'30:00'"
      :start="'08:00:00'"
      :end="'18:30:00'"
    >
    </lay-time-select>
  </lay-space>
</template>

<script setup>
import { ref } from "vue";

const time5 = ref();
</script>

:::

::: title 时间格式
:::

::: describe 组件只能使用下面的时间格式，应用于 `inputFormat` 和 `format` 属性。
:::

<lay-quote>年份为<b>完整年份</b>；月、日、时、分、秒会<b>自动补零</b>。</lay-quote>

::: table

| 格式名称 | 说明   | 示例            |
| :------- | :----- | --------------- |
| _Y_      | 年份   | `2024`          |
| _m_      | 月份   | `10`            |
| _d_      | 日期   | `01`            |
| _H_      | 小时   | `08`            |
| _i_      | 分钟   | `00`            |
| _s_      | 秒     | `00`            |
| _a_      | 时间戳 | `1727740800000` |

:::

::: title Props
:::

<lay-quote>
  LayTimeSelect 本身是基于 LaySelect 的，因此你可以传入 LaySelect 的所有属性和事件；在多选模式下，你还可以传入 LayTagInput 的部分属性。此处不做赘述。
</lay-quote>

<lay-quote>
  <h3>注意事项</h3>
  <p>1.&nbsp;&nbsp;<code>start</code>&nbsp;、&nbsp;<code>end</code>&nbsp;和&nbsp;<code>interval</code>&nbsp;都是从<b>右侧</b>开始解析。换句话说，如果在&nbsp;<code>interval</code>&nbsp;上设置成&nbsp;<code>00:30</code>&nbsp;会被解析成<b>每30秒为一个间隔</b>；若是给&nbsp;<code>start/end</code>&nbsp;设置成&nbsp;<code>15:30</code>&nbsp;会被解析成<b>00时15分30秒</b>，以此类推。</p>
  <p>2.&nbsp;&nbsp;<code>interval</code>&nbsp;支持&nbsp;<code>00:70:90</code>&nbsp;这种不合常理的怪异写法，在这里会被合法的解析成4290秒；但在&nbsp;<code>start/end</code>&nbsp;上使用就会出现异常。</p>
</lay-quote>

::: table

| 属性名                                                                                                                                   | 类型            | 默认值       | 说明                                                                        |
| :--------------------------------------------------------------------------------------------------------------------------------------- | :-------------- | :----------- | :-------------------------------------------------------------------------- |
| _modelValue_                                                                                                                             | `string`        | -            | 绑定的值                                                                    |
| _inputFormat_                                                                                                                            | `string`        | `'H:i'`      | 输入框时间格式                                                              |
| _interval_                                                                                                                               | `string`        | `'00:30:00'` | 时间间隔                                                                    |
| _start_                                                                                                                                  | `string`        | `'00:00:00'` | 开始时间                                                                    |
| _end_                                                                                                                                    | `string`        | `'00:00:00'` | 结束时间，如果时分秒加起来等于 0，则会生成到第二天                          |
| _withStartTime_                                                                                                                          | `boolean`       | `true`       | 是否显示开始时间                                                            |
| _withEndTime_                                                                                                                            | `boolean`       | `true`       | 是否显示结束时间                                                            |
| _format_                                                                                                                                 | `string`        | `'H:i'`      | 绑定值的格式                                                                |
| _skip_                                                                                                                                   | `Array<string>` | `[]`         | 跳过的值，例如：`['00:00', '30:00']`，需要与绑定值的格式 _valueFormat_ 匹配 |
| 支持所有 select 中的 props 属性<br>[selectProps 快捷查看](https://www.layui-vue.com/zh-CN/components/select#Select%20%E5%B1%9E%E6%80%A7) |

:::

::: title 事件
:::

::: table

| 属性     | 描述     | 接收值 |
| -------- | -------- | ------ |
| _change_ | 选择事件 | value  |
| _clear_  | 清空事件 | -      |

:::

::: previousNext timeSelect
:::

<script setup>
import { ref } from "vue";
const time1 = ref("08:00:00");
const time2 = ref();
const time3 = ref();
const time4 = ref();
const time5 = ref();
const time6 = ref();
</script>
