::: anchor
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-menu v-model:selectedKey="selectedKey" v-model:openKeys="openKeys">
    <lay-menu-item title="首页" id="1"></lay-menu-item>
    <lay-menu-item title="用户" id="2"></lay-menu-item>
    <lay-menu-item title="角色" id="3"></lay-menu-item> 
    <lay-menu-item title="目录" id="7">
        <lay-menu-item title="菜单一" id="8"></lay-menu-item> 
        <lay-menu-item title="菜单二" id="9"></lay-menu-item>
        <lay-menu-item title="菜单三" id="10">
            <lay-menu-item title="菜单一" id="11"></lay-menu-item> 
            <lay-menu-item title="菜单二" id="12"></lay-menu-item>
            <lay-menu-item title="菜单三" id="13"></lay-menu-item>
        </lay-menu-item>
    </lay-menu-item> 
  </lay-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selectedKey = ref("5")
    const openKeys = ref(["7"])   
    return {
      selectedKey,
      openKeys
    }
  }
}
</script>

:::

::: title 垂直导航
:::

::: demo

<template>
  <lay-menu v-model:selectedKey="selectedKey" v-model:openKeys="openKeys" v-model:tree="isTree">
    <lay-menu-item title="首页" id="1">
      <template v-slot:title> 
        <router-link to="">无感</router-link>
      </template>
    </lay-menu-item>
    <lay-menu-item title="用户" id="2"></lay-menu-item>
    <lay-menu-item title="角色" id="3"></lay-menu-item> 
    <lay-menu-item title="目录" id="7">
        <lay-menu-item title="菜单一" id="8"></lay-menu-item> 
        <lay-menu-item title="菜单二" id="9"></lay-menu-item>
        <lay-menu-item title="菜单三" id="10">
            <lay-menu-item title="菜单一" id="11"></lay-menu-item> 
            <lay-menu-item title="菜单二" id="12"></lay-menu-item>
            <lay-menu-item title="菜单三" id="13"></lay-menu-item>
        </lay-menu-item>
    </lay-menu-item> 
  </lay-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const isTree = ref(true)
    const selectedKey = ref("5")
    const openKeys = ref(["7"])

    return {
      isTree,
      openKeys,
      selectedKey
    }
  }
}
</script>

:::

::: title 菜单属性
:::

::: table

| 属性                | 描述   | 备注 |
| ------------------- | ------ | ---- |
| v-model:selectedKey | 选中项 | --   |
| v-model:openKeys    | 打开项 | --   |

:::

::: title 菜单插槽
:::

::: table

| 插槽  | 描述     | 备注 |
| ----- | -------- | ---- |
| title | 菜单标题 | --   |

:::

::: comment
:::