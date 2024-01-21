::: anchor
:::

::: title 基本介绍
:::

::: describe 集众多弹层功能为一体，灵活而多样，是许多开发者的网页弹出层的首选交互方案，在各类业务场景都能发挥重要作用。
:::

::: title 综合演示
:::

::: demo 如 Message/Confirm/Loading/Page/Iframe/Drawer/Notifiy/Photos，应有尽有。

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
import { reactive, h, resolveComponent } from 'vue'

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
                src:'https://portrait.gitee.com/uploads/avatars/namespace/2849/8547475_layui-vue_1645856954.png',
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

const Children = resolveComponent('Children')

const openPageData = reactive({
    remark: "饥食西山稻，渴饮本源泉。寒披无相服，热来松下眠。知身无究竟，任运了残年。"
})

const openPage = function() {
    layer.open({
        type: "page",
        title: "组件页面",
        content: h(Children, { data: openPageData })
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

::: describe 若在 `layui-vue` 环境使用，可忽略 `app.use(layer)` 步骤。
:::

```js
import { createApp } from 'vue';
import layer from '@layui/layer-vue';
import '@layui/layer-vue/lib/index.css';
import App from './App.vue';

const app = createApp(App);
app.use(layer);
app.mount('#app');
```

::: title 普通消息
:::

::: demo 通过 layer.msg(content, options) 创建消息窗, content 为消息内容, options 为可选配置。

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
import { layer } from "@layui/layui-vue";

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

::: title 确认弹层
:::

::: demo 通过 layer.confirm(content, options) 创建确认框, content 为消息内容, options 为可选配置。

<template>
    <lay-button type="primary" @click="openConfirm1">确认框（1）</lay-button>
    <lay-button type="primary" @click="openConfirm2">询问框（2）</lay-button>
</template>

<script>
import { layer } from "@layui/layui-vue";

const openConfirm1 = function() {
    layer.confirm("layui-vue 1.0.0 已经发布")
}

const openConfirm2 = function() {
    layer.confirm("你如何看待 layui-vue 的发布", 
        {
            btn: [
                {text:'站着看', callback: (id) => { 
                    layer.msg("站着看"); 
                    layer.close(id); }
                },
                {text:'坐着看', callback: (id) => { 
                    layer.msg("坐着看"); 
                    layer.close(id); }
                }
            ]
        }
    );
}
</script>

:::

::: title 通知消息 
:::

::: demo 通过 layer.notifiy(options) 创建通知消息。

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

::: title 相册弹层
:::

::: demo 通过 layer.photos(options) 创建图片预览弹层, 参数 `options` 主要传入预览的图片链接。

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

::: title 加载弹层
:::

::: demo 通过 layer.load(type, options) 创建加载层, 第一个参数 `type` 为加载动画样式, 第二个参数 `options` 为可选配置。

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

::: title 模态弹层
:::

::: demo 通过 layer.open(option) 创建模态窗, 目前支持 `iframe` `page` 等类型, 你可以使用options选项开启 `resize` `offset` 等更多特性。

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
        closeBtn: "2",
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

::: title 模板调用
:::

::: demo 模态窗除 `layer.open` 的函数调用方式外，我们同时提供 `template` 的使用方式。

<template>
  <lay-button type="primary" @click="changeVisible11">填报信息</lay-button>
  <lay-layer v-model="visible11" :shade="false" :area="['500px', '450px']" :btn="action11">
    <div style="padding: 20px;">
      <lay-form :model="model11" ref="layFormRef11" required>
        <lay-form-item label="账户" prop="username">
          <lay-input v-model="model11.username"></lay-input>
        </lay-form-item>
        <lay-form-item label="密码" prop="password">
          <lay-input v-model="model11.password" type="password">></lay-input>
        </lay-form-item>
        <lay-form-item label="爱好" prop="hobby">
          <lay-select v-model="model11.hobby" multiple style="width:100%;">
            <lay-select-option value="1" label="学习"></lay-select-option>
            <lay-select-option value="2" label="编码"></lay-select-option>
            <lay-select-option value="3" label="运动"></lay-select-option>
          </lay-select>
        </lay-form-item>
        <lay-form-item label="特长" prop="specialty">
          <lay-radio v-model="model11.specialty" name="specialty" value="1">写作</lay-radio>
          <lay-radio v-model="model11.specialty" name="specialty" value="2">画画</lay-radio>
          <lay-radio v-model="model11.specialty" name="specialty" value="3">编码</lay-radio>
        </lay-form-item>
        <lay-form-item label="描述" prop="desc">
          <lay-textarea placeholder="请输入描述" v-model="model11.desc"></lay-textarea>
        </lay-form-item>
      </lay-form>
    </div>
  </lay-layer>
</template>

<script>
import { ref, reactive } from 'vue'
import { layer } from '@layui/layui-vue'

const model11 = reactive({
  username: "admin"
})

const layFormRef11 = ref();

const visible11 = ref(false);

const changeVisible11 = () => {
  visible11.value = !visible11.value;
}

const action11 = ref([
    {
        text: "确认",
        callback: () => {
            layer.confirm("确认操作", { shade: false });
        }
    },
    {
        text: "取消",
        callback: () => {
            layer.confirm("取消操作", { shade: false });
        }
    }
])
</script>

:::

::: title 抽屉弹层
:::

::: demo 通过 layer.drawer(options) 创建抽屉层, 参数 `options` 为可选配置。 抽屉本质上是一个特殊的模态窗, 你可以使用 `offset` 选项来打开方向。
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

::: title 局部使用
:::

::: demo 我们提供 `teleport` 指定弹层父级元素，通过 `teleportDisabled` 属性禁用模态模式，默认为 `false`。

<template>
    <lay-button @click="changeFeatureVisible1">template to container</lay-button>
    <lay-button @click="changeFeatureVisible2">function to container</lay-button>
    <br />
    <br />
    <div style="width:100%;height:500px;position: relative;" id="container">
        <lay-layer v-model="featureVisible1" :teleportDisabled="true" :maxmin="true">
            内容
        </lay-layer>
    </div>
</template>

<script setup>
import { layer } from  "@layui/layui-vue"
    
const featureVisible1 = ref(false);

const changeFeatureVisible1 = () => {
    featureVisible1.value = !featureVisible1.value;
}

const changeFeatureVisible2 = () => {
    layer.open({
        title: '标题',
        content: "内容",
        maxmin: true,
        teleport: "#container",
    })
}
</script>
:::

::: title 高级通讯
:::

::: demo 查看 [Children1.vue](https://layui-vue.gitee.io/sandbox-vue/#eNqdUkGO00AQ/ErLFyeSY5OrSaJFK87LA3yZtTub2R3PjGba0UaWD5w4cUTiCDwA+AGfQZH4BT127HXEjZu7XNVTXd1t9Mba9NhglEcbwtoqQbgrNMDmviEyGm5KJcunbREZi/rW1NZo1LQuot3508/zx++bbCAOIqltQ0Ani6wgfKYiguOqNhUqBipBInVYC/fEeMaSTTY9CoXm2pdOWgIl9EPo4JnnkRrLXMlvO4IWHIqS5BETOCRceKOOODmDDvbO1BDzUPFMpMQJ3fTzhstGZj24umLeHqSqHOo7jRdumo3YOiTFVOi9lkZ7gjATbCdPizb8HmbMIf796+v5/Y84KXS3fNFcR8nqxRK2O+ilvaU0MIZWACRJIfc6f/nw59vn0Cug3IlYncNhMbOc8KS9o2554fmDqFi9F8pjDwUjXUh+iJqDjZJoGH5VC5s+eqP5GtriAvIK8rbrmHQVw78Hszeu7r/+4w5Ykl30s5N4uYfxBsYEsZbEuVW4lxrfcuEXcSmUwiqe5WydsX6ivQvVEGowkMPd/SOWNK5mFkh4l04KwZe8iIqR4G3YjxVVJfVDDutX9vn1GGVg76LuL+G7LGU=), 通过 h() 函数的第二个参数向 Children1.vue 传递响应式变量。

<template>
  <lay-input type="text" v-model="data.remark" >
    <template #append>
        <lay-icon type="layui-icon-set-fill" @click="openComponent1"></lay-icon>
    </template>
  </lay-input>
</template>

<script setup>
import { reactive, h, resolveComponent } from 'vue'
import { layer } from  "@layui/layui-vue"

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

::: demo 查看 [Children2.vue](https://layui-vue.gitee.io/sandbox-vue/#eNqNksFum0AQhl9lxAWsYmPnSG2UKOoTtLfSA4Yh3hZ2VzC4sRDnSO2h1x6jPkQP7esklfoWnQXWAaWHcGJmv5n9d+ZvnSutV8cGndDZEpa6SAijWAJs9w2RknCZFiL9tIsdpVFeq1IriZIuYid6+PX14ffPbTCAQ5GQuiGgk0auILyl2IHjslQZFpyQTbnnRMDsNpjcxmGdVkITFIm8MZU1YzVSo/lU8J0VQQsVJimJI/pw8DnIoYO8UiW4rN+dcEVywup8eMlhI4I+uZyR1wdRZBXKd5/VyK4Cm7swQ2E0lqmSNYGulIbdWYLXdgt7ZF7VH+XeZr1ec96ezEfGjLeAXQStGVWvZ2UIr48BSFCBIbh/7u/+/vju+kOWOxFXh3DwJnr9oYn5jLKRBVDyKsu8CuvFEwC9wtUxKRpkDZPgFWws1E1avG32L26xfN6iW/Q/ZkCdWfSwWl6k4zvD5JdlolcfayXZdW08JnnlYdt1DM128NyYuarK/u/JpKPhhoitczZtkmXs1Mcv9zObvqCwbtip0ePdt7m/g/HymX2tea1h7fqxFMTTyjAXEt9wUHvvXVbk+i63dz9MnMLZuT2gr/Z6fBikRbn0/6jpadHJ1I0+OhUIdcpuyzhj3jCUam4v5E0Im7W+fW33ZejI6f4B7opkgw==), 通过 h() 函数的第二个参数声明 onXxx() 形式的函数完成 Children2.vue 的事件监听。 

<template>
  <lay-input type="text" v-model="numb" >
    <template #append>
        <lay-icon type="layui-icon-set-fill" @click="openComponent2"></lay-icon>
    </template>
  </lay-input>
</template>

<script setup>
import { reactive, h, resolveComponent, ref } from 'vue'
import { layer } from  "@layui/layui-vue"

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

::: title 内置方法
:::

::: demo 通过 `layer.open(options)` 创建模态窗, 通过 `layer.close(id)` 关闭指定模态窗，通过 `layer.closeAll()` 关闭所有模态窗。

<template>
  <lay-button @click="open" type="primary">打开</lay-button>
  <lay-button @click="close" type="primary">关闭</lay-button>
  <lay-button @click="closeAll" type="primary">关闭所有</lay-button>
</template>

<script setup>
import { ref, watch } from "vue";
import { layer } from "@layui/layui-vue"

const id = ref();
    
const open = () => {
    id.value = layer.open({title:"标题",content:"内容", shade: false})
}

const close = () => {
    layer.close(id.value)
}
    
const closeAll = () => {
    layer.closeAll()
}
</script>

:::

::: title 回调事件
:::

::: demo 你可以通过 `success` `end` `close` `beforeClose` `full` `min` `restore` 等回调属性，监听 layer 的生命周期。

<template>
  <lay-button @click="openCallback" type="primary">打开</lay-button>
</template>

<script setup>
import { ref, watch } from "vue";
import { layer } from "@layui/layui-vue"
 
const openCallback = () => {
    layer.open({
        title:"标题",
        content:"内容", 
        maxmin: true,
        shade: false,
        min: (id) => {
            console.log(`最小化:${id}`)
        },
        full: (id) => {
            console.log(`最大化:${id}`)
        },
        restore: (id) => {
            console.log(`重置:${id}`)
        },
        success: (id) => {
            console.log(`成功:${id}`)
        },
        end: (id) => {
            console.log(`销毁:${id}`)
        },
        close: (id) => {
            console.log(`关闭:${id}`)
        },
        beforeClose: (id) => {
            console.log(`关闭前置:${id}`)
        },
        moveStart: (id) => {
            console.log(`拖拽开始:${id}`)
        },
        moving: (id) => {
            console.log(`拖拽中：${id}`)
        },
        moveEnd: (id) => {
            console.log(`拖拽结束:${id}`)
        }})
}
</script>

:::

::: title 属性说明
:::

::: table

| 属性 | 描述 | 类型 | 默认值 | 可选值 |
| -- | -- | -- | -- | -- |
| type | 类型 | string | `1` | `0` `1` `2` `3` `4` `5` |
| title | 标题 | string boolean | `信息` | -- |
| titleStyle | 标题样式 | string StyleValue | -- | -- |
| content | 内容 | string vnode | -- | -- |
| v-model | 显示 | boolean | `false`  | `true` `false` |
| offset | 位置 | string array | `auto` | -- |
| area | 尺寸 | string array | `auto`  | -- |
| move | 拖拽 | boolean | `true` | `true` `false` | 
| maxmin | 缩放 | boolean | `false` | `true` `false` |
| resize | 拉伸 | boolean | `false` | `true` `false` |
| anim | 入场动画 | number | `0` | `0` - `6` |
| isOutAnim | 出场动画 | boolean | `true` | `true` `false` |
| btnAlign | 按钮位置 | string | `r` | `l` `c` `r` |
| closeBtn | 关闭按钮 | boolean string | `1` | `false` `1` `2` |
| time | 关闭时间 | number | `0` | -- |
| shade | 遮盖层 | boolean | `true` | `true` `false` |
| shadeClose | 遮盖层关闭 | boolean | `true` | `true` `false` |
| shadeOpacity | 遮盖层透明度 | string | `0.1` | `0.1` - `1` |
| shadeStyle   | 遮盖层样式   | string StyleValue |  |  |
| isHtmlFragment | 解析 html 字符 | boolean | `false` | `true` `false` |
| imgList | 图片数据数组 | array[{src:图片链接,alt:图片名字可选',thumb:'缩略图可选'}] | - | - |
| startIndex | 图片初始浏览索引 | number | 0 | - |
| full | 最大化回调 | function | - | - |
| min | 最小化回调 | function | -  | - |
| restore | 重置回调 | function | -  | - |
| success | 打开回调 | function | -  | - |
| end | 销毁回调 | function | -  | - |
| close | 点击右上角 close 按钮 / 遮盖层的关闭回调 | function | -  | - |
| moveOut | 是否可以拖出浏览器可视区域 | boolean | false  | true false |
| moveStart | 拖拽开始回调  | function | -  | - |
| moveEnd | 拖拽结束回调 | function | -  | - |
| animDuration | 动画速率 | string | `0.3s`  | - |
 
:::

::: title 内置方法
:::
