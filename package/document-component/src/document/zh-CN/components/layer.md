::: anchor
:::

::: title 基本介绍
:::

::: describe 集众多弹层功能为一体，灵活而多样，是许多开发者的网页弹出层的首选交互方案，在各类业务场景都能发挥重要作用。
:::

::: title 综合演示
:::

::: demo 通过 layer.msg 方法, 创建一个提示框。

<template>
    <lay-button type="primary" @click="openMsg">普通消息</lay-button>
    <lay-button type="primary" @click="openSuccess">成功消息</lay-button>
    <lay-button type="primary" @click="openLoad">全局加载</lay-button>
    <lay-button type="primary" @click="openConfirm">确认框</lay-button>
    <lay-button type="primary" @click="openPage">模态框</lay-button>
    <lay-button type="primary" @click="openIframe">Iframe 层</lay-button>
    <lay-button type="primary" @click="openDrawer">抽屉</lay-button>
    <lay-button type="primary" @click="openNotifiy">通知</lay-button>
    <lay-button type="primary" @click="openPhotos">相册</lay-button>
</template>

<script>
import { layer } from "@layui/layui-vue"

const openMsg = function() {
    layer.msg("普通消息", { time: 1000 })
}

const openSuccess = function() {
    layer.msg("成功消息", { time: 1000, icon: 1 })
}

const openConfirm = function() {
    layer.confirm("layui-vue 1.0.0 已经发布")
}

const openLoad = function() {
    layer.load(0, { time: 1000 })
}

const openIframe = function() {
    layer.open({
        type: "iframe",
        title: "远程页面",
        area: ['90%','90%'],
        content: "http://www.layui-vue.com"
    })
}

const openNotifiy = function() {
    layer.notifiy({
      title:"标题",
      content:"默认就是右上，也是用得最多的"
    })
}

const openPhotos = function() {
    layer.photos({
      imgList:[
            {
                src:'http://www.layui-vue.com/assets/logo.a3fad609.jpg',
                alt:'layui.png'
            }
        ]
    })
}

 const openDrawer = function() {
    layer.drawer({
        title: "标题",
        content: "内容"
    })
}
</script>

:::

::: title 独立使用
:::

::: describe 若你希望使用 `layer-vue` 搭配其他组件库，仅仅需要安装 `@layui/layer-vue` 包。
:::

```
npm install @layui/layer-vue
```

::: describe 若在 `layui-vue` 的集成环境使用，可忽略安装步骤。
:::

```js
import { createApp } from 'vue';
import App from './App';
import layer from '@layui/layer-vue';
import '@layui/layer-vue/lib/index.css';

const app = createApp(App);
app.use(layer);
app.mount('#app');
```

::: title 普通消息
:::

::: demo

<template>
    <lay-button type="primary" @click="openMsg1">成功消息</lay-button>
    <lay-button type="primary" @click="openMsg2">失败消息</lay-button>
    <lay-button type="primary" @click="openMsg3">警告消息</lay-button>
    <lay-button type="primary" @click="openMsg4">详情消息</lay-button>
    <lay-button type="primary" @click="openMsg5">哭脸消息</lay-button>
    <lay-button type="primary" @click="openMsg6">笑脸消息</lay-button>
    <lay-button type="primary" @click="openMsg7">警告消息</lay-button>
    <lay-button type="primary" @click="openMsg8">加载消息</lay-button>
</template>

<script setup>
const openMsg1 = function() {
    layer.msg("成功消息", { icon : 1, time: 1000})
}
const openMsg2 = function() {
    layer.msg("失败消息", { icon : 2, time: 1000})
}
const openMsg3 = function() {
    layer.msg("疑问消息", { icon : 3, time: 1000})
}
const openMsg4 = function() {
    layer.msg("详情消息", { icon : 4, time: 1000})
}
const openMsg5 = function() {
    layer.msg("哭脸图标", { icon : 5, time: 1000})
}
const openMsg6 = function() {
    layer.msg("笑脸图标", { icon : 6, time: 1000})
}
const openMsg7 = function() {
    layer.msg("警告图标", { icon : 7, time: 1000})
}
const openMsg8 = function() {
    layer.msg("加载消息", { icon : 16, time: 1000})
}
</script>

:::

::: title 确认框
:::

::: demo

<template>
    <lay-button type="primary" @click="openConfirm1">确认框（1）</lay-button>
    <lay-button type="primary" @click="openConfirm2">询问框（2）</lay-button>
</template>

<script>
import { layer } from "@layui/layui-vue"

const openConfirm1 = function() {
    layer.confirm("layui-vue 1.0.0 已经发布")
}

const openConfirm2 = function() {
    layer.confirm("你如何看待 layui-vue 的发布", 
        {
            btn: [
                {text:'站着看', callback: (id) => { layer.msg("站着看"); layer.close(id); }},
                {text:'坐着看', callback: (id) => { layer.msg("坐着看"); layer.close(id); }}
            ]
        }
    );
}
</script>

:::

::: title 通知消息 
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
    <lay-col :span="24">
      <lay-button type="primary" @click="NotifiySuccess">成功通知</lay-button>
      <lay-button type="primary" @click="NotifiyFailure">失败通知</lay-button>
      <lay-button type="primary" @click="NotifiyWarm">警告通知</lay-button>
      <lay-button type="primary" @click="NotifiyInfo">锁定通知</lay-button>
    </lay-col>
  </lay-row>
</template>

<script>
import { layer } from  "@layui/layui-vue"

