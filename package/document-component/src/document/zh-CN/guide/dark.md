::: title 基本介绍
:::

::: describe 默认情况下，使用 layui-vue 搭建的网站主题为日间模式。
:::

::: title 基本使用
:::

::: describe 若启用夜间模式, 将 <code>config-provider</code> 组件 <code>theme</code> 属性设置为 <code>dark</code> 值。
:::

```vue
<template>
    <lay-config-provider :theme="theme">
        <App />
    </lay-config-provider>
</template>

<script setup>
const theme = ref('dark')
</script>
```

::: title 选项配置
:::

::: describe 默认的夜间模式不满足要求时, 可通过 <code>config-provider</code> 组件 <code>dark-partial</code> 属性进行偏好设置。
:::

```vue
<template>
    <lay-config-provider :theme="theme" :dark-partial="darkPartial">
        <App />
    </lay-config-provider>
</template>

<script setup>
const theme = ref('dark')

const darkPartial = {
    brightness: 100,
    contrast: 90,
    grayscale: 0,
    darkSchemeBackgroundColor: "black";
    darkSchemeTextColor: "white";
}
</script>
```

::: title  Dark Partial 属性
:::

::: table

| 属性                       | 描述       | 类型       | 默认值    | 可选值                              |
| -------------------------- | --------- | ---------- | --------- | ---------------------------------- |
| brightness                 | 亮度       | `number`  | `100`     | `0 - 100`                          |
| contrast                   | 对比度     | `number`  | `100`     | `0 - 100`                          |
| grayscale                  | 灰度值     | `number`  | `0`       | `0 - 100`                          |
| darkSchemeBackgroundColor  | 背景颜色   | `string`  | --        | --                                 |
| darkSchemeTextColor        | 前景颜色   | `string`  | --        | --                                  |

:::