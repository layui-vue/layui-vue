::: anchor
:::

::: title 基本介绍
:::

::: describe 使用锚点，可以将内容固定在容器内，并且不随容器的滚动而滚动，常用于侧边菜单导航等。
:::

::: title 基础使用
:::

::: demo 使用 `lay-affix` 标签, 创建锚点，`target` 属性用于需要监听其滚动事件的元素，默认为 `document.body` ,`offset`设置距离容器的偏移量
<template>
  <div style="width:100%;height:200px">
    <lay-affix :target="target" v-if="target">
      <lay-button type="normal">固定在最顶部</lay-button>
    </lay-affix>
    <lay-affix :target="target" :offset="38" v-if="target" style="margin-left:150px;">
      <lay-button type="normal">固定在距离顶部38px</lay-button>
    </lay-affix>
    <lay-affix :target="target" :offset="76" v-if="target" style="margin-left:350px">
      <lay-button type="normal">固定在距离顶部76px</lay-button>
    </lay-affix>
    <lay-affix :target="target" :offset="114" v-if="target" style="margin-left:550px">
      <lay-button type="normal">固定在距离顶部114px</lay-button>
    </lay-affix>
    <lay-affix :target="target" :offset="152" v-if="target" style="margin-left:750px">
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
  const color=ref(0)
  const scroll=(e)=>{
    color.value=e.offset*2
  }
</script>
:::

::: title 固定在最底部
:::

::: demo 使用 `position` 属性, 改变定位属性，默认为 `top`,可选值 `bottom`
<template>
  <div style="width:100%;height:100px">
    <lay-affix :target="target" :offset="0" position="bottom" v-if="target">
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

| 属性      | 描述                     | 可选值                                     |
| ------   | ---------------------    | ---------------------------------------   |
| position | 定位属性 : string         | `top` `bottom`                            |
| offset   | 偏移量 : number,默认为0    | -                                         |
| target   | 指定参考容器 : HTMLElement | 默认`document.body`,请务必确保能够正确获取到dom|

:::

::: title Aiffx 事件
:::

::: table

| 属性      | 描述                    | 回调参数                                     |
| ------   | ---------------------   | ---------------------------------------   |
| scroll   | 初始化完成与滚动时触发的回调，回调会返回一个object<br><br>`{targetScroll:string,affixed:boolean,offset:number}` |<br/>`targetScroll` 容器滚动距离<br/><br/>`affixed` 是否处于fixed状态<br/><br/>`offset` 与原本位置的距离 <br>&nbsp; |

:::

::: contributor affix
:::

::: previousNext affix
:::
