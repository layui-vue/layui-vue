::: title 基础使用

###### 回到顶部组件的默认样式，通过滑动来查看页面右下角的按钮。

:::
::: demo

<template>
  <lay-backtop target=".layui-body"></lay-backtop>
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

:::title 自定义

###### 回到顶部组件可自定义样式，限制宽高：50px \* 50px，<code>showHeight = 0</code> 将始终显示，<code>disabled</code> 属性可以禁用返回顶部效果。查看页面右下角的圆形按钮。

::: demo

<template>
  <lay-backtop target=".layui-body" :showHeight="0" :bottom="100"  @click="handlerClick" disabled style="background-color:#FFFFFF">
    <div style="
        width:50px;
        height:50px;
        background-color: #5FB878;
        color: #FFFFFF;
        text-align: center;
        border-radius:50%">
        <lay-icon type="layui-icon-dialogue" size="30px"></lay-icon>
    </div>
  </lay-backtop>
</template>

<script>
import { ref } from 'vue'
import { layer } from "../../../../src/index.ts"

export default {
  setup() {
    const handlerClick = () => {
      layer.confirm("layui-vue 1.0.0 已经发布");
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
<!-- 需要用一个 div 包裹滚动容器和 Lay-backtop 组件 -->
<div style="width:700px; height:300px;">
  <div id="scrollContainer" style="overflow-y:auto; overflow-x:auto; width:700px; height:300px;">
    <p v-for="(n,index) in 50" :key="n" style="height:40px;border-bottom:0.5px solid #5FB878;margin-bottom:10px;line-height:40px">
      {{index + ". &nbsp;layui-vue , 基 于 vue 3.0 的 桌 面 端 组 件 库 , layui 的 另 一 种 呈 现 方 式"}}
    </p>
  </div>
  <lay-backtop target="#scrollContainer" :showHeight="100" :bottom="30" position="absolute"></lay-backtop>
</div>
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

::: title 结合 tooltip 组件使用

###### 可以和 lay-tooltip 组件搭配使用

:::
::: demo

<template>
<!-- 需要用一个 div 包裹滚动容器和 Lay-backtop 组件 -->
<div style="width:700px; height:300px;">
  <div id="scrollContainer2" style="overflow-y:auto; overflow-x:auto; width:700px; height:300px;">
    <p v-for="(n,index) in 50" :key="n" style="height:40px;border-bottom:0.5px solid #5FB878;margin-bottom:10px;line-height:40px">
      {{index + ". &nbsp;layui-vue , 基 于 vue 3.0 的 桌 面 端 组 件 库 , layui 的 另 一 种 呈 现 方 式"}}
    </p>
  </div>
  <lay-tooltip content="backtop" position="left">
    <lay-backtop target="#scrollContainer2" :showHeight="100" :bottom="30" position="absolute" style="border-radius: 50%;background-color: #5FB878;"></lay-backtop>
  </lay-tooltip>
</div>
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

::: title 属性
:::

::: table

| 属性       | 说明                                                 | 类型    | 可选值                   |
| ---------- | --------------------------------------------------- | ------- | ------------------------ |
| target     | 可选，触发滚动的对象                                | string  | 元素选择器 \| window(默认) |
| showHeight | 可选，滚动高度达到该值后显示回到顶部按钮             | number  | 200(默认)                |
| position   | 可选，定位方式，特定容器内部需设置为 absolute        | string  | absolute \| fixed(默认)  |
| right      | 可选，按钮距离页面右边距，单位 px                   | number  | 30(默认)                 |
| bottom     | 可选，按钮距离页面底部位置，单位 px                 | number  | 40(默认)                 |
| bgcolor    | 可选，背景颜色                                     | string  | \#9F9F9F(默认)           |
| disabled   | 可选，禁用点击返回顶部                             | boolean | true \| false(默认)      |

:::

::: title 事件
:::

::: table

| 事件名 | 说明                      | 回调参数 |
| ------ | ------------------------- | -------- |
| click  | 点击回到顶部按钮的回调函数 | event    |

:::

::: title 插槽
:::

::: table

| 插槽名 | 说明              |
| ------ | ------------------ |
| —      | 自定义内容 |

:::
