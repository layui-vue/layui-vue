::: anchor
:::

::: title 基本介绍
:::

::: describe 它们本身细小而并不显眼，但掺杂在其它元素中就显得尤为突出了。页面往往因徽章的陪衬，而显得十分和谐。
:::

::: title 基础使用
:::

::: demo 使用 `lay-badge` 标签, 创建徽章

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

::: title 动画
:::

::: demo 使用 `ripple` 属性, 添加水波纹动画, 仅支持 `dot` 类型
<template>
    <lay-badge type="dot" ripple></lay-badge>&nbsp;
    <lay-badge type="dot" theme="orange" ripple></lay-badge>&nbsp;
    <lay-badge type="dot" theme="green" ripple></lay-badge>&nbsp;
    <lay-badge type="dot" theme="cyan" ripple></lay-badge>&nbsp;
    <lay-badge type="dot" theme="blue" ripple></lay-badge>&nbsp;
    <lay-badge type="dot" theme="black" ripple></lay-badge>&nbsp;
    <lay-badge type="dot" color="blue" ripple></lay-badge>&nbsp;
</template>

<script>
</script>
:::


::: title Badge 属性
:::

::: table

| 属性  | 描述   | 可选值                                       |
| ----- | ---- | --------------------------------------------- |
| type  | 类型 | `dot` `rim`                                   |
| theme | 主题 | `orange` `green` `cyan` `blue` `black` `gray` |

:::

::: title Badge 插槽
:::

::: table

|  插槽  | 描述  |  备注                                              |
| ----- | ---- | --------------------------------------------- |
| default  | 默认 |  非 `dot` 可用                                   |

:::

::: contributor badge
:::

::: previousNext badge
:::