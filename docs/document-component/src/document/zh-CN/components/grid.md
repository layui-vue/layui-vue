::: anchor
:::

::: title 基本介绍
:::

::: describe 栅格化系统，是基于行（row）和列（col）来定义区块的外部框架，以保证页面的元素能够稳健地排布起来。
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-row space="10">
     <lay-col md="0"><div class="grid-demo">1</div></lay-col>
     <lay-col md="12"><div class="grid-demo">2</div></lay-col>
     <lay-col md="6"><div class="grid-demo">3</div></lay-col>
     <lay-col md="6"><div class="grid-demo">4</div></lay-col>
     <lay-col md="6"><div class="grid-demo">5</div></lay-col>
     <lay-col md="6"><div class="grid-demo">6</div></lay-col>
  </lay-row>
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

<style>
.grid-demo {
    line-height: 50px;
    border-radius: 2px;
    text-align: center;
    background-color: var(--global-checked-color);
    color: #fff;
}
</style>

:::

::: title 栅格偏移
:::

::: demo

<template>
  <lay-row space="10">
     <lay-col md="12"><div class="grid-demo">1</div></lay-col>
     <lay-col md="6" mdOffset="6" mdPull="6"><div class="grid-demo">2</div></lay-col>
  </lay-row>
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

<style>
.grid-demo {
    line-height: 50px;
    border-radius: 2px;
    text-align: center;
    background-color: var(--global-checked-color);
    color: #fff;
}
</style>

:::

::: title 栅格适应
:::

::: demo

<template>
  <lay-row space="10">
     <lay-col md="12" sm="12" xs="24"><div class="grid-demo">1</div></lay-col>
     <lay-col md="12" sm="12" xs="24"><div class="grid-demo">2</div></lay-col>
  </lay-row>
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
<style>
.grid-demo {
    line-height: 50px;
    border-radius: 2px;
    text-align: center;
    background-color: var(--global-checked-color);
    color: #fff;
}
</style>

:::

::: title 流式布局
:::

::: demo

<template>
  <lay-container fluid>
    <lay-row space="10">
      <lay-col md="4" sm="12" xs="24"><div class="grid-demo">1</div></lay-col>
      <lay-col md="4" sm="12" xs="24"><div class="grid-demo">2</div></lay-col>
      <lay-col md="4" sm="12" xs="24"><div class="grid-demo">3</div></lay-col>
      <lay-col md="4" sm="12" xs="24"><div class="grid-demo">4</div></lay-col>
      <lay-col md="4" sm="12" xs="24"><div class="grid-demo">5</div></lay-col>
      <lay-col md="4" sm="12" xs="24"><div class="grid-demo">6</div></lay-col>
    </lay-row>
  </lay-container>
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
<style>
.grid-demo {
    line-height: 50px;
    border-radius: 2px;
    text-align: center;
    background-color: var(--global-checked-color);
    color: #fff;
}
</style>

:::

::: title Row 属性
:::

::: table

| 名称  | 描述           | 类型              | 默认值 | 可选值  |
| ----- | ------------- | ----------------- | ------ | ------ |
| space | 间隔,  0 - 30 | `number` `string` | --     | -      |

:::

::: title Col 属性
:::

::: table

| 名称      | 描述                            | 类型              | 默认值  | 可选值 |
| --------- | ------------------------------ | ----------------- | ------ | ------ |
| xs        | 尺寸 - 超小屏幕 (手机< 768px)   | `number` `string` | --     | 0 - 24 |
| sm        | 尺寸 - 小屏幕 (平板 ≥768px)     | `number` `string` | --     | 0 - 24 |
| md        | 尺寸 - 中等屏幕 (桌面 ≥992px)   | `number` `string` | --     | 0 - 24 |
| lg        | 尺寸 - 大型屏幕 (桌面 ≥1200px)  | `number` `string` | --     | 0 - 24 |
| xs-offset | 偏移 - 超小屏幕 (手机< 768px)   | `number` `string` | --     | 0 - 24 |
| sm-offset | 偏移 - 小屏幕 (平板 ≥768px)     | `number` `string` | --     | 0 - 24 |
| md-offset | 偏移 - 中等屏幕 (桌面 ≥992px)   | `number` `string` | --     | 0 - 24 |
| lg-offset | 偏移 - 大型屏幕 (桌面 ≥1200px)  | `number` `string` | --     | 0 - 24 |
| xs-pull | 拉 - 超小屏幕 (手机< 768px)   | `number` `string` | --     | 0 - 24 |
| sm-pull | 拉 - 小屏幕 (平板 ≥768px)     | `number` `string` | --     | 0 - 24 |
| md-pull | 拉 - 中等屏幕 (桌面 ≥992px)   | `number` `string` | --     | 0 - 24 |
| lg-pull | 拉 - 大型屏幕 (桌面 ≥1200px)  | `number` `string` | --     | 0 - 24 |
| xs-push | 推 - 超小屏幕 (手机< 768px)   | `number` `string` | --     | 0 - 24 |
| sm-push | 推 - 小屏幕 (平板 ≥768px)     | `number` `string` | --     | 0 - 24 |
| md-push | 推 - 中等屏幕 (桌面 ≥992px)   | `number` `string` | --     | 0 - 24 |
| lg-push | 推 - 大型屏幕 (桌面 ≥1200px)  | `number` `string` | --     | 0 - 24 |

:::

::: previousNext grid
:::