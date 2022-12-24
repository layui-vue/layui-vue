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

::: demo 通过 `width` 属性，设置二维码尺寸。

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

::: demo 通过 `color` 与 `background-color` 属性，设置二维码前景色与背景色。

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
| text         | 内容     | string  | --  | --  | --      |
| width        | 宽度     | number  | --        | --                    | --      |
| color        | 颜色     | string | --    | --                    | --      |
| background-color       | 背景色     | string | --    | --                      | --      |

:::

::: contributor button
:::

::: previousNext button
:::
