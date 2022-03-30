::: title 夜间模式
:::

::: describe 默认情况下, 网站主题为日间模式。若需启用深夜模式, 使用 config-provider 组件。
:::

```
<template>
    <lay-config-provider :theme="theme">
        <App />
    </lay-config-provider>
</template>

<script setup>
const theme = ref('dark')
</script>
```