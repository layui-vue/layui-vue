::: anchor
:::

::: title 基本介绍
:::

::: describe 当需要将链接转换成为条形码时使用。
:::

::: title 基础使用
:::

::: demo 通过 `lay-barcode` 标签，创建条形码。

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
  <lay-barcode value="6666" lineColor="#009688" />
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

::: demo 通过 `width` 与 `height` 属性，设置条形码尺寸。

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

::: demo 通过 `displayValue` 属性，显示二维码文字，使用 `text` 属性覆盖默认显示的值。

<template>
  <lay-barcode :value="value" :displayValue="true"/>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value = ref("6666");

    return {
      value
    }
  }
}
</script>

:::

::: title Qrcode 属性
:::

::: table

| 属性         | 描述        | 类型    | 默认值   | 可选值                             | 版本    |
| ------------ | ---------- | ------- | --------| ---------------------------------- | ------- |
| value        | 内容       | string  | --       | --                                 | --      |
| lineColor    | 宽度       | string  | --       | --                                 | --      |
| width        | 条形宽度   | number  | --       | --                                 | --      |
| height       | 高度       | number  | --       | --                                  | --      |
| margin       | 边距       | string  | --       | --                                 | --      |
| displayValue | 显示值     | boolean  | --      | --                                  | --      |
| text         | 自定义文本  | string  | --      | --                                  | --      |
| background   | 背景色     | string  | --       | --                                  | --      |
| format       | 格式       | string  | `CODE39` | https://github.com/lindell/JsBarcode#supported-barcodes                                  | --      |

:::

::: contributor button
:::

::: previousNext button
:::
