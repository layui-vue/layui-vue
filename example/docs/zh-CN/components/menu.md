::: anchor
:::

::: title 基本介绍
:::

::: describe 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-menu v-model:selectedKey="selectedKey" v-model:openKeys="openKeys1">
    <lay-menu-item title="首页" id="1"></lay-menu-item>
    <lay-menu-item title="用户" id="2"></lay-menu-item>
    <lay-menu-item title="角色" id="3"></lay-menu-item> 
    <lay-sub-menu title="目录" id="7">
        <lay-menu-item title="菜单1" id="8"></lay-menu-item> 
        <lay-menu-item title="菜单2" id="9"></lay-menu-item>
        <lay-sub-menu title="菜单3" id="10">
            <lay-menu-item title="菜单3-1" id="11"></lay-menu-item> 
            <lay-menu-item title="菜单3-2" id="12"></lay-menu-item>
            <lay-sub-menu title="菜单3-3" id="13">
              <lay-menu-item title="菜单3-3-1" id="14"></lay-menu-item> 
              <lay-menu-item title="菜单3-3-2" id="15"></lay-menu-item>
              <lay-menu-item title="菜单3-3-3" id="16"></lay-menu-item>
          </lay-sub-menu>
        </lay-sub-menu>
    </lay-sub-menu> 
  </lay-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selectedKey = ref("5")
    const openKeys1 = ref(["7"])   
    return {
      selectedKey,
      openKeys1
    }
  }
}
</script>

:::

::: title 垂直导航
:::

::: demo

<template>
  <lay-menu v-model:selectedKey="selectedKey" v-model:openKeys="openKeys2" :tree="true">
    <lay-menu-item title="首页" id="1"></lay-menu-item>
    <lay-menu-item title="用户" id="2"></lay-menu-item>
    <lay-menu-item title="角色" id="3"></lay-menu-item> 
    <lay-sub-menu title="目录" id="7">
        <lay-menu-item title="菜单" id="8"></lay-menu-item> 
        <lay-menu-item title="菜单" id="9"></lay-menu-item>
        <lay-sub-menu title="菜单" id="10">
            <lay-menu-item title="菜单" id="11"></lay-menu-item> 
            <lay-menu-item title="菜单" id="12"></lay-menu-item>
            <lay-menu-item title="菜单" id="13"></lay-menu-item>
        </lay-sub-menu>
    </lay-sub-menu> 
  </lay-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const openKeys2 = ref(["7"])
    const selectedKey = ref("5")

    return {
      openKeys2,
      selectedKey
    }
  }
}
</script>

:::

::: title 反转样式
:::

::: demo

<template>
  <lay-menu level="true" v-model:selectedKey="selectedKey" inverted="true" v-model:openKeys="openKeys3" :tree="true">
    <lay-menu-item title="首页" id="1"></lay-menu-item>
    <lay-menu-item title="用户" id="2"></lay-menu-item>
    <lay-menu-item title="角色" id="3"></lay-menu-item> 
    <lay-sub-menu title="目录" id="7">
        <lay-menu-item title="菜单" id="8"></lay-menu-item> 
        <lay-menu-item title="菜单" id="9"></lay-menu-item>
        <lay-sub-menu title="菜单" id="10">
            <lay-menu-item title="菜单" id="11"></lay-menu-item> 
            <lay-menu-item title="菜单" id="12"></lay-menu-item>
            <lay-menu-item title="菜单" id="13"></lay-menu-item>
        </lay-sub-menu>
    </lay-sub-menu> 
  </lay-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const openKeys3 = ref(["7"])
    const selectedKey = ref("5")

    return {
      openKeys3,
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
  <lay-menu v-model:selectedKey="selectedKey" theme="light" v-model:openKeys="openKeys4" :tree="true">
    <lay-menu-item title="首页" id="1"></lay-menu-item>
    <lay-menu-item title="用户" id="2"></lay-menu-item>
    <lay-menu-item title="角色" id="3"></lay-menu-item> 
    <lay-sub-menu title="目录" id="7">
        <lay-menu-item title="菜单" id="8"></lay-menu-item> 
        <lay-menu-item title="菜单" id="9"></lay-menu-item>
        <lay-sub-menu title="菜单" id="10">
            <lay-menu-item title="菜单" id="11"></lay-menu-item> 
            <lay-menu-item title="菜单" id="12"></lay-menu-item>
            <lay-menu-item title="菜单" id="13"></lay-menu-item>
        </lay-sub-menu>
    </lay-sub-menu> 
  </lay-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const openKeys4 = ref(["7"])
    const selectedKey = ref("5")

    return {
      openKeys4,
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
  <lay-menu v-model:selectedKey="selectedKey" v-model:openKeys="openKeys5" v-model:tree="isTree">
    <lay-menu-item id="1">
      <router-link to="">
        <lay-icon type="layui-icon-home"></lay-icon> 
        首页
      </router-link>
    </lay-menu-item>
    <lay-sub-menu id="7">
        <template v-slot:title> 
          <router-link to="">
            <lay-icon type="layui-icon-home"></lay-icon> 
            目录
          </router-link>
        </template>
        <lay-menu-item id="8">
            <router-link to="">
              <lay-icon type="layui-icon-home"></lay-icon> 
              菜单
            </router-link>
        </lay-menu-item> 
        <lay-menu-item id="9">
            <router-link to="">
              <lay-icon type="layui-icon-home"></lay-icon> 
              菜单
            </router-link>
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
    const openKeys5 = ref(["7"])

    return {
      isTree,
      openKeys5,
      selectedKey
    }
  }
}
</script>

:::

::: title 菜单折叠
:::

::: demo

<template>
  <lay-switch v-model="collapse"></lay-switch>
  <br/>
  <br/>
  <lay-menu v-model:selectedKey="selectedKey" v-model:tree="isTree" v-model:openKeys="openKeys6" :collapse="collapse">
    <lay-menu-item title="首页" id="1"></lay-menu-item>
    <lay-menu-item title="用户" id="2"></lay-menu-item>
    <lay-menu-item title="角色" id="3"></lay-menu-item> 
    <lay-sub-menu title="目录" id="7">
        <lay-menu-item title="菜单1" id="8"></lay-menu-item> 
        <lay-menu-item title="菜单2" id="9"></lay-menu-item>
        <lay-sub-menu title="菜单3" id="10">
            <lay-menu-item title="菜单3-1" id="11"></lay-menu-item> 
            <lay-menu-item title="菜单3-2" id="12"></lay-menu-item>
            <lay-sub-menu title="菜单3-3" id="13">
              <lay-menu-item title="菜单3-3-1" id="14"></lay-menu-item> 
              <lay-menu-item title="菜单3-3-2" id="15"></lay-menu-item>
              <lay-menu-item title="菜单3-3-3" id="16"></lay-menu-item>
          </lay-sub-menu>
        </lay-sub-menu>
    </lay-sub-menu> 
  </lay-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selectedKey = ref("5")
    const openKeys6 = ref(["7"])
    const collapse = ref(true)   
    const isTree = ref(true)
    return {
      selectedKey,
      openKeys6,
      colapse,
      isTree
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
| theme    | 菜单主题 | `dark` `light`   |
| inverted    | 特殊的激活样式 | `true` `false`  |
| level    | 菜单层级 | `true` `false`  |

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