const baseNotifiyRT = function() {
    layer.notifiy({
      title:"这是标题",
      content:"默认就是右上，也是用得最多的"
    })
}
const baseNotifiyRB = function() {
    layer.notifiy({
      title:"这是标题",
      content:"默认就是右上，也是用得最多的",
      offset:'rb',
    })
}
const baseNotifiyLT = function() {
    layer.notifiy({
      title:"这是标题",
      content:"默认就是右上，也是用得最多的",
      offset:'lt',
    })
}
const baseNotifiyLB = function() {
    layer.notifiy({
      title:"这是标题",
      content:"默认就是右上，也是用得最多的",
      offset:'lb',
    })
}
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

::: title 相册层
:::

::: demo
<template>
    <lay-button type="primary" @click="signleImg">查看图片</lay-button>
    <lay-button type="primary" @click="groupImg">查看相册</lay-button>
</template>

<script>
import { layer } from  "@layui/layui-vue"

const signleImg = function() {
    layer.photos({
      imgList:[{src:'http://www.pearadmin.com/assets/images/un2.svg',alt:'layer for vue'}]
    })
}

const groupImg = function() {
  layer.photos({
    imgList:[
      { src:'http://www.pearadmin.com/assets/images/un8.svg', alt:'图片1'},
      { src:'http://www.pearadmin.com/assets/images/un32.svg', alt:'图片2'}
    ]
  })
}
</script>
::: 

::: title 加载层
:::

::: demo
<template>
  <lay-button-container>
    <lay-button @click="loading0" type="primary">加载 (1)</lay-button>
    <lay-button @click="loading1" type="primary">加载 (2)</lay-button>
    <lay-button @click="loading2" type="primary">加载 (3)</lay-button>
  </lay-button-container>
</template>

<script setup>
import { layer } from "@layui/layui-vue"

const loading0 = function() {
    layer.load(0, {time: 3000})
}

const loading1 = function() {
    layer.load(1, {time: 3000})
}

const loading2 = function() {
    layer.load(2, {time: 3000})
}
</script>
:::

::: title 模态窗
:::

::: demo

<template>
    <lay-row :space="30" >
        <lay-col :span="24">
            <lay-button type="primary" @click="openBase">小试牛刀</lay-button>
            <lay-button type="primary" @click="openSize">指定尺寸</lay-button>
            <lay-button type="primary" @click="openOffset">指定位置</lay-button>
            <lay-button type="primary" @click="openIframe">远程窗体</lay-button>
            <lay-button type="primary" @click="openHtml">代码片段</lay-button>
        </lay-col>
        <lay-col :span="24">
            <lay-button type="primary" @click="openMaxmin">缩小放大</lay-button>
            <lay-button type="primary" @click="openResize">尺寸拉伸</lay-button>
            <lay-button type="primary" @click="openIndex">设置层级</lay-button>
            <lay-button type="primary" @click="openClose2">关闭主题</lay-button>
            <lay-button type="primary" @click="openAuto">自适应性</lay-button>
        </lay-col>
    </lay-row>
</template>

<script setup>
import { layer } from "@layui/layui-vue"

const openBase = function() {
    layer.open({
        type: 1,
        title: "标题",
        content: "内容"
    })    
}

const openSize = function() {
    layer.open({
        type: 1,
        title: "标题",
        area: ['400px','400px'],
        content: "内容"
    })     
}

const openOffset = function() {
    layer.open({
        type: 1,
        title: "标题",
        offset: ['100px','100px'],
        content: "内容"
    })
}

const openIframe = function() {
    layer.open({
        type: 2,
        title: "标题",
        resize: true,
        area: ['90%','90%'],
        content: "http://www.layui-vue.com"
    })
}

const openHtml = function() {
    layer.open({
        type: 1,
        title: "标题",
        isHtmlFragment: true,
        content: "<p style='color:red;'>内容</p>"
    })
}

const openMaxmin = function() {
    layer.open({
        type: 1,
        maxmin: true,
        title: "标题",
        content: "内容",
    })
}

const openResize = function() {
    layer.open({
        type: 1,
        title: "标题",
        resize: true,
        content: "内容"
    })    
}

const openIndex = function() {
    layer.open({
        type: 1,
        zIndex: 999,
        title: "标题",
        content: "设置层级"
    })
}

const openClose2 = function() {
    layer.open({
        type: 1,
        closeBtn: 2,
        title: "其他关闭",
        content: "内容"
    })    
}

const openAuto = function() {
    layer.open({
        type: 1,
        title: "标题",
        isHtmlFragment: true,
        content: "<img src='https://img2.baidu.com/it/u=3080567934,982100974&fm=253&fmt=auto&app=120&f=JPEG?w=1047&h=461' />"
    })    
}
</script>

:::

::: title 抽屉层
:::

::: demo
<template>
    <lay-button @click="openTopDrawer" type="primary">上</lay-button>
    <lay-button @click="openBottomDrawer" type="primary">下</lay-button>
    <lay-button @click="openLeftDrawer" type="primary">左</lay-button>
    <lay-button @click="openRightDrawer" type="primary">右</lay-button>
</template>

<script setup>
import { layer } from "@layui/layui-vue"

const openTopDrawer = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        offset: "t"
    })
}
const openBottomDrawer = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        offset: "b"
    })
}
const openLeftDrawer = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        offset: "l"
    })
}
const openRightDrawer = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        offset: "r"
    })
}
</script>
:::