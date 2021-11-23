::: title 基础使用
:::

::: demo

<template>
    <lay-badge type="dot"></lay-badge>&nbsp;
    <lay-badge type="dot" theme="orange"></lay-badge>&nbsp;
    <lay-badge type="dot" theme="green"></lay-badge>&nbsp;
    <lay-badge type="dot" theme="cyan"></lay-badge>&nbsp;
    <lay-badge type="dot" theme="blue"></lay-badge>&nbsp;
    <lay-badge type="dot" theme="black"></lay-badge>&nbsp;
    <lay-badge type="dot" theme="gray"></lay-badge>&nbsp;
    <lay-badge >赤</lay-badge>&nbsp;
    <lay-badge theme="orange">橙</lay-badge>&nbsp;
    <lay-badge theme="green">绿</lay-badge>&nbsp;
    <lay-badge theme="cyan">青</lay-badge>&nbsp;
    <lay-badge theme="blue">蓝</lay-badge>&nbsp;
    <lay-badge theme="black">黑</lay-badge>&nbsp;
    <lay-badge theme="gray">灰</lay-badge>&nbsp;
    <lay-badge type="rim">6</lay-badge>&nbsp;
    <lay-badge type="rim">Hot</lay-badge>&nbsp;
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 徽章属性
:::

::: table

|       |      |                                               |
| ----- | ---- | --------------------------------------------- |
| type  | 类型 | `dot` `rim`                                   |
| theme | 主题 | `orange` `green` `cyan` `blue` `black` `gray` |

:::
