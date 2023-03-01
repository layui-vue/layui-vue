<fieldset class="layui-elem-field layui-field-title">
    <legend>消息</legend>
</fieldset>

::: demo 通过 layer.msg(content, options) 创建消息窗, 第一个参数`msg`为消息内容, 第二参数`options`为可选配置, 常用于配置`time`超时时间等。

<template>
    <button @click="msg">普通消息</button>
    <button @click="success">成功消息</button>
    <button @click="failure">失败消息</button>
    <button @click="warm">警告消息</button>
    <button @click="info">锁定消息</button>
</template>

<script>
import { layer } from  "../../../../layer/src/index";

const msg = function() {
    layer.msg("普通消息", { time: 3000, id: "1"})
}

const success = function() {
    layer.msg("成功消息", { time: 3000, id: "1" ,icon: 1})
}

const failure = function() {
    layer.msg("失败消息", { time: 3000, icon: 2})
}

const warm = function() {
    layer.msg("警告消息", { time: 3000, icon: 3})
}

const info = function() {
    layer.msg("疑问消息", { time: 3000, icon: 4})
}
</script>

:::

<fieldset class="layui-elem-field layui-field-title">
    <legend>确认</legend>
</fieldset>

::: demo 通过 layer.confirm(msg, options) 创建确认框, 第一个参数`msg`为文本消息, 第二个参数`options`为选项配置, 你可以使用`options`的`btn`属性定义操作。

<template>
    <button @click="openConfirm1">确认框</button>
    <button @click="openConfirm2">询问框</button>
</template>

<script setup>
import { layer } from  "../../../../layer/src/index"

const openConfirm1 = function() {
    layer.confirm("layui-vue 1.0.0 已经发布")
}

const openConfirm2 = function() {
    layer.confirm("你如何看待 layui-vue 的发布", 
    {btn:
        [
            {text:'站着看', disabled: true, callback: function(id){layer.close(id);}},
            {text:'坐着看', callback: function(id){layer.close(id);}}
        ]
    })
}
</script>

:::

<fieldset class="layui-elem-field layui-field-title">
    <legend>加载</legend>
</fieldset>

::: demo 通过 layer.load(type, options) 创建加载层, 第一个参数`type`为加载动画样式, 第二个参数`options`为可选配置, 常用于设置`time`加载时长`shade`遮盖层等。

<template>
    <button @click="load1">加载1</button>
    <button @click="load2">加载2</button>
    <button @click="load3">加载3</button>
    <button @click="load4">加载4</button>
</template>

<script setup>
import { layer } from  "../../../../layer/src/index"

const load1 = function() {
    layer.load(0, {id:"1", time: 2000})
}

const load2 = function() {
    layer.load(1, {time: 2000})
}

const load3 = function() {
    layer.load(2, {time: 2000})
}

const load4 = function() {
    layer.msg("加载中...",{icon: 16, time: 2000})
}
</script>

:::

<fieldset class="layui-elem-field layui-field-title">
    <legend>模态</legend>
</fieldset>

::: demo 通过 layer.open(option) 创建模态窗, 目前支持`iframe` `page`等类型, 你可以使用`options`选项开启`Resize` `Offset`等更多特性。

<template>
    <lay-row :space="30" >
        <lay-col :span="24">
            <button @click="open">小试牛刀</button>
            <button @click="openSize">指定尺寸</button>
            <button @click="openOffset">指定位置</button>
            <button @click="openIframe">远程窗体</button>
            <button @click="openHtml">代码片段</button>
        </lay-col>
        <lay-col :span="24">
            <button @click="openVNode">虚拟节点</button>
            <button @click="openMaxmin">缩小放大</button>
            <button @click="openResize">尺寸拉伸</button>
            <button @click="openIndex">设置层级</button>
            <button @click="openClose2">关闭主题</button>
        </lay-col>
        <lay-col :span="24">
            <button @click="openAuto">自适应性</button>
        </lay-col>
    </lay-row>
</template>

<script setup>
import { layer } from  "../../../../layer/src/index"

