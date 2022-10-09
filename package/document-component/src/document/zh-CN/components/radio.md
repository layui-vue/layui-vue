::: anchor
:::

::: title 基本介绍
:::

::: describe 用于在多个备选项中选中单个状态。
:::

::: title 基础使用
:::

::: demo 使用 `lay-radio` 标签, 创建一个单选框。

<template>
    <lay-radio v-model="selected1" name="action" :value="1" label="写作"></lay-radio>
    <lay-radio v-model="selected1" name="action" :value="2" label="画画"></lay-radio>
    <lay-radio v-model="selected1" name="action" :value="3" label="运动"></lay-radio>
    <lay-radio v-model="selected1" name="action" :value="4">自定义slot</lay-radio>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selected1 = ref(1);

    return {
        selected1
    }
  }
}
</script>

:::

::: title 禁用状态
:::

::: demo 使用 `disabled` 属性, 禁用一个单选项。

<template>
    <lay-radio v-model="selected2" name="action" value="1">写作</lay-radio>
    <lay-radio v-model="selected2" name="action" value="2">画画</lay-radio>
    <lay-radio v-model="selected2" name="action" value="3">运动</lay-radio>
    <lay-radio v-model="selected2" name="action" value="4" :disabled="disabled">禁用</lay-radio>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const disabled = ref(true);
    const selected2 = ref("1");

    return {
        disabled,
        selected2
    }
  }
}
</script>

:::

::: title 事件回调
:::

::: demo 通过 `@change` 事件, 监听选项改变。

<template>
    <lay-radio v-model="selected3" name="action" value="1" @change="change">写作</lay-radio>
    <lay-radio v-model="selected3" name="action" value="2" @change="change">画画</lay-radio>
    <lay-radio v-model="selected3" name="action" value="3" @change="change">运动</lay-radio>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selected3 = ref("1");
    const change = function( current ) {
        console.log("当前值:" + current)
    }
    return {
        selected3,
        change
    }
  }
}
</script>

:::

::: title 指定尺寸
:::

::: demo 使用 `size` 属性设置单选框尺寸, 可选值为 `lg` `md` `sm` `xs`, 默认为 `md`。

<template>
    <lay-radio v-model="selected5" name="action" size="lg" value="1">写作</lay-radio>
    <lay-radio v-model="selected5" name="action" size="md" value="2">画画</lay-radio>
    <lay-radio v-model="selected5" name="action" size="sm" value="3">运动</lay-radio>
    <lay-radio v-model="selected5" name="action" size="xs" value="4">游泳</lay-radio>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selected5 = ref("1");

    return {
        selected5,
    }
  }
}
</script>

:::

::: title 单选分组
:::

::: demo 使用 `lay-radio-group` 标签, 存在大量单选框时极为有效。

<template>
    <lay-radio-group name="action" v-model="selected4" @change="change4">
      <lay-radio value="1">写作</lay-radio>
      <lay-radio value="2">画画</lay-radio>
      <lay-radio value="3">运动</lay-radio>
    </lay-radio-group>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selected4 = ref("1");
    const change4 = function( current ) {
        console.log("当前值:" + current)
    }
    const disabled1=ref(false)
    return {
        selected4,
        change4
    }
  }
}
</script>

:::

::: title Radio 属性
:::

::: table

| 属性    | 描述          | 默认值 |
| ------- | ------------- | ------ |
| name    | 原始属性 name | --     |
| label   | 显示值        | --     |
| value   | 绑定值        | --     |
| v-model | 选中值        | --     |
| disabled   | 是否禁用    | `false`     |
| size | 尺寸       | `lg` `md` `sm` `xs`         |
:::

::: title Radio 事件
:::

::: table

| 事件   | 描述     | 参数             |
| ------ | -------- | ---------------- |
| change | 切换事件 | current : 当前值 |

:::

::: title RadioGroup 属性
:::

::: table

| 属性    | 描述          | 默认值 |
| ------- | ------------- | ------ |
| v-model | 选中值        | --     |
| disabled   | 是否整体禁用    | `false`     |

:::

::: title RadioGroup 事件
:::

::: table

| 事件   | 描述     | 参数             |
| ------ | -------- | ---------------- |
| change | 切换事件 | current : 当前值 |

:::

::: contributor radio
:::  

::: previousNext radio
:::