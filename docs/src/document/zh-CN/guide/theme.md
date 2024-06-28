::: title 基本介绍
:::

::: describe 为满足业务和品牌上多样化的视觉需求，我们提供了包括但不限于主色、圆角、边框和部分组件的视觉定制。
:::

::: describe 下面将针对不同的场景提供一些常用的定制方式, 首先是使用 <a style="color:#009688;" href="https://developer.mozilla.org/en-US/docs/Web/API/CSSVariableReferenceValue/variable"> Css3 variable </a> 覆盖变量的方式。
:::

::: title 基本使用
:::

::: describe 创建 variable.css 样式文件, 覆盖 layui-vue 的 Css3 变量。
:::

```css
--global-primary-color: #009688; // 主色

--global-checked-color: #5fb878; // 次色
```

::: title 高级使用
:::

::: describe 通过 <code>config-provider</code> 标签, 配合 <code>reactive</code> 变量, 实现动态主题。
:::

```vue
<template>
    <lay-button @click="changeThemeVariable">Update Theme</lay-button>
    <lay-config-provider :themeVariable="themeVariable">
        <App />
    </lay-config-provider>
</template>

<script setup>
import { reactive } from "vue";

const themeVariable = reactive({ 
    "--global-primary-color":"red",
    "--global-checked-color":"red"
})

const changeThemeVariable = () => {
    themeVariable['--global-primary-color'] = "green";
    themeVariable['--global-checked-color'] = "green";
}
</script>
```

::: title Css Variable
:::

::: describe 以下是一些最常用的通用变量，所有 Css3 变量可以在 <a target="_blank" style="color:#009688;" href="https://gitee.com/layui/layui-vue/blob/master/packages/component/theme/variable.less">这里</a> 找到。
:::

```css
--global-primary-color: #009688; // 主色

--global-checked-color: #5fb878; // 次色

--global-border-radius: 2px; // 圆角度

--global-normal-color: #1e9fff; // 通用色

--global-warm-color: #ffb800; // 警告色

--global-danger-color: #ff5722; // 危险色
```
