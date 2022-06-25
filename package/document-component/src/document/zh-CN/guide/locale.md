::: title 国际化
:::

::: describe 目前的默认文案是简体中文，如果需要使用其他语言，可以参考下面的方案。
:::

```vue
<template>
    <lay-config-provider locale="zh_CN">
        <App />
    </lay-config-provider>
</template>
```
::: describe layui-vue 内部会维护一个 vue-i18n 实例, 你无需再去创建，直接使用 useI18n() 获取即可
:::

::: describe 你可以使用 locales 属性来扩展语言包, 用户自定义语言包优先级大于组件库内部维护的语言包, 即你可以扩展亦可以覆盖。
:::


```vue
<template>
    <lay-config-provider locale="zh_CN" :locales="locales">
        <App />
    </lay-config-provider>
</template>

<script setup>
const locales = [
    'zh_CN': {
        message: '你好, layui-vue'
    },
    'en_US': {
        message: 'hello, layui-vue'
    }
];
</script>
```