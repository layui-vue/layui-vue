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

::: title 设置图片
:::

::: demo 通过 `images` 属性，设置二维码中插入的图片。

<template>
  <lay-qrcode text="http://www.layui-vue.com" :images="images"></lay-qrcode>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const images = ref([
      {
        image: 'https://www.layui-vue.com/assets/logo-png-B_GrttYE.png',
        width: 40,
        height: 40,
        top: 0,
        left: 0,
        background: false,
      }, // 画到左上角
      {
        image: 'https://www.layui-vue.com/assets/logo-png-B_GrttYE.png',
        width: 40,
        // height: 40, // 不设置高度，则按默认值画
        top: 0,
        background: false,
      }, // 画到x轴上
      "https://www.layui-vue.com/assets/logo-png-B_GrttYE.png" // 自动画到正中间
    ])
    return {
      images,
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
| *text*         | 内容     | `string`  | --  | --  | -- |
| *width*        | 宽度     | `number`  | `132` | -- | -- |
| *color*        | 前景色    | `string` | `#000` | -- | -- |
| *backgroundColor*       | 背景色     | `string` | `#fff` | -- | -- |
| *options*       | QRCode其他参数     | `Record<string, any>` | -- | -- | -- |
| *images*        | 图片     | `string`  `Array<string>` `Array<QrcodeImageProps>` | -- | -- | `2.18.3` |

:::

::: title QrcodeImageProps
:::

<lay-quote>图片绘制的坐标从左上角开始计算，左上角为(`0`, `0`)，右下角为(`width`, `height`)。<br/>
如果同时启用 `width` + `height` 和 `size`，则 `size` 生效。</lay-quote>

::: table

| 属性         | 描述     | 类型    | 默认值    | 可选值                             | 版本    |
| ------------ | -------- | ------- | --------- | ---------------------------------- | ------- |
| *image*       | 图片地址     | `string`  | --  | --  | `2.18.3` |
| *width*       | 宽度     | `number`  | `32` | -- | `2.18.3` |
| *height*      | 高度     | `number`  | `32` | -- | `2.18.3` |
| *top*         | y轴     | `number`  | 二维码正中央 | -- | `2.18.3` |
| *left*        | x轴     | `number`  | 二维码正中央 | -- | `2.18.3` |
| *size*        | 尺寸 | `number`  | `32` | -- | `2.18.3` |
| *background*  | 启用背景 | `boolean` | `true`    | -- | `2.18.3` |
| *backgroundColor*       | 背景色     | `string` | `#fff` | -- | `2.18.3` |

:::

::: previousNext button
:::
