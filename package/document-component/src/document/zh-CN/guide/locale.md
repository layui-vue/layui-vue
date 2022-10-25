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

::: describe 在 layui-vue 内部维护了一个 i18n 实例, 你可以通过 useI18n() 方法来使用它。
:::

::: describe 你可以使用 locales 属性来扩展语言包, 自定义语言优先级大于组件库内部维护的语言, 即可扩展亦可覆盖。
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
::: table

| 语言        | 内容                |
|-------------|-------------------------|
| zh_CN  | https://gitee.com/layui/layui-vue/blob/master/package/component/src/language/locales/zh_CN.ts |
| en_US  | https://gitee.com/layui/layui-vue/blob/master/package/component/src/language/locales/en_US.ts |

:::