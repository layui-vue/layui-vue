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
<lay-space>
  <lay-dropdown updateAtScroll>
    <lay-button type="primary">下拉菜单</lay-button>
    <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项二</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
        </lay-dropdown-menu>
    </template>
  </lay-dropdown>
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
</lay-space>
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
<lay-space>
  <lay-dropdown trigger="hover" updateAtScroll>
    <lay-button>Hover 触发</lay-button>
    <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项二</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
        </lay-dropdown-menu>
    </template>
  </lay-dropdown>
    <lay-dropdown updateAtScroll>
    <lay-button>Click 触发</lay-button>
    <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项二</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
        </lay-dropdown-menu>
    </template>
  </lay-dropdown>
    <lay-dropdown trigger="contextMenu" updateAtScroll>
    <lay-button>contextMenu 触发</lay-button>
    <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项二</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
        </lay-dropdown-menu>
    </template>
  </lay-dropdown>
    <lay-dropdown trigger="focus" updateAtScroll>
    <lay-input placeholder="Focus 触发"></lay-input>
    <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项二</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
        </lay-dropdown-menu>
    </template>
  </lay-dropdown>
    <lay-dropdown :trigger="['hover','focus','click']" updateAtScroll>
    <lay-input placeholder="hover focus click"></lay-input>
    <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项二</lay-dropdown-menu-item>
          <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
        </lay-dropdown-menu>
    </template>
  </lay-dropdown>
</lay-space>
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

::: title 手动打开或关闭
:::

::: demo

<template>
  <lay-button @click="manualRef.show()">打开</lay-button>
  <lay-button @click="manualRef.hide()">关闭</lay-button>
  <br><br>
  <lay-dropdown ref="manualRef" :clickOutsideToClose="false" :clickToClose="false" updateAtScroll>
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
    const manualRef = ref()

    return {
      manualRef,
    }
  }
}
</script>

:::

::: title 默认打开
:::

::: demo

<template>
  <lay-dropdown :visible="true" updateAtScroll>
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


::: title 禁用弹出
:::

::: demo

<template>
  <lay-dropdown disabled>
    <lay-button type="primary" >禁用弹出</lay-button>
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
::: title 事件处理
:::

::: demo

<template>
  <lay-dropdown @show="stat='开启'" @hide="stat='关闭'" updateAtScroll>
    <lay-button type="primary" >当前状态:{{stat}}</lay-button>
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
    const stat=ref("关闭")
    return {
      stat
    }
  }
}
</script>

:::

::: title 弹出位置
:::

::: demo

<template>
<lay-space wrap>
  <lay-dropdown placement="top-start" updateAtScroll>
    <lay-button type="primary">top-start</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  <lay-dropdown placement="top" updateAtScroll>
    <lay-button type="primary">top</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  <lay-dropdown placement="top-end" updateAtScroll>
    <lay-button type="primary">top-end</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  <lay-dropdown placement="bottom-start" updateAtScroll>
    <lay-button type="primary">bottom-start</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  <lay-dropdown placement="bottom" updateAtScroll>
    <lay-button type="primary">bottom</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  <lay-dropdown placement="bottom-end" updateAtScroll>
    <lay-button type="primary">bottom-end</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
</lay-space>
<br><br>
<lay-space>
  <lay-dropdown placement="right-start" updateAtScroll>
    <lay-button type="primary">right-start</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  <lay-dropdown placement="right" updateAtScroll>
    <lay-button type="primary">right</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  <lay-dropdown placement="right-end" updateAtScroll>
    <lay-button type="primary">right-end</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
    <lay-dropdown placement="left-start" updateAtScroll>
    <lay-button type="primary">left-start</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  <lay-dropdown placement="left" updateAtScroll>
    <lay-button type="primary">left</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  <lay-dropdown placement="left-end" updateAtScroll>
    <lay-button type="primary">left-end</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
</lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const btnSize = ref('')
    const toogleSize = () => {
      btnSize.value =  btnSize.value ? '' : 'lg'
    }

    return {
      btnSize,
      toogleSize
    }
  }
}
</script>

