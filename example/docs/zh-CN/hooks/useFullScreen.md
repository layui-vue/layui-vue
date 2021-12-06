::: title 基础使用
:::

::: block 使 用 useMove 为 元 素 提 供 拖 拽 支 持
:::

```vue
<template>
  <lay-button @click="fullScreen">全屏切换</lay-button>
</template>

<script>
import { useFullScreen } from '@layui/hooks-vue'

export default {
  setup() {
    const { fullScreen, isFullScreen } = useFullScreen()

    watch(isFullScreen, () => {
      console.log('全屏切换')
    })

    return {
      fullScreen,
      isFullScreen,
    }
  },
}
</script>
```

::: title 使用备注
:::

::: table

| 事件         | 描述     | 类型     |
| ------------ | -------- | -------- |
| fullScreen   | 全屏切换 | Function |
| isFullScreen | 当前状态 | Ref      |

:::
