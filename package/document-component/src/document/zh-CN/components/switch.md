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

::: demo 通过 `change` 事件, 在操作后完成一些后续处理。

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

::: demo 通过 `disabled` 属性, 禁用开关操作。

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

::: demo 通过 `onswitch-text` 与 `unswitch-text` 属性, 设置不同状态的描述文字。 

<template>
  <lay-switch v-model="active4" onswitch-text="白天"  unswitch-text="夜间"></lay-switch>
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

::: demo 通过 `onswitch-icon` 与 `unswitch-icon` 属性, 设置不同状态的展示图标。 

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

::: demo 通过 onswitch-value 与 unswitch-value 属性, 设置不同状态的值。

<template>
  <lay-switch v-model="active6" onswitch-value="dark" unswitch-value="light"></lay-switch>
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

::: title 尺寸
:::

::: demo 通过 `size` 属性, 设置尺寸。

<template>
  <div style='display:flex;align-items: flex-end;'>
    <lay-switch v-model="active7" size='lg'></lay-switch>
    <lay-switch v-model="active7" size='md' style='margin-left:10px'></lay-switch>
    <lay-switch v-model="active7" size='sm' style='margin-left:10px'></lay-switch>
    <lay-switch v-model="active7" size='xs' style='margin-left:10px'></lay-switch>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active7 = ref(true)

    return {
        active7
    }
  }
}
</script>

:::

::: title 加载状态
:::

::: demo 通过 `loading` 与 `loading-icon` 属性, 开启加载状态与自定义加载图标。 

<template>
  <lay-switch v-model="active8" :loading="loading8"  :disabled="true"></lay-switch>
  <lay-switch v-model="loading8" style='margin-left:10px'></lay-switch>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active8 = ref(true)
    const loading8 = ref(true)

    return {
        active8,
        loading8
    }
  }
}
</script>

:::

::: title Switch 属性
:::

::: table

| 属性          | 描述           | 类型                         |默认值                    | 可选值                 | 版本                 |
| ------------- | -------------- |---------------------------  | -------------------------| ---------------------  |---------------------  |
| name          | 原生 name 属性 | `string`                     | --                       | --                     |--                     |
| v-model       | 是否启用       | `boolean` `string` `number`  | --                       | --                     |--                     |
| disabled      | 禁用           | `boolean`                    | `false`                 | `true` `false`         |--                     |
| onswitch-text | 启用描述       | `string`                     | `启动`                   | --                     |--                     |
| unswitch-text | 禁用描述       | `string`                     | `禁用`                   | --                     |--                     |
| onswitch-value | 启用值        | `boolean` `string` `number`  | `true`                   | --                     |--                     |
| unswitch-value | 禁用值        | `boolean` `string` `number`  | `false`                  | --                     |--                     |
| size           | 尺寸          | `string`                     | `md`                     | `lg` `md` `sm` `xs`     |--                     |
| loading        | 加载状态      |  `boolean`                   | `false`                  | `true` `false`         | `1.4.0`                |
| loading-icon   | 加载图标      |  `string`                    | `layui-icon-loading-one` | --                     | `1.4.0`                 |

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