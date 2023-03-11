::: anchor
:::

::: title 基本介绍
:::

::: describe 输入框自动完成功能。
:::

::: title 基础使用
:::

::: demo 使用 `lay-autocomplete` 标签, 创建自动完成输入框。

<template>
  <lay-autocomplete v-model="value" :fetchSuggestions="fetchSuggestions"></lay-autocomplete>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {

    const value = ref("");
    const fetchSuggestions = function(value) {
      if(value === "") {
        return new Promise((resolve) => resolve([]))
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              "稻香 - 周杰伦",
              "轨迹 - 周杰伦"
            ])
          }, 1000)
        });
      }
    }

    return {
      value,
      fetchSuggestions
    }
  }
}
</script>

:::

::: title Input 属性
:::

::: table

| 属性                 | 描述                 | 类型              | 默认值  | 可选值         | 版本 |
| -------------------- | -------------------- | ----------------- | ------- | -------------- | ---- |
| name                 | 原始属性 name        | `string`          | --      | --             | --   |
| placeholder          | 提示信息             | `string`          | --      | --             | --   |
| disabled             | 禁用                 | `boolean`         | `false` | `true` `false` | --   |
| v-model / modelValue | 值                   | `string` `number` | --      | --             | --   |
| allow-clear          | 允许清空 allow-clear | `boolean`         | `false` | `true` `false` | --   |

:::

::: title Input 事件
:::

::: table

| 名称 | 描述 | 参数 |
| ---- | ---- | ---- |
| 预留 | 预留 | 预留 |

:::

::: title Input 插槽
:::

::: table

| 名称 | 描述 | 参数 |
| ---- | ---- | ---- |
| 预留 | 预留 | --   |

:::

::: contributor input
:::

::: previousNext input
:::
