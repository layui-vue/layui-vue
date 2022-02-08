::: anchor
:::

::: title 基本介绍
:::

::: describe 更灵活的布局方案。
:::

::: title 基础使用
:::

::: demo

<template>
<div>
    <lay-split-panel style="height: 300px">
        <lay-split-panel-item>A</lay-split-panel-item>
        <lay-split-panel-item>B</lay-split-panel-item>
        <lay-split-panel-item>C</lay-split-panel-item>
    </lay-split-panel>
</div>
</template>

<script>
</script>

:::

::: title 自定义比例
:::


::: demo

<template>
<div>
    <lay-split-panel style="height: 300px">
        <lay-split-panel-item :space="30">1</lay-split-panel-item>
        <lay-split-panel-item :space="20">2</lay-split-panel-item>
        <lay-split-panel-item :space="50">3</lay-split-panel-item>
    </lay-split-panel>
</div>
</template>

<script>
</script>

:::

::: title 垂直布局
:::


::: demo

<template>
<div>
    <lay-split-panel :vertical="true" style="height: 600px; width: 100%">
        <lay-split-panel-item>1</lay-split-panel-item>
        <lay-split-panel-item>2</lay-split-panel-item>
        <lay-split-panel-item>3</lay-split-panel-item>
    </lay-split-panel>
</div>
</template>

<script>
</script>

:::

::: title 组合用法
:::


::: demo

<template>
<div>
    <lay-split-panel style="height: 600px;">
        <lay-split-panel-item :space="60">
            <lay-split-panel :vertical="true" style="height: 600px; width: 100%">
                <lay-split-panel-item :space="40">1</lay-split-panel-item>
                <lay-split-panel-item :space="40">2</lay-split-panel-item>
            </lay-split-panel>
        </lay-split-panel-item>
        <lay-split-panel-item :space="40">2</lay-split-panel-item>
    </lay-split-panel>
</div>
</template>

<script>
</script>

:::

::: title splitPanel属性
:::

::: table

| 属性  | 描述 | 类型 |可选值 | 默认值|
| ----- | ---- | ------ | ---| ---|
| vertical | 是否垂直布局 | Boolean |`true` `false`| false |
| minSize | 块拉动最小范围(按像素 `px`) | number | - | 50  |
:::

::: title splitPanelItem属性
:::

::: table

| 属性  | 描述 | 类型 |可选值 | 默认值|
| ----- | ---- | ------ | ---| ---|
| space | 默认每个站多大比例（`%`）, 设置一个，<br/> 其他的都需要设置，合计为（`100` ） | number | - | 按照个数平分 |
:::


::: comment
:::

::: previousNext splitPanel
:::