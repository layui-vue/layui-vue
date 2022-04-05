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