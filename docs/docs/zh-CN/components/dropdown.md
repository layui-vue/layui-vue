::: demo

<template>
  <lay-dropdown>
    <lay-button>下拉菜单</lay-button>
    <template #content>
        <lay-dropdown-item>选项一</lay-dropdown-item>
        <lay-dropdown-item>选项二</lay-dropdown-item>
        <lay-dropdown-item>选项三</lay-dropdown-item>
    </template>
  </lay-dropdown>
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

::: demo

<template>
  <lay-dropdown trigger="hover">
    <lay-button>Hover 触发</lay-button>
    <template #content>
        <lay-dropdown-item>选项一</lay-dropdown-item>
        <lay-dropdown-item>选项二</lay-dropdown-item>
        <lay-dropdown-item>选项三</lay-dropdown-item>
    </template>
  </lay-dropdown>
  &nbsp;&nbsp;
    <lay-dropdown>
    <lay-button>Click 触发</lay-button>
    <template #content>
        <lay-dropdown-item>选项一</lay-dropdown-item>
        <lay-dropdown-item>选项二</lay-dropdown-item>
        <lay-dropdown-item>选项三</lay-dropdown-item>
    </template>
  </lay-dropdown>
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

::: field dropdown attributes

:::

|         |          |                 |
| ------- | -------- | --------------- |
| trigger | 触发方式 | `click` `hover` |
