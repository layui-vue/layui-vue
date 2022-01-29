::: anchor
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-menu v-model:selectedKey="selectedKey" theme="light" v-model:openKeys="openKeys">
    <lay-menu-item title="首页" id="1"></lay-menu-item>
    <lay-menu-item title="用户" id="2"></lay-menu-item>
    <lay-menu-item title="角色" id="3"></lay-menu-item> 
    <lay-sub-menu title="目录" id="7">
        <lay-menu-item title="菜单一" id="8"></lay-menu-item> 
        <lay-menu-item title="菜单二" id="9"></lay-menu-item>
        <lay-sub-menu title="菜单三" id="10">
            <lay-menu-item title="菜单一" id="11"></lay-menu-item> 
            <lay-menu-item title="菜单二" id="12"></lay-menu-item>
            <lay-menu-item title="菜单三" id="13"></lay-menu-item>
        </lay-sub-menu>
    </lay-sub-menu> 
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
  <lay-menu v-model:selectedKey="selectedKey" v-model:openKeys="openKeys" :tree="true">
    <lay-menu-item title="首页" id="1"></lay-menu-item>
    <lay-menu-item title="用户" id="2"></lay-menu-item>
    <lay-menu-item title="角色" id="3"></lay-menu-item> 
    <lay-sub-menu title="目录" id="7">
        <lay-menu-item title="菜单一" id="8"></lay-menu-item> 
        <lay-menu-item title="菜单二" id="9"></lay-menu-item>
        <lay-sub-menu title="菜单三" id="10">
            <lay-menu-item title="菜单一" id="11"></lay-menu-item> 
            <lay-menu-item title="菜单二" id="12"></lay-menu-item>
            <lay-menu-item title="菜单三" id="13"></lay-menu-item>
        </lay-sub-menu>
    </lay-sub-menu> 
  </lay-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const openKeys = ref(["7"])
    const selectedKey = ref("5")

    return {
      openKeys,
      selectedKey
    }
  }
}
</script>

:::

::: title 切换主题
:::

::: demo

<template>
  <lay-menu v-model:selectedKey="selectedKey" theme="light" v-model:openKeys="openKeys" :tree="true">
    <lay-menu-item title="首页" id="1"></lay-menu-item>
    <lay-menu-item title="用户" id="2"></lay-menu-item>
    <lay-menu-item title="角色" id="3"></lay-menu-item> 
    <lay-sub-menu title="目录" id="7">
        <lay-menu-item title="菜单一" id="8"></lay-menu-item> 
        <lay-menu-item title="菜单二" id="9"></lay-menu-item>
        <lay-sub-menu title="菜单三" id="10">
            <lay-menu-item title="菜单一" id="11"></lay-menu-item> 
            <lay-menu-item title="菜单二" id="12"></lay-menu-item>
            <lay-menu-item title="菜单三" id="13"></lay-menu-item>
        </lay-sub-menu>
    </lay-sub-menu> 
  </lay-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const openKeys = ref(["7"])
    const selectedKey = ref("5")

    return {
      openKeys,
      selectedKey
    }
  }
}
</script>

:::


::: title 菜单插槽
:::

::: demo

<template>
  <lay-menu v-model:selectedKey="selectedKey" v-model:openKeys="openKeys" v-model:tree="isTree">
    <lay-menu-item id="1">
      <router-link to="">首页</router-link>
    </lay-menu-item>
    <lay-sub-menu id="7">
        <template v-slot:title> 
          <router-link to="">目录</router-link>
        </template>
        <lay-menu-item id="8">
            <router-link to="">菜单一</router-link>
        </lay-menu-item> 
        <lay-menu-item id="9">
            <router-link to="">菜单二</router-link>
        </lay-menu-item>
    </lay-sub-menu> 
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

::: title Menu 属性
:::

::: table

| 属性                | 描述   | 备注 |
| ------------------- | ------ | ---- |
| v-model:selectedKey | 选中项 | --   |
| v-model:openKeys    | 打开项 | --   |

:::

::: title Menu Item 属性
:::

::: table

| 插槽  | 描述     | 备注 |
| ----- | -------- | ---- |
| title | 菜单标题 | --   |

:::

::: title Menu Item 插槽
:::

::: table

| 插槽  | 描述     | 备注 |
| ----- | -------- | ---- |
| title | 菜单标题 | --   |

:::

::: title Sub Menu 属性
:::

::: table

| 插槽  | 描述     | 备注 |
| ----- | -------- | ---- |
| title | 菜单标题 | --   |

:::

::: title Sub Menu 插槽
:::

::: table

| 插槽  | 描述     | 备注 |
| ----- | -------- | ---- |
| title | 菜单标题 | --   |

:::

::: comment
:::

::: previousNext nav
:::