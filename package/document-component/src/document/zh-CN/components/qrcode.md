::: anchor
:::

::: title 基本介绍
:::

::: describe 当需要将链接转换成为二维码时使用。
:::

::: title 基础使用
:::

::: demo 使用 `lay-qrcode` 标签, 创建一个二维码。

<template>
  <lay-qrcode text="http://www.layui-vue.com"></lay-qrcode>
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

::: title 设置尺寸
:::

::: demo 使用 `lay-qrcode` 标签, 创建一个二维码。

<template>
  <lay-qrcode text="http://www.layui-vue.com" :width="100"></lay-qrcode>
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

::: title 设置颜色
:::

::: demo 使用 `lay-qrcode` 标签, 创建一个二维码。

<template>
  <lay-qrcode text="http://www.layui-vue.com" color="#009688"></lay-qrcode>
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

::: title Qrcode 属性
:::

::: table

| 属性         | 描述     | 类型    | 默认值    | 可选值                             | 版本    |
| ------------ | -------- | ------- | --------- | ---------------------------------- | ------- |
| type         | 主题     | string  | `primary` | `primary` `normal` `warm` `danger` | --      |
| size         | 尺寸     | string  | --        | `lg` `sm` `xs`                     | --      |
| fluid        | 最大化   | boolean | `false`   | `true` `false`                     | --      |
| radius       | 圆角     | boolean | `false`   | `true` `false`                     | --      |

:::

::: contributor button
:::

::: previousNext button
:::
