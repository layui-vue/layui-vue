::: anchor
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-carousel v-model="active1">
    <lay-carousel-item id="1">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#009688;">条目一</div>
    </lay-carousel-item>
    <lay-carousel-item id="2">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#5FB878;">条目二</div>
    </lay-carousel-item>
    <lay-carousel-item id="3">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#FFB800;">条目三</div>
    </lay-carousel-item>
    <lay-carousel-item id="4">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#FF5722;">条目四</div>
    </lay-carousel-item>
  </lay-carousel>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active1 = ref("1")

    return {
      active1
    }
  }
}
</script>

:::

::: title 不同方向与不同切换动画
:::

::: demo 通过 `anim` 属性来控制切换的放向与动画，支持 `default`左右切换(默认)、`updown`上线切换、`fade`渐隐渐显切换

<template>
  <div style="display:flex;justify-content: space-around;flex-wrap:wrap">
  <lay-carousel v-model="activeAnmi1" anim="updown" style="display:inline-block;width:32%" :autoplay="true">
    <lay-carousel-item id="1">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#009688;">条目一</div>
    </lay-carousel-item>
    <lay-carousel-item id="2">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#5FB878;">条目二</div>
    </lay-carousel-item>
    <lay-carousel-item id="3">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#FFB800;">条目三</div>
    </lay-carousel-item>
    <lay-carousel-item id="4">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#FF5722;">条目四</div>
    </lay-carousel-item>
  </lay-carousel>
  <lay-carousel v-model="activeAnmi2" style="width:32%">
    <lay-carousel-item id="1">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#009688;">条目一</div>
    </lay-carousel-item>
    <lay-carousel-item id="2">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#5FB878;">条目二</div>
    </lay-carousel-item>
    <lay-carousel-item id="3">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#FFB800;">条目三</div>
    </lay-carousel-item>
    <lay-carousel-item id="4">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#FF5722;">条目四</div>
    </lay-carousel-item>
  </lay-carousel>
  <lay-carousel v-model="activeAnmi3" anim="fade" style="width:32%;">
    <lay-carousel-item id="1">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#009688;">条目一</div>
    </lay-carousel-item>
    <lay-carousel-item id="2">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#5FB878;">条目二</div>
    </lay-carousel-item>
    <lay-carousel-item id="3">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#FFB800;">条目三</div>
    </lay-carousel-item>
    <lay-carousel-item id="4">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#FF5722;">条目四</div>
    </lay-carousel-item>
  </lay-carousel>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const activeAnmi1 = ref("1")
    const activeAnmi2 = ref("1")
    const activeAnmi3 = ref("1")
    return {
      activeAnmi1,activeAnmi2,activeAnmi3,activeAnmi4
    }
  }
}
</script>

:::

::: title 控制器位置
:::

::: demo

<template>
  <lay-carousel v-model="active3" indicator="outside">
    <lay-carousel-item id="1">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#009688;">条目一</div>
    </lay-carousel-item>
    <lay-carousel-item id="2">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#5FB878;">条目二</div>
    </lay-carousel-item>
    <lay-carousel-item id="3">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#FFB800;">条目三</div>
    </lay-carousel-item>
    <lay-carousel-item id="4">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#FF5722;">条目四</div>
    </lay-carousel-item>
  </lay-carousel>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active3 = ref("1")

    return {
      active3
    }
  }
}
</script>

:::

::: title 动态遍历
:::

::: demo

<template>
  <lay-carousel v-model="active4">
    <lay-carousel-item :id="item.id" v-for="item in arrays">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">{{ item.text }}</div>
    </lay-carousel-item>
  </lay-carousel>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active4 = ref("1")

    const arrays = ref([])

    setTimeout(() => {
      arrays.value = [
      {id: "1", text: "1️⃣"},
      {id: "2", text: "2️⃣"},
      {id: "3", text: "3️⃣"},
      {id: "4", text: "4️⃣"}
    ]
    },1000)

    return {
      active4,
      arrays
    }
  }
}
</script>

:::

::: title Carousel 属性
:::

::: table

| 属性      | 描述         | 类型          |类型             |可选值                    |
| --------- | ------------ |--------------| --------------- | -------------------------|
| v-model   | 当前激活项   | `number`      | --             | --                      |
| anim      | 切换方向     | `string`      | `default`      | `default` `updown` `fade`      |
| indicator | 控制器位置   | `string`      | `inside`       |`inside` `outside` `none` |
| arrow     | 切换按钮状态 | `string`      | `hover`        |`hover` `always` `none`   |
| autoplay  | 自动播放     | `boolean`     | `true`         | `true` `false`           |
| interval  | 轮播间隔     | `number`      | `3000`         |  --                  |
| pauseOnHover| 鼠标悬停时暂停切换| `boolean`| `true`        | `true` `false`|

:::

::: title Carousel 事件
:::

::: table

| 事件   | 描述     | 可选值 |
| ------ | -------- | ------ |
| change | 切换回调 | id     |

:::

::: contributor carousel
:::

::: previousNext carousel
:::