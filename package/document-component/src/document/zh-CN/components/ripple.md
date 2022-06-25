::: anchor
:::

::: title 基本介绍
:::

::: describe 为组件添加水波纹动画。
:::

::: title 内部水波纹
:::

::: demo 使用 `lay-ripple` 标签, 添加水波纹。

<template>
  <lay-ripple>
    <lay-button>click</lay-button>
  </lay-ripple><br>
  <lay-ripple trigger="always">
    <lay-button>always</lay-button>
  </lay-ripple><br>
  <lay-ripple trigger="mouseenter">
    <lay-button>mouseenter</lay-button>
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

::: title 外部水波纹
:::

::: demo 使用 `lay-ripple` 标签, 添加水波纹。

<template>
  <lay-ripple type="out" borderRadius="1px">
    <lay-button>click</lay-button>
  </lay-ripple><br><br><br>
  <p>always:</p>
  <lay-ripple type="out" trigger="always" borderRadius="50%" color="#009688">
    <div style="border-radius:50%;background-color:#009688;width:8px;height:8px"></div>
  </lay-ripple><br><br><br>
  <p>mouseenter:</p>
  <lay-ripple type="out" trigger="mouseenter" borderRadius="50%" color="#009688" spread-width="50px">
    <div style="border-radius:50%;background-color:#009688;width:20px;height:20px"></div>
  </lay-ripple><br>
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