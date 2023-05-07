::: anchor
:::

::: title 基本介绍
:::

::: describe 最常用的选项卡示例，包括 <code>头像</code> <code>标题</code> <code>描述</code> 等部分，可被选择。
:::

::: title 基础使用
:::

::: demo 使用 `lay-checkcard` 标签, 创建卡片组件。头像，标题，描述区域可以自由组合或者单独呈现，组件会为你调整为最合适的对齐方式。

<template>
  <lay-checkcard
    title="标题"
    avatar="http://www.layui-vue.com/assets/logo.a3fad609.jpg"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    defaultChecked
    @click="handleClick"
  >
  </lay-checkcard>
  <lay-checkcard
    title="标题"
    avatar="http://www.layui-vue.com/assets/logo.a3fad609.jpg"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    @click="handleClick"
  >
  </lay-checkcard>
  <lay-checkcard
    title="标题"
    avatar="http://www.layui-vue.com/assets/logo.a3fad609.jpg"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    @click="handleClick"
  >
  </lay-checkcard>
</template>

<script setup>
import { ref } from 'vue'

const handleClick = (value) =>  {
  console.log(value);
}
</script>

:::

::: title 图片选项
:::

::: demo 通过配置 `cover` 或  `cover` 插槽, 可以让你的卡片成为一个图片选项。
<template>
  <lay-checkcard>
     <template #cover>
      <img src="https://gw.alipayobjects.com/mdn/rms_66ee3f/afts/img/A*FyH5TY53zSwAAAAAAAAAAABkARQnAQ"/>
    </template>
  </lay-checkcard>
   <lay-checkcard
   cover="https://gw.alipayobjects.com/mdn/rms_66ee3f/afts/img/A*FyH5TY53zSwAAAAAAAAAAABkARQnAQ">
  </lay-checkcard>
</template>

:::


::: title 禁用选择
:::

::: demo 通过 `disabled` 属性配置选项不可用。
<template>
 <lay-checkcard
    avatar="http://www.layui-vue.com/assets/logo.a3fad609.jpg"
    title="标题"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  >
  </lay-checkcard>
  <lay-checkcard
    disabled
    avatar="http://www.layui-vue.com/assets/logo.a3fad609.jpg"
    title="标题"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  >
  </lay-checkcard>
  <lay-checkcard
    defaultChecked
    disabled
    avatar="http://www.layui-vue.com/assets/logo.a3fad609.jpg"
    title="标题"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
  >
  </lay-checkcard>
  <br/>
  <lay-checkcard-group disabled v-model="checked1">
    <lay-checkcard
      value="1"
      avatar="http://www.layui-vue.com/assets/logo.a3fad609.jpg"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
    </lay-checkcard>
    <lay-checkcard
      value="4"
      avatar="http://www.layui-vue.com/assets/logo.a3fad609.jpg"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
    </lay-checkcard>
    <lay-checkcard
      disabled
      avatar="http://www.layui-vue.com/assets/logo.a3fad609.jpg"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
    </lay-checkcard>
  </lay-checkcard-group>
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

::: title 卡片分组
:::

::: demo 使用 `lay-checkcard-group` 与 `lay-checkcard` 标签搭配。

<template>
  <lay-checkcard-group v-model="checked1" @change="groupChange">
    <lay-checkcard
      value="1"
      avatar="http://www.layui-vue.com/assets/logo.a3fad609.jpg"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-checkcard>
   <lay-checkcard
      value="4"
      avatar="http://www.layui-vue.com/assets/logo.a3fad609.jpg"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-checkcard>
  <lay-checkcard
      disabled
      avatar="http://www.layui-vue.com/assets/logo.a3fad609.jpg"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-checkcard>
  </lay-checkcard-group>
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
| cover | 背景图片	 | -- | -- | -- |

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

::: title CheckCardGroup 属性
:::

::: table

| 名称    | 描述 | 类型     | 默认值   | 可选值                   |
| ------  | ---- | -------- | -------- | ------------------------ |
| disabled | 是否禁用	 | `boolean` | false | -- |
| change  | 拓展区域	 | `操作区域` | -- | -- |
| v-model | 默认勾选	 | -- | -- | -- |

:::

::: title CheckCardGroup 事件
:::

::: table

| 名称   | 描述      | 参数      |
| ------ | -------- | --------  | 
| change | 选择变更	 | val       | 

:::

::: previousNext card
:::
