::: anchor
:::

::: title 基本介绍
:::

::: describe 开关选择器, 需要表示开关状态/两种状态之间的切换时。
:::

::: title 基础使用
:::

::: demo 使用 `lay-switch` 标签, 创建开关

<template>
  <lay-switch v-model="active1"></lay-switch>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active1 = ref(false);

    return {
        active1
    }
  }
}
</script>

:::

::: title 事件回调
:::

::: demo

<template>
  <lay-switch v-model="active2" @change="change"></lay-switch>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active2 = ref(true);

    const change = function( val ) {
        console.log("当前值:" + val)
    }

    return {
        active2,
        change
    }
  }
}
</script>

:::

::: title 禁用状态
:::

::: demo

<template>
  <lay-switch v-model="active3" :disabled="disabled"></lay-switch>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active3 = ref(true);
    const disabled = ref(true)

    return {
        active3
    }
  }
}
</script>

:::

::: title 修改描述
:::

::: demo

<template>
  <lay-switch v-model="active4" active-text="白天"  inactive-text="夜间"></lay-switch>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active4 = ref(true)

    return {
        active4
    }
  }
}
</script>

:::

::: title 图标插槽
:::

::: demo

<template>
  <lay-switch v-model="active5">
    <template #onswitch-icon>😄</template>
    <template #unswitch-icon>🤔</template>
  </lay-switch>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active5 = ref(true)

    return {
        active5
    }
  }
}
</script>

:::

::: title 自定义值
:::

::: demo

<template>
  <lay-switch v-model="active6" onswitch-value="dark"  unswitch-value="light"></lay-switch>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active6 = ref('dark')

    return {
        active6
    }
  }
}
</script>

:::

::: title Switch 属性
:::

::: table

| 属性          | 描述           | 可选值         |
| ------------- | -------------- | -------------- |
| name          | 原生 name 属性 | --             |
| v-model       | 是否启用       | `true` `false` |
| disabled      | 禁用           | `true` `false` |
| onswitch-text | 启用描述       | `启动`        |
| unswitch-text | 禁用描述       | `禁用`         |
| onswitch-value | 启用值       | `true`        |
| unswitch-value | 禁用值       | `false`         |

:::

::: title Switch 事件
:::

::: table

| 属性   | 描述     | 参数           |
| ------ | -------- | ---------------- |
| change | 切换事件 | val : 当前值 |

:::

::: title Switch 插槽
:::

::: table

| 属性   | 描述     | 参数           |
| ------ | -------- | ---------------- |
| onswitch-icon | 启用图标 | -- |
| unswitch-icon | 禁用图标 | -- |
:::

::: contributor switch
::: 

::: previousNext switch
:::