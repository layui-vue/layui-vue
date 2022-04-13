::: anchor
:::

::: title 基本介绍
:::

::: describe 为组件添加水波纹动画。
:::

::: title 测试
:::

::: demo 使用 `lay-ripple` 标签, 添加水波纹

<template>
  <lay-ripple>
    <lay-button>内部:click</lay-button>
  </lay-ripple><br>
  <lay-ripple trigger="always">
    <lay-button>内部:always</lay-button>
  </lay-ripple><br>
  <lay-ripple trigger="mouseenter">
    <lay-button>内部:mouseenter</lay-button>
  </lay-ripple><br><br>
  <lay-ripple type="out" borderRadius="1px">
    <lay-button>外部:click</lay-button>
  </lay-ripple><br><br>
  <lay-ripple type="out" trigger="always" borderRadius="50%" color="red">
    <div style="border-radius:50%;background-color:red;width:8px;height:8px"></div>
  </lay-ripple><br><br><br>
  <lay-ripple type="out" trigger="mouseenter" borderRadius="50%" color="red">
    <div style="border-radius:50%;background-color:red;width:20px;height:20px"></div>
  </lay-ripple><br>
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