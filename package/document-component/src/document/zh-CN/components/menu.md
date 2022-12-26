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
  <lay-menu v-model:selected-key="selectedKey" v-model:open-keys="openKeys1">
    <lay-menu-item id="1" to="/">首页</lay-menu-item>
    <lay-menu-item id="2">首页</lay-menu-item>
    <lay-menu-item id="3">首页</lay-menu-item> 
    <lay-sub-menu id="7">
        <template #title>
          首页
        </template>
        <lay-menu-item id="8">首页</lay-menu-item> 
        <lay-menu-item id="9">首页</lay-menu-item>
        <lay-sub-menu title="菜单" id="10">
            <template #title>
              首页
            </template>
            <lay-menu-item id="11">首页</lay-menu-item> 
            <lay-menu-item id="12">首页</lay-menu-item>
            <lay-menu-item id="13">首页</lay-menu-item>
        </lay-sub-menu>
    </lay-sub-menu> 
  </lay-menu>
  <br/>
  <lay-menu v-model:selected-key="selectedKey" v-model:open-keys="openKeys1" theme="light">
    <lay-menu-item id="1"><router-link to="/">hahah </router-link></lay-menu-item>
    <lay-menu-item id="2">首页</lay-menu-item>
    <lay-menu-item id="3">首页</lay-menu-item> 
    <lay-sub-menu id="7">
        <template #title>
          首页
        </template>
        <lay-menu-item id="8">首页</lay-menu-item> 
        <lay-menu-item id="9">首页</lay-menu-item>
        <lay-sub-menu title="菜单" id="10">
            <template #title>
              首页
            </template>
            <lay-menu-item id="11">首页</lay-menu-item> 
            <lay-menu-item id="12">首页</lay-menu-item>
            <lay-menu-item id="13">首页</lay-menu-item>
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
  <lay-menu :selected-key="selectedKey" @change-selected-Key="changeSelectedKey" @change-open-keys="changeOpenKeys" v-model:openKeys="openKeys2" :tree="true">
    <lay-menu-item id="1">首页</lay-menu-item>
    <lay-menu-item id="2">首页</lay-menu-item>
    <lay-menu-item id="3">首页</lay-menu-item> 
    <lay-sub-menu id="7">
        <template #title>
          首页
        </template>
        <lay-menu-item id="8">首页</lay-menu-item> 
        <lay-menu-item id="9">首页</lay-menu-item>
        <lay-sub-menu title="菜单" id="10">
            <template #title>
              首页
            </template>
            <lay-menu-item id="11">首页</lay-menu-item> 
            <lay-menu-item id="12">首页</lay-menu-item>
            <lay-sub-menu title="菜单" id="13">
                <template #title>
                  首页
                </template>
                <lay-menu-item id="14">首页</lay-menu-item> 
                <lay-menu-item id="15">首页</lay-menu-item>
                <lay-sub-menu title="菜单" id="16">
                    <template #title>
                      首页
                    </template>
                    <lay-menu-item id="17">首页</lay-menu-item> 
                    <lay-menu-item id="18">首页</lay-menu-item>
                    <lay-menu-item id="19">首页</lay-menu-item>
                </lay-sub-menu>
            </lay-sub-menu>
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
    const changeSelectedKey = (val) => {
      selectedKey.value = val;
    }

    const changeOpenKeys = (val) => {
      openKeys2.value = val;
    }

    return {
      indent,
      openKeys2,
      selectedKey,
      changeOpenKeys,
      changeSelectedKey
    }
  }
}
</script>

:::

::: title 反转样式
:::

::: demo

