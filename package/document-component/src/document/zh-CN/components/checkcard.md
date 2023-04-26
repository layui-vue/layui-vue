::: anchor
:::

::: title 基本介绍
:::

::: describe 最常用的选项卡示例，包括`头像`，`标题`，`描述`等部分，可被选择。
:::

::: title 基础使用
:::

::: demo 使用 `lay-check-card` 标签, 创建卡片组件

<template>
  <lay-check-card
    @click="handleClick"
    avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
    title="标题"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  >
  </lay-check-card>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const handleClick = (value) =>  {
      // console.log(value);
    }
    return {
      handleClick
    }
  }
}
</script>

:::

::: title 自定义尺寸
:::

::: describe 当然你也可以通过 `style` 或者 `class` 自定义卡片大小。
:::

::: demo



<template>
 <lay-check-card
    style="width: 200px; height: 200px;"
    title="title"
    description="This is the description"
  >
  </lay-check-card>
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

::: title 组合样式
:::

::: describe 头像，标题，描述区域可以自由组合或者单独呈现，组件会为你调整为最合适的对齐方式。
:::

::: demo

<template>
  <h4>只有图片时</h4>
  <lay-check-card
    avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png">
  </lay-check-card>
  <h4>只有图片和描述时</h4>
  <lay-check-card
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png">
  </lay-check-card>
  <h4>只有描述和标题时</h4>
  <lay-check-card
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    title="示例">
  </lay-check-card>
  <h4>只有标题和图片</h4>
  <lay-check-card
    avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
    title="示例">
  </lay-check-card>
  <h4>只有标题时</h4>
  <lay-check-card
    title="示例">
  </lay-check-card>  
  <h4>只有描述时</h4>
  <lay-check-card
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-check-card>  
</template>


:::

::: title 自定义图像
:::

::: describe 你可以通过 `avatar` 插槽自定义头像区域。
::: 

::: demo

<template>
 <lay-check-card
    title="示例">
    <template #avatar>
        <lay-icon type="layui-icon-face-smile" color="#009688"  size="24px"></lay-icon>
    </template>
  </lay-check-card>  
</template>


:::

::: title 自定义标题
:::

::: describe 你可以通过 `avatar` 插槽自定义标题。
:::

::: demo 

<template>
<lay-check-card
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  >
    <template #title>
      <lay-icon type="layui-icon-face-smile" color="#009688"></lay-icon>
      <span style="margin-left: 10px; margin-right: 10px;">示例</span>
      <lay-tag type="primary" size="sm">标签</lay-tag>
    </template>
  </lay-check-card>
  <lay-check-card
    title="标题内容过长会自动进行省略，标题内容过长会自动进行省略"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  >
  </lay-check-card>
</template>

:::


::: title 自定义描述
:::

::: describe  你可以通过 `description` 插槽自定义标题区域。
:::

::: demo 

<template>
<lay-check-card
    avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
    title="标题">
    <template #description>
      选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。
      <a style="color: var(--global-primary-color)">查看详情</a>
    </template>
  </lay-check-card>
</template>


:::

::: title 默认选中
:::

::: describe  通过配置 `defaultChecked` 属性为 `true` 来配置选项默认被选中。
:::

::: demo 

<template>
  <lay-check-card
    defaultChecked
    avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
    title="标题">
  </lay-check-card>
</template>

:::


::: title 操作栏
:::

::: describe  配置 `extra` 插槽为卡片添加操作栏。
:::

::: demo 
<template>
  <lay-check-card
    defaultChecked
    avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
    title="标题">
     <template #extra>
     <lay-dropdown placement="top"  updateAtScroll>
        <lay-icon type="layui-icon-more" @click.stop></lay-icon>
        <template #content>
            <lay-dropdown-menu>
              <lay-dropdown-menu-item>选项一</lay-dropdown-menu-item>
              <lay-dropdown-menu-item>选项二</lay-dropdown-menu-item>
              <lay-dropdown-menu-item>选项三</lay-dropdown-menu-item>
            </lay-dropdown-menu>
        </template>
      </lay-dropdown>
    </template>
  </lay-check-card>
</template>

:::


::: title 纯图片选项
:::

::: describe  通过仅仅配置 `cover` 属性或者  `cover` 插槽 可以让你的选项成为一个纯图片选项。
:::

