::: title 基础使用
:::

::: demo

<template>
  <lay-form>
    <lay-radio v-model="selected1" name="action" label="1">写作</lay-radio>
    <lay-radio v-model="selected1" name="action" label="2">画画</lay-radio>
    <lay-radio v-model="selected1" name="action" label="3">运动</lay-radio>
  </lay-form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selected1 = ref("1");

    return {
        selected1
    }
  }
}
</script>

:::

::: title 禁用状态
:::

::: demo

<template>
  <lay-form>
    <lay-radio v-model="selected2" name="action" label="1">写作</lay-radio>
    <lay-radio v-model="selected2" name="action" label="2">画画</lay-radio>
    <lay-radio v-model="selected2" name="action" label="3">运动</lay-radio>
    <lay-radio v-model="selected2" name="action" label="4" :disabled="disabled">禁用</lay-radio>
  </lay-form>
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

::: demo

<template>
  <lay-form>
    <lay-radio v-model="selected3" name="action" label="1" @change="change">写作</lay-radio>
    <lay-radio v-model="selected3" name="action" label="2" @change="change">画画</lay-radio>
    <lay-radio v-model="selected3" name="action" label="3" @change="change">运动</lay-radio>
  </lay-form>
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

::: title 单选框属性
:::

| 属性    | 描述          | 默认值 |
| ------- | ------------- | ------ |
| name    | 原始属性 name | --     |
| label   | 当前值        | --     |
| v-model | 选中值        | --     |

::: title 单选框事件
:::

| 事件   | 描述     | 参数             |
| ------ | -------- | ---------------- |
| change | 切换事件 | current : 当前值 |
