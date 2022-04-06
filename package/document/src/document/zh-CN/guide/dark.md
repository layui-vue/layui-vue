::: title 夜间模式
:::

::: describe 默认情况下, 网站主题为日间模式。
:::

::: describe 若启用夜间模式, 使用 "全局配置" 组件配合 theme 属性, 设置为 `dark` 值。
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

::: title 偏好设置
:::

::: describe 当内置的夜间样式不满足要求时, 我们提供 dark-partial 配置偏好。
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
::: describe brightness: 亮度
:::
::: describe contrast: 对比度
:::
::: describe grayscale: 灰度值
:::
::: describe darkSchemeBackgroundColor: 背景颜色
:::
::: describe darkSchemeTextColor: 文字颜色
:::