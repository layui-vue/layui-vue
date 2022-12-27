::: anchor
:::

::: title 基本介绍
:::

::: describe 当需要将链接转换成为二维码时使用。
:::

::: title 基础使用
:::

::: demo 通过 `color` 与 `background-color` 属性，设置二维码前景色与背景色。

<template>
  <lay-barcode value="6666" />
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
  <lay-barcode value="6666" lineColor="red" />
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

::: title 尺寸大小
:::

::: demo 通过 `color` 与 `background-color` 属性，设置二维码前景色与背景色。

<template>
  <lay-barcode value="6666" width="3" height="100" />
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

::: title 显示编码
:::

::: demo 通过 `color` 与 `background-color` 属性，设置二维码前景色与背景色。

<template>
  <lay-barcode value="6666" text="覆盖默认的 6666 编码" :displayValue="true"/>
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