::: demo 
<template>
  <lay-check-card>
     <template #cover>
      <img src="https://gw.alipayobjects.com/mdn/rms_66ee3f/afts/img/A*FyH5TY53zSwAAAAAAAAAAABkARQnAQ"/>
    </template>
  </lay-check-card>
   <lay-check-card
   cover="https://gw.alipayobjects.com/mdn/rms_66ee3f/afts/img/A*FyH5TY53zSwAAAAAAAAAAABkARQnAQ">
  </lay-check-card>
</template>

:::


::: title 选项不可用

:::

::: describe  通过配置 `disabled` 属性配置选项不可用。

:::

::: demo 
<template>
 <lay-check-card
    avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
    title="标题"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  >
  </lay-check-card>
   <lay-check-card
    disabled
    avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
    title="标题"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  >
  </lay-check-card>
  <lay-check-card
    defaultChecked
    disabled
    avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
    title="标题"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  >
  </lay-check-card>
  <h4>整体不可用</h4>
   <lay-check-card-group disabled v-model="checked1">
    <lay-check-card
      value="1"
      avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-check-card>
   <lay-check-card
      value="4"
      avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-check-card>
  <lay-check-card
      disabled
      avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-check-card>
  </lay-check-card-group>
</template>

<script>
import { ref } from 'vue'
const checked1 = ref(['1', '2', '3'])

export default {
  setup() {
    return {
      checked1
    }
  }
}
</script>

:::

::: title 分组

:::

::: describe  `lay-check-card-group`与`lay-check-card`搭配使用。

:::

::: demo 

<template>
  <lay-check-card-group v-model="checked1" @change="groupChange">
    <lay-check-card
      value="1"
      avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-check-card>
   <lay-check-card
      value="4"
      avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-check-card>
  <lay-check-card
      disabled
      avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-check-card>
  </lay-check-card-group>
</template>

<script>
import { ref } from 'vue'
const checked1 = ref(['1', '2', '3'])

export default {
  setup() {
    const groupChange = (val) => {
      // console.log(val, 'val', 112)
    }
    return {
      checked1,
      groupChange
    }
  }
}
</script>

:::


::: title 布局

:::

::: describe  搭配栅格进行灵活布局。

:::

::: demo 

<template>
  <lay-check-card-group v-model="checked1" @change="groupChange">
  <lay-row>
   <lay-col md="8">
    <lay-check-card
      avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-check-card>
  </lay-col>
   <lay-col md="8">
   <lay-check-card
      avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-check-card>
  </lay-col>
   <lay-col md="8">
  <lay-check-card
      avatar="http://www.layui-vue.com/assets/logo-png.a3bc5caf.png"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-check-card>
  </lay-col>
  </lay-row>
  </lay-check-card-group>
</template>

<script>
import { ref } from 'vue'
const checked1 = ref(['1', '2', '3'])

export default {
  setup() {
    const groupChange = (val) => {
      // console.log(val, 'val', 112)
    }
    return {
      checked1,
      groupChange
    }
  }
}
</script>

:::

::: title CheckCard 属性
:::

::: table

| 名称   | 描述 | 类型     | 默认值   | 可选值                   |
| ------ | ---- | -------- | -------- | ------------------------ |
| title  | 标题 | `string` | --       | --                       |
| description | 描述 | `string` | -- | -- |
| avatar | 图片 | `string` | -- | -- |
| defaultChecked | 默认选中 | `boolean` | false | -- |
| disabled | 是否禁用	 | `boolean` | false | -- |
| extra | 拓展区域	 | `操作区域` | -- | -- |
| cover | 背景图片, 使用该属性时, `title`、`description`、`avater`失效	 | -- | -- | -- |

:::

::: title CheckCardGroup 属性
:::

::: table

| 名称   | 描述 | 类型     | 默认值   | 可选值                   |
| ------ | ---- | -------- | -------- | ------------------------ |
| disabled | 是否禁用	 | `boolean` | false | -- |
| change | 拓展区域	 | `操作区域` | -- | -- |
| v-model | 默认勾选	 | -- | -- | -- |

:::



::: title CheckCard 插槽
:::

::: table

| 名称    | 描述     |
| ------- | -------- |
| title | 标题插槽 | 
| description  | 描述插槽 |
| avatar    | 图片插槽 |
| extra   | 扩展插槽 |
| cover  | 背景图片插槽 |


:::

::: contributor card
:::

::: previousNext card
:::