const open = function() {
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
        area: ['500px','500px'],
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

const openVNode = function() {
    layer.open({
        type: 1,
        title: "标题",
        content: h('button', { style: 'margin: 10px;' },'按钮')
    })
}

const openMaxmin = function() {
    layer.open({
        type: 1,
        title: "标题",
        maxmin: true,
        content: "内容",
        full:(e)=>{console.log('full',e)},
        min:(e)=>{console.log('min',e)},
        restore:(e)=>{console.log('restore',e)}
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

<fieldset class="layui-elem-field layui-field-title">
    <legend>位置</legend>
</fieldset>

::: demo 通过 layer.drawer(options) 创建抽屉层, `options`选项配置, 抽屉本质上是一个特殊的模态窗, 你可以使用`offset`选项来设置方向。
<template>
    <button @click="openTop1">上</button>
    <button @click="openBottom1">下</button>
    <button @click="openLeft1">左</button>
    <button @click="openRight1">右</button>
    <button @click="openLeftTop1">左上</button>
    <button @click="openLeftBottom1">左下</button>
    <button @click="openRightTop1">右上</button>
    <button @click="openRightBottom1">右下</button>
    <button @click="openTopLeft1">上左</button>
    <button @click="openTopRight1">上右</button>
    <button @click="openBottomLeft1">下左</button>
    <button @click="openBottomRight1">下右</button>
</template>

<script setup>
import { layer } from  "../../../../layer/src/index"

const openTop1 = function() {
    layer.open({
        title: "标题",
        content: "内容",
        area: ["300px","300px"],
        offset: "t"
    })
}

const openBottom1 = function() {
    layer.open({
        title: "标题",
        content: "内容",
        area: ["300px","300px"],
        offset: "b"
    })
}

const openLeft1 = function() {
    layer.open({
        title: "标题",
        content: "内容",
        area: ["300px","300px"],
        offset: "l"
    })
}

const openRight1 = function() {
    layer.open({
        title: "标题",
        content: "内容",
        area: ["300px","300px"],
        offset: "r"
    })
}

const openLeftTop1 = function() {
    layer.open({
        title: "标题",
        content: "内容",
        area: ["300px","300px"],
        offset: "lt"
    })
}

const openLeftBottom1 = function() {
    layer.open({
        title: "标题",
        content: "内容",
        area: ["300px","300px"],
        offset: "lb"
    })
}

const openRightTop1 = function() {
    layer.open({
        title: "标题",
        content: "内容",
        area: ["300px","300px"],
        offset: "rt"
    })
}

const openRightBottom1 = function() {
    layer.open({
        title: "标题",
        content: "内容",
        area: ["300px","300px"],
        offset: "rb"
    })
}

const openTopLeft1 = function() {
    layer.open({
        title: "标题",
        content: "内容",
        area: ["300px","300px"],
        offset: "tl"
    })
}

const openTopRight1 = function() {
    layer.open({
        title: "标题",
        content: "内容",
        area: ["300px","300px"],
        offset: "tr"
    })
}

const openBottomLeft1 = function() {
    layer.open({
        title: "标题",
        content: "内容",
        area: ["300px","300px"],
        offset: "bl"
    })
}

const openBottomRight1 = function() {
    layer.open({
        title: "标题",
        content: "内容",
        area: ["300px","300px"],
        offset: "br"
    })
}
</script>
:::

<fieldset class="layui-elem-field layui-field-title">
    <legend>抽屉</legend>
</fieldset>

::: demo 通过 layer.drawer(options) 创建抽屉层, `options`选项配置, 抽屉本质上是一个特殊的模态窗, 你可以使用`offset`选项来设置方向。
<template>
    <button @click="openTop">上</button>
    <button @click="openBottom">下</button>
    <button @click="openLeft">左</button>
    <button @click="openRight">右</button>
    <button @click="openLeftTop">左上</button>
    <button @click="openLeftBottom">左下</button>
    <button @click="openRightTop">右上</button>
    <button @click="openRightBottom">右下</button>
    <button @click="openTopLeft">上左</button>
    <button @click="openTopRight">上右</button>
    <button @click="openBottomLeft">下左</button>
    <button @click="openBottomRight">下右</button>
</template>

<script setup>
import { layer } from  "../../../../layer/src/index"

const openTop = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        area: ["100%","300px"],
        offset: "t"
    })
}

const openBottom = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        area: ["100%","300px"],
        offset: "b"
    })
}

const openLeft = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        area: ["300px","80%"],
        offset: "l"
    })
}

const openRight = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        area: ["300px","80%"],
        offset: "r"
    })
}

const openLeftTop = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        area: ["300px","80%"],
        offset: "lt"
    })
}

const openLeftBottom = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        area: ["300px","80%"],
        offset: "lb"
    })
}

const openRightTop = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        area: ["300px","80%"],
        offset: "rt"
    })
}

const openRightBottom = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        area: ["300px","80%"],
        offset: "rb"
    })
}

const openTopLeft = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        area: ["80%","300px"],
        offset: "tl"
    })
}

const openTopRight = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        area: ["80%","300px"],
        offset: "tr"
    })
}