<template>
  <lay-menu :level="isLevel" v-model:selected-key="selectedKey" inverted="true" v-model:open-keys="openKeys3" :tree="true">
    <lay-menu-item id="1">首页</lay-menu-item>
    <lay-menu-item id="2">首页</lay-menu-item>
    <lay-menu-item id="3">首页</lay-menu-item> 
    <lay-sub-menu id="7">
        <template #title>
          首页
        </template>
        <lay-menu-item id="8">首页</lay-menu-item> 
        <lay-menu-item id="9">首页</lay-menu-item>
        <lay-sub-menu id="10">
            <template #title>
              首页
            </template>
            <lay-menu-item id="11">首页</lay-menu-item> 
            <lay-menu-item id="12">首页</lay-menu-item>
            <lay-menu-item id="13">首页</lay-menu-item>
        </lay-sub-menu>
    </lay-sub-menu> 
  </lay-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const isLevel = ref(false);
    const openKeys3 = ref(["7"]);
    const selectedKey = ref("5");

    return {
      isLevel,
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
  <lay-menu v-model:selected-key="selectedKey" theme="light" v-model:openKeys="openKeys4" :tree="true">
    <lay-menu-item id="1">
      <template #title>
        菜单
      </template>
    </lay-menu-item>
    <lay-menu-item id="2">
      <template #title>
        菜单
      </template>
    </lay-menu-item>
    <lay-menu-item id="3">
      <template #title>
        菜单
      </template>
    </lay-menu-item> 
    <lay-sub-menu id="7">
        <template #title>
          目录
        </template>
        <lay-menu-item id="8">
          菜单
        </lay-menu-item> 
        <lay-menu-item id="9">
          菜单
        </lay-menu-item>
        <lay-sub-menu title="菜单" id="10">
            <template #title>
              目录
            </template>
            <lay-menu-item id="11">
              菜单
            </lay-menu-item> 
            <lay-menu-item id="12">
              菜单
            </lay-menu-item>
            <lay-menu-item id="13">
              菜单
            </lay-menu-item>
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
  <lay-menu v-model:selected-key="selectedKey" v-model:open-keys="openKeys5" v-model:tree="isTree">
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
  <lay-menu v-model:selected-key="selectedKey" v-model:tree="isTree" v-model:open-keys="openKeys6" :collapse="collapse">
    <lay-menu-item id="1">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
    </lay-menu-item>
    <lay-menu-item id="2">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
    </lay-menu-item>
    <lay-menu-item id="3">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
    </lay-menu-item> 
    <lay-sub-menu title="目录" id="7">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
        <lay-menu-item id="8">
                  <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
        </lay-menu-item> 
        <lay-menu-item id="9">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
        </lay-menu-item>
        <lay-sub-menu id="10">
            <template #icon>
              <lay-icon type="layui-icon-home"></lay-icon> 
            </template>
            <template #title>
              首页
            </template>
            <lay-menu-item id="11">
                      <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
            </lay-menu-item> 
            <lay-menu-item id="12">
                      <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
            </lay-menu-item>
            <lay-sub-menu id="13">
              <template #icon>
                <lay-icon type="layui-icon-home"></lay-icon> 
              </template>
              <template #title>
              首页
              </template>
              <lay-menu-item id="14">
                        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
              </lay-menu-item> 
              <lay-menu-item id="15">
                        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
              </lay-menu-item>
              <lay-menu-item id="16">
                        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
              </lay-menu-item>
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

::: title 悬浮菜单
:::

::: demo

<template>
  <lay-switch v-model="collapse20"></lay-switch>&nbsp;&nbsp;
  <lay-switch v-model="active20">
    <template #onswitch-icon>亮</template>
    <template #unswitch-icon>黑</template>
  </lay-switch>
  <br/>
  <br/>
  <lay-menu v-model:selected-key="selectedKey20" :theme="active20 ? 'dark' : 'light'" v-model:tree="isTree20" v-model:open-keys="openKeys20" :collapse="collapse20">
    <lay-menu-item id="1">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
    </lay-menu-item>
    <lay-menu-item id="2">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
    </lay-menu-item>
    <lay-sub-menu id="3">
      <template #icon><lay-icon type="layui-icon-home"></lay-icon></template>
      <template #title>  
        首页 
      </template>
      <lay-menu-item id="4">
        <template #title>首页</template>
      </lay-menu-item> 
      <lay-menu-item id="5">
        <template #title>菜单一</template>
      </lay-menu-item>
      <lay-sub-menu>
        <template #title>首页</template>
        <lay-menu-item id="7">
          <template #title>首页</template>
        </lay-menu-item> 
      </lay-sub-menu>
      <lay-sub-menu id="6">
        <template #title>首页</template>
        <lay-menu-item id="7">
          <template #title>首页</template>
        </lay-menu-item> 
        <lay-menu-item id="8">
          <template #title>首页</template>
        </lay-menu-item>
        <lay-sub-menu id="9">
          <template #title>首页</template>
          <lay-menu-item id="10">
            <template #title>首页</template>
          </lay-menu-item> 
          <lay-menu-item id="11">
            <template #title>首页</template>
          </lay-menu-item>
          <lay-menu-item id="12">
            <template #title>首页</template>
          </lay-menu-item>
        </lay-sub-menu>
      </lay-sub-menu>
    </lay-sub-menu>  
    <lay-sub-menu id="13">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
        <lay-menu-item id="14">
                  <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
        </lay-menu-item> 
        <lay-menu-item id="15">
        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
        </lay-menu-item>
        <lay-sub-menu id="16">
            <template #icon>
              <lay-icon type="layui-icon-home"></lay-icon> 
            </template>
            <template #title>
              首页
            </template>
            <lay-menu-item id="17">
                      <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
            </lay-menu-item> 
            <lay-menu-item id="18">
                      <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
            </lay-menu-item>
            <lay-sub-menu id="19">
              <template #icon>
                <lay-icon type="layui-icon-home"></lay-icon> 
              </template>
              <template #title>
              首页
              </template>
              <lay-menu-item id="20">
                        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
              </lay-menu-item> 
              <lay-menu-item id="21">
                        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
              </lay-menu-item>
              <lay-menu-item id="22">
                        <template #icon>
          <lay-icon type="layui-icon-home"></lay-icon> 
        </template>
        <template #title>
          首页
        </template>
              </lay-menu-item>
          </lay-sub-menu>
        </lay-sub-menu>
    </lay-sub-menu> 
  </lay-menu>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const selectedKey20 = ref("5")
    const openKeys20 = ref(["7"])
    const collapse20 = ref(true)   
    const isTree20 = ref(true)
    const active20 = ref(true)
    return {
      selectedKey,
      openKeys6,
      colapse,
      isTree,
      active20
    }
  }
}
</script>

