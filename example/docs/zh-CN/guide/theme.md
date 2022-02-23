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

--global-normal-color: #1e9fff;

--global-warm-color: #ffb800;

--global-danger-color: #ff5722;

--global-checked-color: #5fb878;

--global-border-radius: 2px;

--global-neutral-color-1: #FAFAFA;

--global-neutral-color-2: #F6F6F6;
  
--global-neutral-color-3: #eeeeee;
  
--global-neutral-color-4: #e2e2e2;
  
--global-neutral-color-5: #dddddd;
  
--global-neutral-color-6: #d2d2d2;
  
--global-neutral-color-7: #cccccc;
  
--global-neutral-color-8: #c2c2c2;

```