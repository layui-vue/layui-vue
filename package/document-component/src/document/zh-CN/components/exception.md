::: anchor
:::

::: title 基本介绍
:::

::: describe 通用的异常页面。
:::

::: title 401
:::

::: demo 使用 `lay-exception` 标签, 创建一个异常页面

<template>
  <lay-exception status="401" title="401" describe="身份认证失败">
      <template #extra>
        <lay-button>刷新</lay-button>
        <lay-button type="primary">返回</lay-button>
    </template>
  </lay-exception>
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

::: title 403
:::

::: demo 使用 `lay-exception` 标签, 创建一个异常页面

<template>
  <lay-exception status="403" title="403" describe="暂无相关权限">
      <template #extra>
        <lay-button>刷新</lay-button>
        <lay-button type="primary">返回</lay-button>
    </template>
  </lay-exception>
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

::: title 404
:::

::: demo 使用 `lay-exception` 标签, 创建一个异常页面

<template>
  <lay-exception status="404" title="404" describe="跳转页面失败">
    <template #extra>
        <lay-button>刷新</lay-button>
        <lay-button type="primary">返回</lay-button>
    </template>
  </lay-exception>
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


::: title 500
:::

::: demo 使用 `lay-exception` 标签, 创建一个异常页面

<template>
  <lay-exception status="500" title="500" describe="服务发生错误">
      <template #extra>
        <lay-button>刷新</lay-button>
        <lay-button type="primary">返回</lay-button>
    </template>
  </lay-exception>
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

::: title Exception 属性
:::

::: table

| 属性        | 描述     | 可选值 |
| ----------- | -------- | ------ |
| title | 标题 | --     |
| status | 状态 | `403` `404` `500` |
| describe | 描述信息 | -- |

:::

::: title Exception 插槽
:::

::: table

| 属性        | 描述     | 可选值 |
| ----------- | -------- | ------ |
| extra | 操作 | --     |

:::

::: contributor exception
:::

::: previousNext exception
:::