::: title 基本介绍
:::

::: describe 目前的默认文案是简体中文，如果需要使用其他语言，可以参考下面的方案。
:::

::: title 基本使用
:::

::: describe 通过 <code>config-provider</code> 组件 <code>locale</code> 属性设置启用的语言。
:::

```vue
<template>
    <lay-config-provider locale="zh_CN">
        <App />
    </lay-config-provider>
</template>
```

::: title 高级使用
:::

::: describe 在 layui-vue 内部维护了一个 <code>vue-i18n</code> 实例, 你可以通过 <code>useI18n</code> 方法来获取。
:::

::: describe 通过 locales 属性扩展语言包, 自定义语言优先级大于组件库内部维护的语言。
:::

```vue
<template>
    <lay-config-provider locale="zh_CN" :locales="locales">
        {{ t('hello') }}
    </lay-config-provider>
</template>

<script setup>
import { useI18n } from "@layui/layui-vue";
import zh_CN from "./custom/zh_CN";
import en_US from "./custom/en_US";

const { t } = useI18n();

const locales = [
    { name: "zh_CN", locale: zh_CN, merge: true },
    { name: "en_US", locale: en_US, merge: true },
]
</script>
```
::: title 语言列表
:::

::: table

| 语言        | 内容                |
|-------------|-------------------------|
| zh_CN  | https://gitee.com/layui-vue/layui-vue/blob/master/packages/component/language/locales/zh_CN.ts |
| en_US  | https://gitee.com/layui-vue/layui-vue/blob/master/packages/component/language/locales/en_US.ts |

:::