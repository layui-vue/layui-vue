::: anchor
:::

::: title 基础使用
:::

::: demo

<template>
  <h1 style="padding:20px 15px">
      <lay-count-up :end-val="countVal" :decimalPlaces="2"></lay-count-up>
  </h1>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const countVal = 2862.9888;
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
    <h1 style="padding:20px 15px">
      <lay-count-up :end-val="countVal2" prefix="¥" suffix="↑"></lay-count-up>
    </h1>
  </lay-card>
  <!-- 插槽 -->
  <lay-card style="width:200px;height:120px;display:inline-block;">
    <h1 style="padding:20px 15px">
      <lay-count-up :end-val="18" :duration="1">
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
| endVal        | 显示的值                                                     | number         | `0`    | —             |
| decimalPlaces | 小数位数                                                     | number         | `0`    | —             |
| useGrouping   | 使用千位分隔符                                               | boolean        | `true` | `true` `false` |
| separator     | 分隔符                                                       | string         | `,`    | —             |
| useEasing     | 使用动画                                                     | boolean        | `true` | `true` `false` |
| duration      | 动画持续时间                                                 | number         | `2`    | —             |
| prefix        | 前缀                                                         | string         | —    | —             |
| suffix        | 后缀                                                         | string         | —     | —             |
| option        | 选项，用于多实例的总体设置，<br>props会覆盖option的属性，使用更灵活 | CountUpOptions | —     | 参见[CountUpOptions](#opts)   |

:::

::: title Count Up 插槽
:::

::: table

| 名称    | 描述     | 参数 |
| -----   | -------- | ---- |
| prefix  | 前缀     | --   |
| suffix  | 后缀     | --   |

:::

::: title Count Up Options 属性
::: 

::: table

| 属性          | 描述                                                         | 类型           | 默认值 | 可选值         |
| ------------- | ------------------------------------------------------------ | -------------- | ------ | -------------- |
| startVal      | 开始值                                                      | number         | `0`    | —             |
| decimalPlaces | 小数位数                                                     | number         | `0`    | —             |
| useGrouping   | 使用千位分隔符                                               | boolean        | `true` | `true` `false` |
| separator     | 分隔符                                                       | string         | `,`    | —             |
| useEasing     | 使用动画                                                     | boolean        | `true` | `true` `false` |
| duration      | 动画持续时间                                                 | number         | `2`    | —             |
| prefix        | 前缀                                                         | string         | —    | —             |
| suffix        | 后缀                                                         | string         | —     | —             |   |

:::