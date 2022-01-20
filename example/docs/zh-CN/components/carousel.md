::: anchor
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-carousel v-model="active">
    <lay-carousel-item id="1">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目一</div>
    </lay-carousel-item>
    <lay-carousel-item id="2">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目二</div>
    </lay-carousel-item>
    <lay-carousel-item id="3">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目三</div>
    </lay-carousel-item>
    <lay-carousel-item id="4">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目四</div>
    </lay-carousel-item>
  </lay-carousel>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active = ref("1")

    return {
      active
    }
  }
}
</script>

:::

::: title 不同方向
:::

::: demo

<template>
  <lay-carousel v-model="active" anim="updown">
    <lay-carousel-item id="1">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目一</div>
    </lay-carousel-item>
    <lay-carousel-item id="2">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目二</div>
    </lay-carousel-item>
    <lay-carousel-item id="3">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目三</div>
    </lay-carousel-item>
    <lay-carousel-item id="4">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目四</div>
    </lay-carousel-item>
  </lay-carousel>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active = ref("1")

    return {
      active
    }
  }
}
</script>

:::

::: title 控制位置
:::

::: demo

<template>
  <lay-carousel v-model="active" indicator="outside">
    <lay-carousel-item id="1">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目一</div>
    </lay-carousel-item>
    <lay-carousel-item id="2">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目二</div>
    </lay-carousel-item>
    <lay-carousel-item id="3">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目三</div>
    </lay-carousel-item>
    <lay-carousel-item id="4">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目四</div>
    </lay-carousel-item>
  </lay-carousel>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active = ref("1")

    return {
      active
    }
  }
}
</script>

:::

::: title Carousel 属性
:::

::: table

| 属性      | 描述         | 可选值                    |
| --------- | ------------ | ------------------------- |
| v-model   | 当前激活项   | `--`                      |
| anim      | 切换方向     | `default` `updown`        |
| indicator | 控制器位置   | `inside` `outside` `none` |
| arrow     | 切换按钮状态 | `hover` `always` `none`   |

:::

::: title Carousel 事件
:::

::: table

| 事件   | 描述     | 可选值 |
| ------ | -------- | ------ |
| change | 切换回调 | id     |

:::

::: comment
:::

::: previousNext carousel
:::