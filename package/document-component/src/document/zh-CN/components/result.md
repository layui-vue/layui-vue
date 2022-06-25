::: anchor
:::

::: title 基本介绍
:::

::: describe 当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。
:::

::: title 成功
:::

::: demo 使用 `lay-result` 标签, 创建一个结果页面

<template>
  <lay-result></lay-result>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 失败
:::

::: demo 使用 `lay-result` 标签, 创建一个结果页面

<template>
  <lay-result status="failure"></lay-result>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 完整
:::

::: demo 使用 `lay-result` 标签, 创建一个结果页面

<template>
  <lay-result status="failure">
    <template #extra>
      <lay-button type="primary">再来一次</lay-button>
      <lay-button >返回首页</lay-button>
    </template>
  </lay-result>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title Result 属性
:::

::: table

| 属性        | 描述     | 可选值 |
| ----------- | -------- | ------ |
| title | 标题 | --     |
| status | 状态 | `success` `failure` |
| describe | 描述信息 | -- |

:::

::: title Result 插槽
:::

::: table

| 属性        | 描述     | 可选值 |
| ----------- | -------- | ------ |
| content | 内容 | --     |
| extra | 扩展 | --     |

:::

::: contributor result
:::  

::: previousNext result
:::