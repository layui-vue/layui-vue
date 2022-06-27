::: anchor
:::

::: title 基本介绍
:::

::: describe 使用锚点，可以将内容固定在容器内，并且不随容器的滚动而滚动，常用于侧边菜单导航等。
:::

::: title 基础使用
:::

::: demo 使用 `lay-affix` 标签, 创建锚点，`target` 属性用于需要监听其滚动事件的元素，默认为 `document.body` ,`top`设置距离容器顶部偏移量
<template>
  <div style="width:100%;height:200px">
    <lay-affix :target="target" :top="0" v-if="target">
      <lay-button type="normal">固定在最顶部</lay-button>
    </lay-affix>
    <lay-affix :target="target" :top="38" v-if="target" style="margin-left:150px;">
      <lay-button type="normal">固定在距离顶部38px</lay-button>
    </lay-affix>
    <lay-affix :target="target" :top="76" v-if="target" style="margin-left:350px">
      <lay-button type="normal">固定在距离顶部76px</lay-button>
    </lay-affix>
    <lay-affix :target="target" :top="114" v-if="target" style="margin-left:550px">
      <lay-button type="normal">固定在距离顶部114px</lay-button>
    </lay-affix>
    <lay-affix :target="target" :top="152" v-if="target" style="margin-left:750px">
      <lay-button type="normal">固定在距离顶部152px</lay-button>
    </lay-affix>
  </div>
</template>

<script setup>
  import { nextTick,ref } from 'vue'
  const target=ref()
  nextTick(()=>{
    target.value=document.querySelector(".layui-body");
  })
</script>
:::

::: title 固定在最底部
:::

::: demo 使用 `bottom` 属性, 设置距离容器底部偏移量
<template>
  <div style="width:100%;height:100px">
    <lay-affix :target="target" :bottom="0" v-if="target">
      <lay-button type="normal">固定在最底部</lay-button>
    </lay-affix>
  </div>
</template>

<script setup>
  import { nextTick,ref } from 'vue'
  const target=ref()
  nextTick(()=>{
    target.value=document.querySelector(".layui-body");
  })
</script>
:::




::: title Aiffx 属性
:::

::: table

| 属性   | 描述 | 可选值         |
| ------ | ---- | -------------- |
| top    | 顶部偏移量 : number | 0             |
| bottom | 底部偏移量 : number，优先级大于`top` | - |
| target | 指定参考容器 : HTMLElement | 默认`document.body`,请务必确保能够正确获取到dom|

:::

::: contributor affix
:::

::: previousNext affix
:::
