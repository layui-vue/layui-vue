::: anchor
:::

::: title 基本介绍
:::

::: describe 输入框自动完成功能。
:::

::: title 基础使用
:::

::: demo 使用 `lay-input` 标签, 创建输入框。

<template>
  <lay-auto-complete v-model="value" :options="options"></lay-auto-complete>
  <br/>
  <lay-auto-complete v-model="value1" :options="options"></lay-auto-complete>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {

    const value = ref(0);
    const value1 = ref(0);
    const options = reactive([
        "1111",
        "11112222",
        "111122223333"
    ]);

    return {
      value,
      value1,
      options
    }
  }
}
</script>

:::

::: title Input 属性
:::

::: table

| 属性                     | 描述                  | 类型         | 默认值         | 可选值         | 版本         |
| -----------------------  | -------------------- |-------------- |-------------- | -------------- |-------------- |
| name                     | 原始属性 name         | `string`             | --             | --             |--             |
| placeholder              | 提示信息              | `string`             | --             | --             |--             |
| disabled                 | 禁用                  | `boolean`           | `false`             | `true` `false` |--             |
| v-model / modelValue     | 值                    | `string` `number`   | --             |--             |--             |
| allow-clear              | 允许清空 allow-clear  | `boolean`             | `false`             | `true` `false` |--             |

:::

::: title Input 事件
:::

::: table

| 名称  | 描述                | 参数                        |
| ----- | ------------------- | -------------------------- |
| 预留  | 预留                 | 预留                       |

:::

::: title Input 插槽
:::

::: table

| 名称   | 描述                   | 参数            |
| -----  | --------------------- | ----------------|
| 预留   | 预留                   | --              |

:::

::: contributor input
:::  

::: previousNext input
:::