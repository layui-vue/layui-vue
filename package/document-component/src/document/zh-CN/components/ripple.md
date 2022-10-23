::: anchor
:::

::: title 基本介绍
:::

::: describe 为组件添加水波纹动画。
:::

::: title 基础使用
:::

::: demo 使用 `lay-ripple` 标签, 为 `element` 添加水波纹效果。

<template>
  <lay-space>
    <lay-ripple>
      <lay-button>click</lay-button>
    </lay-ripple>
    <lay-ripple type="out" borderRadius="2px">
      <lay-button>click</lay-button>
    </lay-ripple>
  </lay-space>
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

::: title 触发时机
:::

::: demo 通过 `trigger` 属性, 设置 `ripple` 触发时机。

<template>
  <lay-ripple type="out" trigger="always" borderRadius="2px" color="#009688">
    <lay-button type="primary">闪烁</lay-button>
  </lay-ripple>
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

::: title Ripple 属性
:::

::: table

| 属性        | 描述     | 可选值 |
| ----------- | -------- | ------ |
| type | 波纹类型 | `out` `inset`    |
| color | 波纹颜色 | -- |
| borderRadius | 圆角，仅 `out` 类型 | -- |
| spreadWidth | 扩散宽度，单位 px，仅 `out` 类型 | --     |
| spreadSize | 扩散大小，单位 px，仅 `inset` 类型 | --     |
| trigger | 触发方式 | `click` `always` `mouseenter`|
| center | 是否在元素中心扩散 | --     |

:::

:::title Ripple 插槽
:::

:::table
| 插槽 | 描述 | 参数 |
|------ |----------|-----------|
| default | 默认插槽 | - |
:::

::: contributor ripple
:::  

::: previousNext ripple
:::