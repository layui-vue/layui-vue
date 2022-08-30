::: anchor
:::

::: title 基础使用
:::

::: demo

<template>
  <h1 style="padding:20px 15px; font-family: sans-serif" >
      <lay-count-up :startVal="0" :endVal="3600" :decimalPlaces="2"></lay-count-up>
  </h1>
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

::: title 自定义前缀&后缀
:::

::: demo

<template>
  <lay-button @click="handlerClick" type="primary" size="sm">更新</lay-button>
  <br/>
  <br/>
  <!-- 属性 -->
  <lay-card style="width:200px;height:120px;display:inline-block;">
    <h1 style="padding:20px 15px; font-family: sans-serif">
      <lay-count-up :end-val="countVal2" prefix="¥" suffix="↑"></lay-count-up>
    </h1>
  </lay-card>
  <!-- 插槽 -->
  <lay-card style="width:200px;height:120px;display:inline-block;">
    <h1 style="padding:20px 15px">
      <lay-count-up :end-val="18" :duration="2000">
        <template #prefix>
          <span style="font-size:75%">雷雨&nbsp</span>
        </template>
        <template #suffix>
          <span style="font-size:75%">
            <sub>℃</sub> ⛈
          </span>
        </template>
      </lay-count-up>
    </h1>
  </lay-card>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const countVal2 = ref(98626);
    const handlerClick = () => {
      countVal2.value += 1000;
    }
    return {
      handlerClick,
    }
  }
}
</script>

:::

::: title Count Up 属性
:::

::: table

| 属性          | 描述                                                         | 类型           | 默认值 | 可选值         |
| ------------- | ------------------------------------------------------------ | -------------- | ------ | -------------- |
| startVal      | 起始值                                                     | number         | `0`    | —             |
| endVal        | 显示的值                                                     | number         | `0`    | —             |
| decimal       | 小数点                                                    | string         | `.`    | —             |
| decimalPlaces | 小数位数                                                     | number         | `0`    | —             |
| useGrouping   | 是否使用千位分隔符                                               | boolean        | `true` | `true` `false` |
| separator     | 分隔符                                                       | string         | `,`    | —             |
| autoplay     | 是否自动播放                                                     | boolean        | `true` | `true` `false` |
| useEasing     | 是否使用动画                                                     | boolean        | `true` | `true` `false` |
| easingFn      | 动画类型                                                 | Array \| Function \| string         | `easeInOutCubic`    | —             |
| duration      | 动画持续时间,单位: ms                                                 | number         | `2000`    | —             |
| prefix        | 前缀                                                         | string         | —    | —             |
| suffix        | 后缀                                                         | string         | —     | —             |

:::

::: title Count Up 插槽
:::

::: table

| 名称    | 描述     | 参数 |
| -----   | -------- | ---- |
| prefix  | 前缀     | --   |
| suffix  | 后缀     | --   |

:::

::: title Count Up 动画类型
::: 

::: describe 可使用贝塞尔曲线定义动画
:::

```
easingFn: [0.75, 0, 0.25, 1]
```

::: describe 也可以使用自定义函数
:::

```
const easeOutElastic = (n) => {
  return n === 0
    ? 0
    : n === 1
      ? 1
      : (2 ** (-10 * n)) * Math.sin((n * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1
}

easingFn: easeOutElastic
```

::: describe 通过以下字符串快速设置动画类型
:::

```
easeInSine    easeOutSine    easeInOutSine
easeInQuad    easeOutQuad    easeInOutQuad
easeInCubic   easeOutCubic   easeInOutCubic
easeInQuart   easeOutQuart   easeInOutQuart
easeInQuint   easeOutQuint   easeInOutQuint
easeInExpo    easeOutExpo    easeInOutExpo
easeInCirc    easeOutCirc    easeInOutCirc
easeInBack    easeOutBack    easeInOutBack
linear
```
::: contributor countUp
:::

::: previousNext countUp
:::