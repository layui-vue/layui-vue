::: anchor
:::

::: title 基本介绍
:::

::: describe 如果页面的路径比较简单，则使用页头组件要比面包屑更直观一点。
:::

::: title 基础使用
:::

::: demo 使用 `lay-page-header` 标签

<template>
  <lay-page-header content="详情页面" @back="handleBack"></lay-page-header>
</template>

<script setup>
const handleBack=()=>{
  alert('点击返回回调')
}
</script>

:::

::: demo 使用 `backText` 属性  自定义返回文本

<template>
  <lay-page-header content="详情页面" backText="back" @back="handleBack"></lay-page-header>
</template>

<script setup>
const handleBack=()=>{
  alert('点击返回回调')
}
</script>

:::


::: title PageHeader 属性
:::

::: table

| 属性   | 描述 | 可选值         |
| ------ | ---- | -------------- |
| content| 标题 | --             |
| backText| 返回文本 | 默认 "返回"            |

:::

::: title PageHeader 事件
:::

::: table

| 属性   | 描述 |
| ------ | ---- | 
| back| 点击返回回调 |

:::

::: previousNext pageHeader
:::
