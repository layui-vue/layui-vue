::: anchor
:::

::: title 基本介绍
:::

::: describe 当页面上的操作命令过多时，用此组件可以收纳操作元素。
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-dropdown>
    <lay-button type="primary">下拉菜单</lay-button>
    <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项二</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
        </lay-dropdown-menu>
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

::: title 触发方式
:::

::: demo

<template>
  <lay-dropdown trigger="hover">
    <lay-button>Hover 触发</lay-button>
    <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项二</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
        </lay-dropdown-menu>
    </template>
  </lay-dropdown>
  &nbsp;&nbsp;
    <lay-dropdown>
    <lay-button>Click 触发</lay-button>
    <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项二</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
        </lay-dropdown-menu>
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

::: title Dropdown 属性
:::

::: table

| 属性    | 描述     | 可选值          |
| ------- | -------- | --------------- |
| trigger | 触发方式 | `click` `hover` |

:::

::: title Dropdown 插槽
:::

::: table

| 插槽    | 描述     | 可选值 |
| ------- | -------- | ------ |
| content | 下拉内容 | --     |

:::

::: comment
:::

::: previousNext dropdown
:::