:::

::: title 菜单插槽
:::

::: demo

<template>
  <lay-dropdown updateAtScroll>
    <lay-button type="primary">图标菜单</lay-button>
    <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item>
            <template #prefix><lay-icon type="layui-icon-return"></lay-icon></template>
            <template #default>返回</template>
            <template #suffix><span style="margin-left: 50px; font-size:10px">Alt + 向左键</span></template>
          </lay-dropdown-menu-item>
          <lay-dropdown-menu-item>
            <template #prefix><lay-icon type="layui-icon-refresh"></lay-icon></template>
            <template #default>刷新</template>
            <template #suffix><span style="font-size:10px">Ctrl + R</span></template>
          </lay-dropdown-menu-item>
          <lay-line margin="5px" theme="#EEE"></lay-line>
          <lay-dropdown-menu-item disabled>
            <template #prefix><lay-icon type="layui-icon-about"></lay-icon></template>
            <template #default>更多</template>
            <template #suffix><lay-icon type="layui-icon-right"></lay-icon></template>
          </lay-dropdown-menu-item>
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

::: title 多级菜单
:::

::: demo

<template>
  <lay-dropdown updateAtScroll>
    <lay-button type="primary">下拉菜单</lay-button>
    <template #content>
        <lay-dropdown-menu>
          <lay-dropdown-menu-item>
            <template #prefix><lay-icon type="layui-icon-list"></lay-icon></template>
            <template #default>选项一</template>
          </lay-dropdown-menu-item>
          <lay-dropdown-sub-menu>
            <template #prefix><lay-icon type="layui-icon-set-sm"></lay-icon></template>
            <template #default>选项二</template>
            <template #content>
              <lay-dropdown-menu-item disabled>子菜单一</lay-dropdown-menu-item>
              <lay-dropdown-menu-item>子菜单二</lay-dropdown-menu-item>
              <lay-dropdown-sub-menu>
                <template #default>子菜单三</template>
                <template #content>
                   <lay-dropdown-menu-item>菜单1</lay-dropdown-menu-item>
                   <lay-dropdown-menu-item>菜单2</lay-dropdown-menu-item>
                   <lay-dropdown-menu-item>菜单3</lay-dropdown-menu-item>
                </template>
              </lay-dropdown-sub-menu>
              <lay-dropdown-sub-menu>
                <template #default>子菜单四</template>
                <template #content>
                   <lay-dropdown-menu-item>菜单1</lay-dropdown-menu-item>
                   <lay-dropdown-menu-item>菜单2</lay-dropdown-menu-item>
                   <lay-dropdown-menu-item>菜单3</lay-dropdown-menu-item>
                </template>
              </lay-dropdown-sub-menu>
            </template>
          </lay-dropdown-sub-menu>
          <lay-dropdown-menu-item>
            <template #prefix><lay-icon type="layui-icon-share"></lay-icon></template>
            <template #default>选项三</template>
          </lay-dropdown-menu-item>
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

::: title 跟随鼠标
:::

::: demo

<template>
  <lay-dropdown ref="dropdownRefEl" :trigger="['click','contextMenu']" alignPoint>
    <div style="width:500px;height:300px;background-color:#eee"></div>
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
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const dropdownRefEl = ref(null);
    const handleScroll = () => {
      dropdownRefEl.value.hide();
    }

    onMounted(() => {
      const scrollEl =  document.querySelector(".layui-body")
      scrollEl.addEventListener("scroll", handleScroll)
    })
    return {
      dropdownRefEl
    }
  }
}
</script>

:::


::: title Dropdown 属性
:::

::: table

