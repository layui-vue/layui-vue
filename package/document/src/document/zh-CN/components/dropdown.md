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
    &nbsp;&nbsp;
    <lay-dropdown trigger="contextMenu">
    <lay-button>contextMenu 触发</lay-button>
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
  <lay-dropdown @open="stat='开启'" @hide="stat='关闭'">
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

::: title 位置优化
:::

::: demo

<template>
  <lay-dropdown placement="top-left">
    <lay-button type="primary">topLeft</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  &nbsp;&nbsp;
  <lay-dropdown placement="top">
    <lay-button type="primary">top</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  &nbsp;&nbsp;
  <lay-dropdown placement="top-right">
    <lay-button type="primary">topRight</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  &nbsp;&nbsp;
  <lay-dropdown placement="bottom-left">
    <lay-button type="primary">bottomLeft</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
    &nbsp;&nbsp;
  <lay-dropdown placement="bottom">
    <lay-button type="primary">bottom</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
    &nbsp;&nbsp;
  <lay-dropdown placement="bottom-right">
    <lay-button type="primary">bottomRight</lay-button>
    <template #content>
      <div style="width:300px;height:200px;"></div> 
    </template>
  </lay-dropdown>
  &nbsp;&nbsp;
  <br><br>
  <lay-dropdown placement="bottom-left" autoFitWidth>
    <lay-button type="primary">autoFitWidth</lay-button>
    <template #content>
      <lay-dropdown-menu>
        <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
        <lay-dropdown-menu-item>选项二1111111111111111111111</lay-dropdown-menu-item>
        <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
      </lay-dropdown-menu>
    </template>
  </lay-dropdown>
  &nbsp;&nbsp;
  <lay-dropdown placement="bottom-left" :autoFitMinWidth="false">
    <lay-button type="primary">关闭 autoFitMinWidth</lay-button>
    <template #content>
      <lay-dropdown-menu>
        <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
        <lay-dropdown-menu-item>选项二111111111</lay-dropdown-menu-item>
        <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
      </lay-dropdown-menu> 
    </template>
  </lay-dropdown>
    &nbsp;&nbsp;
  <lay-dropdown placement="bottom-left" updateAtScroll>
    <lay-button type="primary">updateAtScroll</lay-button>
    <template #content>
      <lay-dropdown-menu>
        <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
        <lay-dropdown-menu-item>选项二111111111</lay-dropdown-menu-item>
        <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
      </lay-dropdown-menu> 
    </template>
  </lay-dropdown>
      &nbsp;&nbsp;
  <lay-dropdown placement="bottom-left" updateAtScroll :contentOffset="8">
    <lay-button type="primary">contentOffset: 8px</lay-button>
    <template #content>
      <lay-dropdown-menu>
        <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
        <lay-dropdown-menu-item>选项二</lay-dropdown-menu-item>
        <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
      </lay-dropdown-menu> 
    </template>
  </lay-dropdown>
      &nbsp;&nbsp;
  <lay-dropdown placement="bottom-left" :autoFixPosition="true" :clickOutsideToClose="false">
    <lay-button type="primary" :size="btnSize">autoFixPosition</lay-button>
    <template #content>
      <lay-dropdown-menu>
        <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
        <lay-dropdown-menu-item>选项二111111111</lay-dropdown-menu-item>
        <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
      </lay-dropdown-menu> 
    </template>
  </lay-dropdown>
  &nbsp;&nbsp;
  <lay-button  @click="toogleSize">切换左边按钮</lay-button>
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

::: title Dropdown 属性
:::

::: table

| 属性    | 描述     | 可选值          |
| ------- | -------- | --------------- |
| trigger | 触发方式 | `click` `hover` `contextMenu` |
| disabled | 是否禁用触发 | `true` `false` |
| placement | 下拉面板位置 |`top` `top-left` `top-right` `bottom` `bottom-left` `bottom-right`|
| autoFitPosition| 是否自动调整下拉面板位置，默认 `true` | `true` `false` | 
| autoFitWidth | 是否将下拉面板宽度设置为触发器宽度, 默认 `false` | `true` `false` |
| autoFitMinWidth | 是否将下拉面板最小宽度设置为触发器宽度, 默认 `true` | `true` `false` |
| updateAtScroll | 是否在容器滚动时更新下拉面板的位置,默认 `false` | `true` `false` |
| autoFixPosition | 是否在触发器或下拉面板尺寸变化时更新下拉面板位置,面板尺寸变化参见级联选择器,默认 `true` | `true` `false` |
| clickOutsideToClose| 是否点击外部关闭下拉面板,默认 `true`| `true` `false`|
| contentOffset | 下拉面板距离触发器的偏移距离，默认 2| -| 


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
| hide | 隐藏下拉内容后触发 | --     |
| open | 显示下拉内容后触发 | --     |

:::


::: contributor dropdown
:::

::: previousNext dropdown
:::