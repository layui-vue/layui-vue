::: title 基础使用
:::

::: demo 使用 useClickOutside 监听元素外的监听事件

<template>
  <lay-button ref='buttonRef' type='primary'>当前元素</lay-button>
</template>

<script>
import { ref, watch } from 'vue'
import useClickOutside from '/@src/hooks/useClickOutside'

export default {
  setup() {

    const buttonRef = (ref < null) | (HTMLElement > null)
    const isClickOutside = useClickOutside(buttonRef)

    watch(isClickOutside, () => {
      console.log("元素外 click 事件")
    })

    return {
      buttonRef
    }
  }
}
</script>

:::
