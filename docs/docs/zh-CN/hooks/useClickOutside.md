::: title 基础使用
:::

::: block 使 用 useClickOutside 监 听 元 素 外 click 事 件
:::

```vue
<template>
  <lay-button type="primary" ref="buttonRef">当前元素</lay-button>
</template>

<script>
import { ref, watch } from 'vue'
import useClickOutside from '/@src/hooks/useClickOutside'

export default {
  setup() {
    const buttonRef = (ref < null) | (HTMLElement > null)
    const isClickOutside = useClickOutside(buttonRef)

    watch(isClickOutside, () => {
      console.log('元素外 click 事件')
    })

    return {
      buttonRef,
    }
  },
}
</script>
```

::: title 使用备注
:::

| 备注           | 描述            | 类型 |
| -------------- | --------------- | ---- |
| isClickOutside | 使用 watch 监听 | Ref  |