const openBottomLeft = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        area: ["80%","300px"],
        offset: "bl"
    })
}

const openBottomRight = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        area: ["80%","300px"],
        offset: "br"
    })
}
</script>
:::

<fieldset class="layui-elem-field layui-field-title">
    <legend>图片</legend>
</fieldset>

::: demo 通过 layer.photos(options) 创建图片预览弹层, 参数`options`主要传入预览的图片链接。

<template>
   <button @click="signleImg">图片查看</button>
   <button @click="signleImg2">图片标题</button>
   <button @click="groupImg">图片分组</button>
   <button @click="groupImg2">带缩略图</button>
</template>

<script>
import { layer } from  "../../../../layer/src/index"

const signleImg = function() {
    layer.photos("http://www.pearadmin.com/assets/images/un1.svg")
}
const signleImg2 = function() {
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

const groupImg2 = function() {
  layer.photos({
    imgList:[
      { 
        src:'http://www.pearadmin.com/assets/images/un8.svg', 
        alt:'图片1',
        thumb:'http://www.pearadmin.com/assets/images/un8.svg'
      },
      { 
        src:'http://www.pearadmin.com/assets/images/un32.svg', 
        alt:'图片2',
        thumb:'http://www.pearadmin.com/assets/images/un32.svg'
      }
    ]
  })
}
</script>
:::

<fieldset class="layui-elem-field layui-field-title">
    <legend>通知</legend>
</fieldset>

::: demo 通过 layer.notifiy(options) 创建通知。

<template>
  <lay-row :space="30" >
    <lay-col :span="24">
      <button @click="baseNotifiy">右上位置</button>
      <button @click="baseNotifiyRB">右下位置</button>
      <button @click="baseNotifiyLT">左上位置</button>
      <button @click="baseNotifiyLB">左下位置</button>
    </lay-col>
    <lay-col :span="24">
      <button @click="NotifiySuccess">成功通知</button>
      <button @click="NotifiyFailure">失败通知</button>
      <button @click="NotifiyWarm">警告通知</button>
      <button @click="NotifiyInfo">锁定通知</button>
    </lay-col>
  </lay-row>
</template>

<script>
import { layer } from  "../../../../layer/src/index"

const baseNotifiy = function() {
    layer.notifiy({
      title:"Notification Title",
      content:"I will never close automatically. I will be close automatically. I will never close automatically.",
      area: "300px"
    })
}
const baseNotifiyRB = function() {
    layer.notifiy({
      title:"Notification Title",
      content:"I will never close automatically. I will be close automatically. I will never close automatically.",
      offset:'rb',
    })
}
const baseNotifiyLT = function() {
    layer.notifiy({
      title:"Notification Title",
      content:"I will never close automatically. I will be close automatically. I will never close automatically.",
      offset:'lt',
    })
}
const baseNotifiyLB = function() {
    layer.notifiy({
      title:"Notification Title",
      content:"I will never close automatically. I will be close automatically. I will never close automatically.",
      offset:'lb',
    })
}
const NotifiySuccess=function(){
    layer.notifiy({
      title:"Notification Title",
      content:"I will never close automatically. I will be close automatically. I will never close automatically.",
      icon:1
    })
}
const NotifiyFailure=function(){
    layer.notifiy({
      title:"Notification Title",
      content:"I will never close automatically. I will be close automatically. I will never close automatically.",
      icon:2
    })
}
const NotifiyWarm=function(){
    layer.notifiy({
      title:"Notification Title",
      content:"I will never close automatically. I will be close automatically. I will never close automatically.",
      icon:3
    })
}
const NotifiyInfo=function(){
    layer.notifiy({
      title:"Notification Title",
      content:"I will never close automatically. I will be close automatically. I will never close automatically.",
      icon:4,
      area: "300px"
    })
}
</script>

:::

<fieldset class="layui-elem-field layui-field-title">
    <legend>销毁</legend>
</fieldset>

::: demo 我们提供 layer.close(id) 与 layer.closeAll() 函数实现弹出层的主动销毁。

<template>
    <button @click="open">打开</button>
    <button @click="close">销毁</button>
    <button @click="closeAll">销毁全部</button>
</template>

<script setup>
import { layer } from  "../../../../layer/src/index";

let id = null;

const open = function() {
    id = layer.open({
        title: "标题",
        content: "内容",
        shade: false
    })
}

const close = function() {
    layer.close(id);
}

const closeAll = function() {
    layer.closeAll();
}
</script>
:::

<fieldset class="layui-elem-field layui-field-title">
    <legend>通讯</legend>
</fieldset>

::: demo 👉 查看 [Children1.vue](https://layui-vue.gitee.io/sandbox-vue/#eNqdUkGO00AQ/ErLFyeSY5OrSaJFK87LA3yZtTub2R3PjGba0UaWD5w4cUTiCDwA+AGfQZH4BT127HXEjZu7XNVTXd1t9Mba9NhglEcbwtoqQbgrNMDmviEyGm5KJcunbREZi/rW1NZo1LQuot3508/zx++bbCAOIqltQ0Ani6wgfKYiguOqNhUqBipBInVYC/fEeMaSTTY9CoXm2pdOWgIl9EPo4JnnkRrLXMlvO4IWHIqS5BETOCRceKOOODmDDvbO1BDzUPFMpMQJ3fTzhstGZj24umLeHqSqHOo7jRdumo3YOiTFVOi9lkZ7gjATbCdPizb8HmbMIf796+v5/Y84KXS3fNFcR8nqxRK2O+ilvaU0MIZWACRJIfc6f/nw59vn0Cug3IlYncNhMbOc8KS9o2554fmDqFi9F8pjDwUjXUh+iJqDjZJoGH5VC5s+eqP5GtriAvIK8rbrmHQVw78Hszeu7r/+4w5Ykl30s5N4uYfxBsYEsZbEuVW4lxrfcuEXcSmUwiqe5WydsX6ivQvVEGowkMPd/SOWNK5mFkh4l04KwZe8iIqR4G3YjxVVJfVDDutX9vn1GGVg76LuL+G7LGU=), 通过 h() 函数的第二个参数向 Children1.vue 传递响应式变量。

<template>
  <button @click="openComponent1">数据</button>
  <input type="text" v-model="data.remark" />
</template>

<script setup>
import { reactive, h, resolveComponent } from 'vue'
import { layer } from  "../../../../layer/src/index"

const data = reactive({
    remark: "信息"
})
const ChildrenOne = resolveComponent('Children1')
const openComponent1 = () => {
  layer.open({
    title: '标题',
    content: h(ChildrenOne, { data }),
    shade: false,
  })
}
</script>

:::

::: demo 👉 查看 [Children2.vue](https://layui-vue.gitee.io/sandbox-vue/#eNqNksFum0AQhl9lxAWsYmPnSG2UKOoTtLfSA4Yh3hZ2VzC4sRDnSO2h1x6jPkQP7esklfoWnQXWAaWHcGJmv5n9d+ZvnSutV8cGndDZEpa6SAijWAJs9w2RknCZFiL9tIsdpVFeq1IriZIuYid6+PX14ffPbTCAQ5GQuiGgk0auILyl2IHjslQZFpyQTbnnRMDsNpjcxmGdVkITFIm8MZU1YzVSo/lU8J0VQQsVJimJI/pw8DnIoYO8UiW4rN+dcEVywup8eMlhI4I+uZyR1wdRZBXKd5/VyK4Cm7swQ2E0lqmSNYGulIbdWYLXdgt7ZF7VH+XeZr1ec96ezEfGjLeAXQStGVWvZ2UIr48BSFCBIbh/7u/+/vju+kOWOxFXh3DwJnr9oYn5jLKRBVDyKsu8CuvFEwC9wtUxKRpkDZPgFWws1E1avG32L26xfN6iW/Q/ZkCdWfSwWl6k4zvD5JdlolcfayXZdW08JnnlYdt1DM128NyYuarK/u/JpKPhhoitczZtkmXs1Mcv9zObvqCwbtip0ePdt7m/g/HymX2tea1h7fqxFMTTyjAXEt9wUHvvXVbk+i63dz9MnMLZuT2gr/Z6fBikRbn0/6jpadHJ1I0+OhUIdcpuyzhj3jCUam4v5E0Im7W+fW33ZejI6f4B7opkgw==), 通过 h() 函数的第二个参数声明 onXxx() 形式的函数完成 Children2.vue 的事件监听。 

<template>
  <button @click="openComponent2">事件</button>
  <input type="text" v-model="numb" />
</template>

<script setup>
import { reactive, h, resolveComponent, ref } from 'vue'
import { layer } from  "../../../../layer/src/index"

const prop = reactive({})
const numb = ref(1000)  
const ChildrenTwo = resolveComponent('Children2')

const openComponent2 = () => {
  layer.open({
    title: '标题',
    content: h(ChildrenTwo, { 
      prop, 
      onAdd(res){
        numb.value = numb.value + 1;
      }, onSub(res) {
        numb.value = numb.value - 1;
      }
      }),
  })
}
</script>

:::

<fieldset class="layui-elem-field layui-field-title">
    <legend>测试</legend>
</fieldset>

::: demo 我们提供 layer.close(id) 与 layer.closeAll() 函数实现弹出层的主动销毁。

<template>
    <button @click="changeVisible1">打开</button>
    <button @click="changeVisible2">打开</button>
    <button @click="changeVisible3">打开</button>
    <button @click="changeVisible4">打开</button>
    <button @click="changeVisible5">打开</button>
    <button @click="changeVisible6">打开</button>
    <br/>
    <br/>
    <button @click="changeVisible7">打开</button>
    <button @click="changeVisible8">打开</button>
    <button @click="changeVisible9">打开</button>
    <button @click="changeVisible10">打开</button>
    <button @click="changeVisible11">打开</button>
    <button @click="changeVisible12">打开</button>
    <br/>
    <br/>
    <button @click="changeVisible13">打开</button>
    <button @click="changeVisible14">打开</button>
    <button @click="changeVisible15">打开</button>
    <button @click="changeVisible16">打开</button>
    <button @click="changeVisible17">打开</button>
    <button @click="changeVisible18">打开</button>
    <lay-layer v-model="visible1" title="标题" :area="['200px','200px']" offset="r">
        内容
    </lay-layer>
    <lay-layer v-model="visible2" title="标题" type="drawer" :area="['200px','200px']" offset="l">
        内容
    </lay-layer>
    <lay-layer v-model="visible3" title="标题" type="drawer" area="200px" offset="rt">
        内容
    </lay-layer>
    <lay-layer v-model="visible4" title="标题" type="drawer" area="200px" offset="tr">
        内容
    </lay-layer>
    <lay-layer v-model="visible5" title="标题" type="drawer" offset="b">
        内容
    </lay-layer>
    <lay-layer v-model="visible6" :title="title6" :area="['500px','500px']">
        内容
    </lay-layer>
    <lay-layer v-model="visible7" title="自适应">
        <img src='https://img2.baidu.com/it/u=3080567934,982100974&fm=253&fmt=auto&app=120&f=JPEG?w=1047&h=461' />
    </lay-layer>
    <lay-layer v-model="visible9" title="自适应">
        <Children3></Children3>
    </lay-layer>
</template>

<script setup>
import { LayLayer } from  "../../../../layer/src/index";

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const visible6 = ref(false);
const title6 = ref(false);
const visible7 = ref(false);
const visible9 = ref(false);

const changeVisible1 = function() {
    visible1.value = !visible1.value;
}

const changeVisible2 = function() {
    visible2.value = !visible2.value;
}

const changeVisible3 = function() {
    visible3.value = !visible3.value;
}

const changeVisible4 = function() {
    visible4.value = !visible4.value;
}

const changeVisible5 = function() {
    visible5.value = !visible5.value;
}

const changeVisible6 = function() {
    visible6.value = !visible6.value;
    title6.value = "动态标题";
}

const changeVisible7 = function() {
    visible7.value = !visible7.value;
}

const changeVisible8 = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        offset: "t"
    })
}

