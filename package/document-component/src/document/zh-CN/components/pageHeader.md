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

::: title 设置标题
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

::: title 使用插槽
:::

::: demo 使用 默认插槽可以自定义右侧内容  同时content属性将失效

<template>
  <lay-page-header backText="back" @back="handleBack">
    <span>Do what ever you want...</span>&nbsp;
    <lay-icon type="layui-icon-face-smile" color="red"></lay-icon> &nbsp;
    <lay-icon type="layui-icon-face-smile" color="orange"></lay-icon> &nbsp;
    <lay-icon type="layui-icon-face-smile" color="green"></lay-icon> &nbsp;
    <lay-icon type="layui-icon-face-smile" color="cyan"></lay-icon> &nbsp;
    <lay-icon type="layui-icon-face-smile" color="blue"></lay-icon> &nbsp;
    <lay-icon type="layui-icon-face-smile" color="black"></lay-icon> &nbsp;
  </lay-page-header>
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
| content| 标题,当前默认插槽不为空时失效 | --             |
| backText| 返回文本 | 默认 "返回"            |
| backIcon| 返回图标 | 内置图标集            |
:::

::: title PageHeader 事件
:::

::: table

| 属性   | 描述 |
| ------ | ---- | 
| back| 点击返回回调 |

:::

::: title PageHeader 插槽
:::

::: table

| 属性   | 描述 |
| ------ | ---- | 
| default | 标题内容 |
| backIcon| 返回图标 |

:::


::: contributor pageHeader
:::  

::: previousNext pageHeader
:::
