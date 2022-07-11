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

<style>
	.lay-split-panel-item{
		display: flex;
		font-size: 16px;
		font-weight: bold;
		justify-content: center;
		align-items: center;
	}
</style>

:::

::: title 自定义比例
:::


::: demo

<template>
<div>
    <lay-split-panel style="height: 300px">
        <lay-split-panel-item :space="200">1</lay-split-panel-item>
        <lay-split-panel-item>2</lay-split-panel-item>
        <lay-split-panel-item :space="200">3</lay-split-panel-item>
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
        <lay-split-panel-item :space="300">
            <lay-split-panel :vertical="true" style="height: 600px; width: 100%">
                <lay-split-panel-item :space="200">1</lay-split-panel-item>
                <lay-split-panel-item>2</lay-split-panel-item>
            </lay-split-panel>
        </lay-split-panel-item>
        <lay-split-panel-item>2</lay-split-panel-item>
        <lay-split-panel-item>2</lay-split-panel-item>
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
| space | 默认每个占 `px` , 其他的自动平分 | number | - | 按照个数平分 |
:::

::: contributor splitPanel
::: 

::: previousNext splitPanel
:::