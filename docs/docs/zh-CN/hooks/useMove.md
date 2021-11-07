::: title 基础使用
:::

::: block 使 用 useFullScreen 快 速 完 成 fullScreen 操 作
:::

```vue
<template>
  <button id="button">拖动</button>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import useMove from '/@src/hooks/useMove'

export default {
  setup() {
    onMounted(() => {
      const el = document.getElementById('button')
      useMove(el)
    })
    return {}
  },
}
</script>
```

::: title 使用备注
:::

::: table

| 备注 | 描述           | 类型        |
| ---- | -------------- | ----------- |
| el   | 需要拖拽的元素 | HtmlElement |

:::