const changeVisible9 = function() {
    visible9.value = !visible9.value;
}

const ChildrenThree = resolveComponent('Children3')

const changeVisible10 = function() {
    layer.open({
        title: "标题",
        area: "400px",
        content: h(ChildrenThree),
    })
}

const ChildrenFour = resolveComponent('Children4')

const changeVisible11 = function() {
    layer.open({
        title: "标题",
        area: "500px",
        content: h(ChildrenFour),
    })
}

const changeVisible12 = function() {
    layer.open({
        title: "标题",
        offset: "100px",
        content: h(ChildrenFour),
    })
}

const changeVisible13 = function() {
    layer.open({
        title: "标题",
        area: ["300px", "auto"],
        content: h(ChildrenFour),
    })
}

const changeVisible14 = function() {
    layer.open({
        title: "标题",
        area: ["300px"],
        zIndex: 1000,
        shade: false,
        content: h(ChildrenFour),
    })
}

const changeVisible15 = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
    })
}

const changeVisible16 = function() {
    layer.drawer({
        title: "标题",
        area: ["300px", "80%"],
        content: "内容",
    })
}

const changeVisible17 = function() {
    layer.drawer({
        title: "标题",
        area: ["50%", "80%"],
        content: "内容",
    })
}

const changeVisible18 = function() {
    layer.drawer({
        title: "标题",
        area: "50%",
        content: "内容",
    })
}
</script>
:::