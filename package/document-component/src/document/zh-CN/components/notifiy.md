::: anchor
:::

::: title 基本介绍
:::

::: describe 全局展示通知提醒信息。
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-row :space="30" >
    <lay-col :span="24">
      <lay-button type="primary" @click="baseNotifiy">右上位置</lay-button>
    </lay-col>
  </lay-row>
</template>

<script>
import { layer } from  "@layui/layer-vue"

const baseNotifiy = function() {
    layer.notifiy({
      title:"这是标题",
      time: 2000,
      content:"默认就是右上，也是用得最多的"
    })
}
</script>

:::

::: title 不同位置
:::

::: demo

<template>
  <lay-row :space="30" >
    <lay-col :span="24">
      <lay-button type="primary" @click="baseNotifiyRT">右上位置</lay-button>
      <lay-button type="primary" @click="baseNotifiyRB">右下位置</lay-button>
      <lay-button type="primary" @click="baseNotifiyLT">左上位置</lay-button>
      <lay-button type="primary" @click="baseNotifiyLB">左下位置</lay-button>
    </lay-col>
  </lay-row>
</template>

<script>
import { layer } from  "@layui/layer-vue"

const baseNotifiyRT = function() {
    layer.notifiy({
      title:"这是标题",
      content:"默认就是右上，也是用得最多的"
    })
}
const baseNotifiyRB = function() {
    layer.notifiy({
      title:"这是标题",
      content:"我出现在右下",
      offset:'rb',
    })
}
const baseNotifiyLT = function() {
    layer.notifiy({
      title:"这是标题",
      content:"我出现在左上",
      offset:'lt',
    })
}
const baseNotifiyLB = function() {
    layer.notifiy({
      title:"这是标题",
      content:"我出现在左下",
      offset:'lb',
    })
}
</script>

:::

::: title 指定图标
:::

::: demo

<template>
  <lay-row :space="30" >
    <lay-col :span="24">
      <lay-button type="primary" @click="NotifiySuccess">成功通知</lay-button>
      <lay-button type="primary" @click="NotifiyFailure">失败通知</lay-button>
      <lay-button type="primary" @click="NotifiyWarm">警告通知</lay-button>
      <lay-button type="primary" @click="NotifiyInfo">锁定通知</lay-button>
    </lay-col>
  </lay-row>
</template>

<script>
import { layer } from  "@layui/layer-vue"

const NotifiySuccess=function(){
    layer.notifiy({
      title:"Success",
      content:"默认就是右上，也是用得最多的",
      icon:1
    })
}
const NotifiyFailure=function(){
    layer.notifiy({
      title:"Error",
      content:"默认就是右上，也是用得最多的",
      icon:2
    })
}
const NotifiyWarm=function(){
    layer.notifiy({
      title:"Warming",
      content:"默认就是右上，也是用得最多的",
      icon:3
    })
}
const NotifiyInfo=function(){
    layer.notifiy({
      title:"Question",
      content:"默认就是右上，也是用得最多的",
      icon:4
    })
}
</script>

:::

::: title 组件方法
:::

```
layer.notifiy(options)
```

::: title 组件属性
:::

::: table

| 属性                | 描述   | 备注 |
| ------------------- | ------ | ----|
| options | 选配属性 | { time: 加载时长, icon: 图标 }   |

:::

::: contributor msg
:::  

::: previousNext msg
:::