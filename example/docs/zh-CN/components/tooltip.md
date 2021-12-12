::: title 基础使用
:::

::: demo

<template>
  <lay-tooltip content="假装这里有文字提示">
    <lay-button>tooltip</lay-button>
  </lay-tooltip>
</template>

<style>
</style>
:::

::: title 显示位置
:::

::: demo

<template>
  <div style="padding: 100px;max-width:400px;">
    <div style="text-align: center;">
      <lay-tooltip content="假装这里有文字提示">
        <lay-button>上边</lay-button>
      </lay-tooltip>
    </div>
    <div>
      <lay-tooltip content="假装这里有文字提示假装这里有文字提示假装这里有文字提示假装这里有文字提示假装这里有文字提示" position="left">
        <lay-button style="float:left;">左边</lay-button>
      </lay-tooltip>
      <lay-tooltip content="假装这里有文字提示假装这里有文字提示假装这里有文字提示假装这里有文字提示假装这里有文字提示" position="right">
        <lay-button style="float:right;">右边</lay-button>
      </lay-tooltip>
      <div style="clear: both;"></div>
    </div>
    <div style="text-align: center;">
      <lay-tooltip content="假装这里有文字提示假装这里有文字提示假装这里有文字提示假装这里有文字提示" position="bottom">
        <lay-button>下边</lay-button>
      </lay-tooltip>
    </div>
  </div>
</template>

<style>
</style>
:::

::: title 浅色主题
:::

::: demo

<template>
  <lay-tooltip content="假装这里有文字提示" :is-dark="false">
    <lay-button>tooltip</lay-button>
  </lay-tooltip>
</template>

<style>
</style>
:::

::: title tooltip属性
:::

::: table

| 属性        | 描述     | 可选值         |
| ----------- | -------- | -------------- |
| content     | 显示内容 | --             |
| position    | 显示位置 | `top`(默认值)、`bottom`、`left`、`right` |
| isDark      | 是否为黑色主题 | `true`(默认值)、`false`(浅色)   |

:::
