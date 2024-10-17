::: anchor
:::

::: title 基础使用
:::

::: demo 使用 `lay-color-picker` 标签, 创建颜色选择器。

<template>
  <lay-color-picker v-model="color"></lay-color-picker>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const color = ref("#009688");

    return {
      color
    }
  }
}
</script>

:::

::: title 禁止选择
:::

::: demo 使用 `lay-color-picker` 标签, 创建颜色选择器。

<template>
  <lay-color-picker v-model="color" :disabled="true"></lay-color-picker>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const color = ref("#009688");

    return {
      color
    }
  }
}
</script>

:::

::: title 预设颜色
:::

::: demo 通过 `preset` 属性, 预设可选的颜色列表。

<template>
  <lay-color-picker v-model="color1" :preset="preset1"></lay-color-picker>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const color1 = ref("#FFB800");

    const preset1 = ref(["#009688", "#1e9fff", "#ffb800", "#ff5722", "#5fb878"])

    return {
      color1,
      preset1
    }
  }
}
</script>

:::

::: title 取色器
:::

::: demo

<template>
  {{ color }} 
  <lay-color-picker v-model="color" :eyeDropper="true"></lay-color-picker>
  <lay-button @click="changeColor">更换颜色</lay-button>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const color = ref("#009688");

    const changeColor = () => {
      color.value = "#393D49"
    }

    return {
      color,
      changeColor
    }
  }
}
</script>

:::

::: title 开启清空确认
:::

::: demo `allowClear` 开启清空 `simple`(默认为true) 即时改变 `modelValue`。

<template>
  <lay-color-picker v-model="color5" allowClear :simple="false"></lay-color-picker>
</template>

<script setup lang="ts">
import { ref } from "vue";

const color5 = ref("");
</script>

:::

::: title Color Picker 属性
:::

::: table

|   属性         |    说明      |  类型   | 默认值  | 版本  | 
| ---------- | -------- | --- |--- |--- |
| v-model    | 选中色   | --  |--  |--  |
| preset | 预设颜色 | --  |--  |--  |
| size      | 尺寸大小  | `string`    | `lg` `md` `sm` `xs`   |`md`     |  |
| eye-dropper | 取色器 | `boolean`  | `false`  |--  |
| disabled | 禁用 | `boolean`  |`false` |  |
| allow-clear | 是否允许清空 | `boolean`  |`false`  |  |
| simple | 是否即时改变`modelValue` | `boolean`  |`true`  |  |
| content-style             | 内容自定义样式     | `StyleValue` | -- | -- |
| content-class             | 内容自定义Class    | `string` `Array<string \| object>` `object` | -- | -- |
| teleport-props        | 继承至 dropdown 组件，下拉面板 `传递` 属性         | `object`         | `{to: 'body', disabled: false}` | `2.19.0` |

:::

::: previousNext colorPicker
:::
