::: title 基础使用

###### 回到顶部组件的默认样式，通过滑动来查看页面右下角的正方形按钮。

:::
::: demo

<template>
  <lay-backtop target=".layui-body"></lay-backtop>
</template>

:::

:::title 自定义

###### 回到顶部组件可自定义样式，限制宽高：50px \* 50px，<code>showHeight = 0</code> 将始终显示，<code>disabled</code> 属性禁用返回顶部。查看页面右下角的圆形按钮。

::: demo

<!-- 使用默认插槽自定义组件内容,也可以使用组件提供的样式属性快速定义常用样式，样式属性能满足大多数场景,lay-backtop组件可搭配 lay-tooltip 组件使用-->
<template>
  <!-- 使用默认插槽自定义 -->
  <lay-tooltip content="插槽自定义 backtop " position="left">
    <lay-backtop @click="handlerClick" target=".layui-body" :showHeight="0" :bottom="160" bgcolor="#5FB878" circular disabled>
      <lay-icon type="layui-icon-dialogue" size="30px"></lay-icon>
    </lay-backtop>
  </lay-tooltip>
  <!-- 使用样式属性自定义 -->
  <lay-tooltip content="属性自定义 backtop " position="left">
    <lay-backtop target=".layui-body" :bottom="100" bgcolor="#5FB878" icon="layui-icon-up" circular>
    </lay-backtop>
  </lay-tooltip>  
</template>

<script>
import { ref } from 'vue'
import { layer } from "../../../../src/index.ts"

export default {
  setup() {
    const handlerClick = () => {
      layer.msg("layui-vue", { time: 1000 });
    }
    
    return {
      handlerClick,
    }
  }
}
</script>

:::

::: title 滚动容器

###### 通过设置 <code>target</code> 和 <code>position="absolute"</code>参数 ，可对特定容器进行返回顶部操作

:::
::: demo

<template>
<!-- 需要用一个 div 包裹触发滚动事件的目标元素和 lay-backtop 组件 -->
<div class="scrollContainer" style="width:700px; height:300px;">
  <div id="scrollContent" style="overflow-y:auto; overflow-x:auto; width:700px; height:300px;">
    <p v-for="(n,index) in 50" :key="n" style="height:32px;border-bottom:0.5px solid #5FB878;margin-bottom:10px;line-height:35px">
      {{index + ". &nbsp;layui-vue , 基 于 vue 3.0 的 桌 面 端 组 件 库 , layui 的 另 一 种 呈 现 方 式"}}
    </p>
  </div>
  <lay-backtop target="#scrollContent" :showHeight="100" :bottom="30" position="absolute"></lay-backtop>
</div>
</template>

<script>
</script>

:::

::: title 属性
:::

::: table

| 属性                      | 说明                                          | 类型    | 可选值                     |
| ------------------------- | --------------------------------------------- | ------- | -------------------------- |
| <strong>通用属性</strong> |
| target                    | 可选，触发滚动事件的对象                      | string  | CSS 选择器 \| window(默认) |
| showHeight                | 可选，滚动高度达到该值后显示回到顶部按钮       | number  | 200(默认)                  |
| disabled                  | 可选，禁用点击返回顶部                        | boolean | true \| false(默认)        |
| <strong>组件样式</strong> |
| position                  | 可选，定位方式，特定容器内部需设置为 absolute  | string  | absolute \| fixed(默认)    |
| right                     | 可选，按钮距离页面右边距，单位 px              | number  | 30(默认)                   |
| bottom                    | 可选，按钮距离页面底部位置，单位 px            | number  | 40(默认)                   |
| bgcolor                   | 可选，背景颜色                                | string  | \#9F9F9F(默认)             |
| opacity                   | 可选，不透明度                                | number  | 0.0-1.0                    |
| color                     | 可选，前景颜色                                | string  | #FFFFFF                    |
| borderRadius              | 可选，添加圆角                                | string  | 2px(默认)                  |
| circular                  | 可选, 使用圆形按钮                            | boolean | true \| false(默认)
| <strong>图标样式</strong> |
| icon                      | 可选,图标类型                                 | string  | layui-icon-top(默认)       |
| iconSize                  | 可选,图标大小                                 | number  | 30                         |
| iconPrefix                | 可选,图标前缀 layui-icon layui-icon-top       | string  | layui-icon(默认)           |
| iconColor                 | 可选,图标颜色                                 | string  | #FFFFFF(默认)              |

:::

::: title 事件
:::

::: table

| 事件名 | 说明                       | 回调参数 |
| ------ | -------------------------- | -------- |
| click  | 点击回到顶部按钮的回调函数  | event    |

:::

::: title 插槽
:::

::: table

| 插槽名 | 说明       |
| ------ | ---------- |
| —      | 自定义内容 |

:::
