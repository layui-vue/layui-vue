::: anchor
:::

::: title 人性化时间
:::

::: describe 人性化时间，将时间戳转换为相对时间。
:::

::: demo 从 `@layui/component/directives` 引入 `vRelativeTime` 指令，然后将其绑定到元素上。

<template>
  <div>
    <div>当前时间戳：{{ now }}</div>
    <div>当前时间：{{ nowTime }}</div>
    <div>相对时间：<span v-relative-time="now"></span></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vRelativeTime } from "@layui/component/directives";

const now = ref(new Date().getTime());
const nowTime = ref(new Date());
</script>
:::

::: demo 与别的时间进行比较

<template>
  <div>
    <div>比较时间：{{ cmp1 }}</div>
    <div>被比较时间：{{ cmp2 }}</div>
    <div>相对时间：<span v-relative-time="{value: cmp1, compareDate: cmp2}"></span></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vRelativeTime } from "@layui/component/directives";

const cmp1 = ref(new Date("2021/09/27 00:00:00"));
const cmp2 = ref(new Date());
</script>
:::

::: title 参数
:::

::: table

| 名称 | 类型 | 默认值 | 描述 |
| -  | - | - | - |
| *value* | `number` `Date` `string` | - | **比较时间**，可以是数字、日期对象、日期字符串 |
| *compareDate* | `number` `Date` `string` | - | **被比较时间**，可以是数字、日期对象、日期字符串，默认为当前时间 |
| *limit* | `number` | - | 相对时间显示的阈值，单位为秒，超过该值则显示具体时间 |

:::
