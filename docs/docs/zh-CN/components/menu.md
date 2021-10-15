::: demo

<template>
  <lay-menu selectedKey="5">
    <lay-menu-item title="首页" id="1"></lay-menu-item>
    <lay-menu-item title="用户" id="2"></lay-menu-item>
    <lay-menu-item title="角色" id="3"></lay-menu-item> 
    <lay-menu-item title="目录" id="7">
        <lay-menu-child-item title="菜单一" id="4"></lay-menu-child-item> 
        <lay-menu-child-item title="菜单二" id="5"></lay-menu-child-item>
        <lay-menu-child-item title="菜单三" id="6"></lay-menu-child-item>
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
  <lay-menu selectedKey="5" tree>
    <lay-menu-item title="首页" id="1">
      <template v-slot:title> 
        <router-link to="">哈哈哈</router-link>
      </template>
    </lay-menu-item>
    <lay-menu-item title="用户" id="2"></lay-menu-item>
    <lay-menu-item title="角色" id="3"></lay-menu-item> 
    <lay-menu-item title="目录" id="7">
        <lay-menu-child-item title="菜单一" id="4"></lay-menu-child-item> 
        <lay-menu-child-item title="菜单二" id="5"></lay-menu-child-item>
        <lay-menu-child-item title="菜单三" id="6"></lay-menu-child-item>
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

::: field menu attributes

:::

|             |          |     |
| ----------- | -------- | --- |
| selectedKey | 默认选择 | --  |

::: field menu slots

:::

|             |          |     |
| ----------- | -------- | --- |
| title | 菜单标题 | --  |