| 属性                | 描述                                              | 类型      | 默认值   | 可选值                                          |
| ------------------- | ------------------------------------------------- | --------- | -------- | ----------------------------------------------- |
| visible             | 下拉面板是否可见                                  | `boolean` | `true`   | `true` `false`                                  |
| trigger             | 触发方式,类型 `string` 或 trigger 数组            | `strine` `string[]`  | `click`  | `click` `hover` `focus` `contextMenu`           |
| disabled            | 是否禁用触发                                      | `boolean` | `false`  | `true` `false`                                  |
| placement           | 下拉面板位置                                      | `string`  | `bottom` | `top` `bottom` `right` `left` `*-start` `*-end` |
| autoFitPosition     | 是否自动调整下拉面板位置                          | `boolean` | `true`   | `true` `false`                                  |
| autoFitWidth        | 是否将下拉面板宽度设置为触发器宽度                | `boolean` | `false`  | `true` `false`                                  |
| autoFitMinWidth     | 是否将下拉面板最小宽度设置为触发器宽度            | `boolean` | `true`   | `true` `false`                                  |
| updateAtScroll      | 是否在容器滚动时更新下拉面板的位置                | `boolean` | `false`  | `true` `false`                                  |
| autoFixPosition     | 是否在触发器或下拉面板尺寸变化时更新下拉面板位置  | `boolean` | `true`   | `true` `false`                                  |
| clickToClose        | 是否在点击触发器时关闭面板                        | `boolean` | `true`   | `true` `false`                                  |
| blurToClose         | 是否在触发器失去焦点时关闭面板                    | `boolean` | `true`   | `true` `false`                                  |
| clickOutsideToClose | 是否点击外部关闭下拉面板                          | `boolean` | `true`   | `true` `false`                                  |
| contentOffset       | 下拉面板距离触发器的偏移距离                      | `string`  | `2px`    | -                                               |
| mouseEnterDelay     | mouseEnter 事件延迟触发的时间, trigger hover 有效 | `number`  | `150`    | -                                               |
| mouseLeaveDelay     | mouseLeave 事件延迟触发的时间, trigger hover 有效 | `number`  | `150`    | -                                               |
| focusDelay          | focus 事件延迟触发的时间, trigger focus 有效      | `number`  | `150`    | -                                               |
| alignPoint |跟随鼠标|`boolean`|`false`|`true` `false`|
| contentClass| 弹出内容的类名  | `string`| -| -|
| contentStyle| 弹出内容的样式  | `string` | - | -|

:::

::: title Dropdown 插槽
:::

::: table

| 插槽    | 描述     | 可选值 |
| ------- | -------- | ------ |
| content | 下拉内容 | --     |

:::

 
::: title Dropdown 事件
:::

::: table

| 插槽    | 描述     | 参数 |
| ------- | -------- | ------ |
| hide | 隐藏下拉面板后触发 | --     |
| show | 显示下拉面板后触发 | --     |

:::

::: title Dropdown Menu Item 插槽
:::

::: table

| 插槽    | 描述     | 参数 |
| ------- | -------- | ------ |
| prefix | 前缀 | --     |
| default | 默认 | --     |
| suffix | 后缀|--|

:::

::: title Dropdown Sub Menu 属性
:::

::: table

| 属性          | 描述                                   | 类型      | 默认值   | 可选值                                          |
| ------------- | -------------------------------------- | --------- | -------- | ----------------------------------------------- |
| trigger       | 触发方式,类型 `string` 或 trigger 数组 | `strine` `string[]`  | `click`  | `click` `hover` `focus` `contextMenu`           |
| disabled      | 是否禁用触发                           | `boolean` | `false`  | `true` `false`                                  |
| placement     | 下拉面板位置                           | `string`  | `bottom` | `top` `bottom` `right` `left` `*-start` `*-end` |
| contentOffset | 下拉面板距离触发器的偏移距离，默认 2   | `string`    | 2px      | -                                              | 

:::

::: title Dropdown Sub Menu 插槽
:::

::: table

| 插槽    | 描述     | 参数 |
| ------- | -------- | ------ |
| prefix | 前缀 | --     |
| default | 默认 | --     |
| suffix | 后缀|--|
| content | 下拉面板内容|--|

:::


::: contributor dropdown
:::

::: previousNext dropdown
:::