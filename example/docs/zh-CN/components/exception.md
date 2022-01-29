::: anchor
:::

::: title 401
:::

::: demo 使用 `lay-exception` 标签, 创建一个异常页面

<template>
  <lay-exception status="401" title="401" describe="暂无相关权限">
      <template #action>
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
      <template #action>
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
    <template #action>
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
      <template #action>
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
