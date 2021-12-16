::: title 基础使用
:::

::: demo

<template>
  <lay-form @submit="submit" :model="model">
    <lay-form-item label="账户">
      <lay-input v-model="model.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码">
      <lay-input v-model="model.password"></lay-input>
    </lay-form-item>
    <lay-form-item>
      <lay-button naive-type="submit">提交</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {

    const model = reactive({
        username: "admin",
        password: "admin"
    })

    const submit = function(val) {
      alert(JSON.stringify(val))
    }

    return {
      model,
      submit
    }
  }
}
</script>

:::

::: title 表单事件
:::

::: table

| Name  | Description | Accepted Values |
| ----- | ----------- | --------------- |
| model | 表单绑定值  | --              |

:::

::: title 表单事件
:::

::: table

| Name   | Description | Accepted Values |
| ------ | ----------- | --------------- |
| submit | 提交事件    | --              |

:::

::: title 表单项属性
:::

::: table

| Name  | Description | Accepted Values |
| ----- | ----------- | --------------- |
| label | 标题名称    | --              |

:::

::: comment
:::