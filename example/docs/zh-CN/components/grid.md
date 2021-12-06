::: title 基础使用
:::

::: demo

<template>
  <lay-row space="10">
     <lay-col md="12"><div class="grid-demo">1</div></lay-col>
     <lay-col md="12"><div class="grid-demo grid-demo-bg1">2</div></lay-col>
     <lay-col md="6"><div class="grid-demo">3</div></lay-col>
     <lay-col md="6"><div class="grid-demo grid-demo-bg1">4</div></lay-col>
     <lay-col md="6"><div class="grid-demo">5</div></lay-col>
     <lay-col md="6"><div class="grid-demo grid-demo-bg1">6</div></lay-col>
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
.grid-demo-bg1 {
    background-color: #63BA79;
}
.grid-demo {
    padding: 10px;
    line-height: 50px;
    border-radius: 2px;
    text-align: center;
    background-color: #79C48C;
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
     <lay-col md="6" mdOffset="6"><div class="grid-demo grid-demo-bg1">2</div></lay-col>
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
.grid-demo-bg1 {
    background-color: #63BA79;
}
.grid-demo {
    padding: 10px;
    line-height: 50px;
    border-radius: 2px;
    text-align: center;
    background-color: #79C48C;
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
     <lay-col md="12" sm="12" xs="24"><div class="grid-demo grid-demo-bg1">2</div></lay-col>
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

:::

::: title 流式布局
:::

::: demo

<template>
  <lay-container fluid>
    <lay-row space="10">
      <lay-col md="4" sm="12" xs="24"><div class="grid-demo">1</div></lay-col>
      <lay-col md="4" sm="12" xs="24"><div class="grid-demo grid-demo-bg1">2</div></lay-col>
      <lay-col md="4" sm="12" xs="24"><div class="grid-demo">3</div></lay-col>
      <lay-col md="4" sm="12" xs="24"><div class="grid-demo grid-demo-bg1">4</div></lay-col>
      <lay-col md="4" sm="12" xs="24"><div class="grid-demo">5</div></lay-col>
      <lay-col md="4" sm="12" xs="24"><div class="grid-demo grid-demo-bg1">6</div></lay-col>
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

:::

::: title 行属性
:::

::: table

| 属性  | 描述 | 可选值 |
| ----- | ---- | ------ |
| space | 间隔 | 0 - 30 |

:::

::: title 列属性
:::

::: table

| 属性      | 描述                           | 可选值 |
| --------- | ------------------------------ | ------ |
| xs        | 尺寸 - 超小屏幕 (手机<768px)   | 0 - 24 |
| sm        | 尺寸 - 小屏幕 (平板 ≥768px)    | 0 - 24 |
| md        | 尺寸 - 中等屏幕 (桌面 ≥992px)  | 0 - 24 |
| lg        | 尺寸 - 大型屏幕 (桌面 ≥1200px) | 0 - 24 |
| xs-offset | 偏移 - 超小屏幕 (手机<768px)   | 0 - 24 |
| sm-offset | 偏移 - 小屏幕 (平板 ≥768px)    | 0 - 24 |
| md-offset | 偏移 - 中等屏幕 (桌面 ≥992px)  | 0 - 24 |
| lg-offset | 偏移 - 大型屏幕 (桌面 ≥1200px) | 0 - 24 |

:::
