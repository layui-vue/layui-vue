::: demo

<template>
  <lay-menu>
    <lay-menu-item title="首页"></lay-menu-item>
    <lay-menu-item title="用户"></lay-menu-item>
    <lay-menu-item title="角色"></lay-menu-item> 
    <lay-menu-item title="目录">
        <lay-menu-child-item title="菜单一"></lay-menu-child-item> 
        <lay-menu-child-item title="菜单二"></lay-menu-child-item>
        <lay-menu-child-item title="菜单三"></lay-menu-child-item>
    </lay-menu-item> 
  </lay-menu>
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
  <lay-menu tree>
    <lay-menu-item title="首页"></lay-menu-item>
    <lay-menu-item title="用户"></lay-menu-item>
    <lay-menu-item title="角色"></lay-menu-item> 
    <lay-menu-item title="目录">
        <lay-menu-child-item title="菜单一"></lay-menu-child-item> 
        <lay-menu-child-item title="菜单二"></lay-menu-child-item>
        <lay-menu-child-item title="菜单三"></lay-menu-child-item>
    </lay-menu-item> 
  </lay-menu>
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
