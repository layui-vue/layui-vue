::: title 定制主题
:::

::: describe 全局化配置设置内部组件的主题、语言和组件卸载于其他位置的 DOM 的类名。
:::

```vue
<template>
    <lay-config-provider :themeVariable="themeVariable">
        <App />
    </lay-config-provider>
</template>

<script setup>
const themeVariable = { 
    "--global-primary-color":"red",
    "--global-checked-color":"red"
}
</script>
```
::: describe 以下是一些最常用的通用变量，所有样式变量可以在 这里 找到。
:::

```
--global-primary-color: #009688;

--global-checked-color: #5fb878;

--global-border-radius: 2px;
```