:::

::: title 过渡动画
:::

::: demo

<template>
  <lay-menu v-model:selected-key="selectedKey" :collapse-transition="collapseTransition" v-model:open-keys="openKeys7" v-model:tree="isTree">
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
    const collapseTransition = ref(false);
    const selectedKey = ref("5")
    const openKeys7 = ref(["7"])

    return {
      isTree,
      openKeys7,
      selectedKey,
      collapseTransition
    }
  }
}
</script>

:::

::: title 扩展图标
:::

::: demo

<template>
  <lay-menu v-model:selected-key="selectedKey" v-model:open-keys="openKeys7" v-model:tree="isTree">
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
        <template v-slot:expandIcon={isExpand}>
          {{isExpand}}
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
    const openKeys7 = ref(["7"])
    const selectedKey = ref("5")

    return {
      isTree,
      openKeys7,
      selectedKey,
    }
  }
}
</script>

:::

::: title Menu 属性
:::

::: table

| 属性                | 描述           | 备注           |
| ------------------- | -------------- | -------------- |
| v-model:selectedKey | 选中项         | --             |
| v-model:openKeys    | 打开项         | --             |
| theme               | 菜单主题       | `dark` `light` |
| inverted            | 特殊的激活样式 | `true` `false` |
| level               | 菜单层级       | `true` `false` |
| collapse            | 折叠状态       | `true` `false` |
| collapse-transition  | 折叠动画       | `true` `false` |
| indent              | 菜单缩进        | `10px` `20px` `true`  |

:::

::: title Menu 事件
:::

::: table

| 属性                | 描述                | 参数             |
| ------------------- | ------------------- | --------------  | 
| changeSelectedKey   | 选中菜单回调         | value: string   |
| changeOpenKeys      | 展开目录回调         | value: string[] |

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

| 属性  | 描述     | 备注 |
| ----- | -------- | ---- |
| title | 菜单标题 | --   |

:::

::: title Sub Menu 插槽
:::

::: table

| 插槽  | 描述     | 备注 |
| ----- | -------- | ---- |
| title | 菜单标题 | --   |
| expandIcon | 扩展图标 | isExpand:是否展开   |
:::

::: contributor menu
:::  

::: previousNext menu
:::
