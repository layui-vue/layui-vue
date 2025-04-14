::: anchor
:::

::: title 基本介绍
:::

::: describe 集众多弹层功能为一体，灵活而多样，是许多开发者的网页弹出层的首选交互方案，在各类业务场景都能发挥重要作用。
:::

::: title 综合演示
:::

::: demo 如 Message/Confirm/Loading/Page/Iframe/Drawer/Notify/Photos，应有尽有。

<template>
    <lay-button type="primary" @click="openMsg">普通消息</lay-button>
    <lay-button type="primary" @click="openSuccess">成功消息</lay-button>
    <lay-button type="primary" @click="openLoad">全局加载</lay-button>
    <lay-button type="primary" @click="openConfirm">确认框</lay-button>
    <lay-button type="primary" @click="openPage">模态框</lay-button>
    <lay-button type="primary" @click="openIframe">Iframe 层</lay-button>
    <lay-button type="primary" @click="openDrawer">抽屉</lay-button>
    <lay-button type="primary" @click="openNotify">通知</lay-button>
    <lay-button type="primary" @click="openPhotos">相册</lay-button>
    <lay-button type="primary" @click="openPrompt">输入层</lay-button>
</template>

<script setup>
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
        content: "https://www.layui-vue.com"
    })
}

const openNotify = function() {
    layer.notify({
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
        title: h("div", { style: "color: #f00; pointer-events: none;" }, "组件页面"),
        content: h(Children, { data: openPageData }),
        footer: h("div", { style: "color: #0f0; pointer-events: none;" }, "组件底部")
    })
}

const openPrompt = function() {
    layer.prompt({
        title: "请输入密码",
        formType: "password",
        value: "123",
        maxLength: 32,
        yes (layero, data) {
            layer.msg("你输入了：" + data);
            layer.close(layero);
        }
    });

    layer.prompt({
        title: "输入内容",
        formType: "textarea",
        value: "SomeContent",
        btn: [
            {
                text: "Click me!", callback(layero, data) {
                    console.log(layero, data);
                    layer.msg(data);
                }
            }
        ]
    });
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
import { createApp } from "vue";
import layer from "@layui/layer-vue";
import "@layui/layer-vue/lib/index.css";
import App from "./App.vue";

const app = createApp(App);
app.use(layer);
app.mount("#app");
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

<script setup>
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

::: demo 通过 layer.notify(options) 创建通知消息。

<template>
  <lay-row :space="30" >
    <lay-col :span="24">
      <lay-button type="primary" @click="baseNotifyRT">右上位置</lay-button>
      <lay-button type="primary" @click="baseNotifyRB">右下位置</lay-button>
      <lay-button type="primary" @click="baseNotifyLT">左上位置</lay-button>
      <lay-button type="primary" @click="baseNotifyLB">左下位置</lay-button>
    </lay-col>
    <lay-col :span="24">
      <lay-button type="primary" @click="NotifySuccess">成功通知</lay-button>
      <lay-button type="primary" @click="NotifyFailure">失败通知</lay-button>
      <lay-button type="primary" @click="NotifyWarm">警告通知</lay-button>
      <lay-button type="primary" @click="NotifyInfo">锁定通知</lay-button>
    </lay-col>
  </lay-row>
</template>

<script setup>
import { layer } from  "@layui/layui-vue"

const baseNotifyRT = function() {
    layer.notify({
      title:"这是标题",
      content:"默认就是右上，也是用得最多的"
    })
}
const baseNotifyRB = function() {
    layer.notify({
      title:"这是标题",
      content:"默认就是右上，也是用得最多的",
      offset:'rb',
    })
}
const baseNotifyLT = function() {
    layer.notify({
      title:"这是标题",
      content:"默认就是右上，也是用得最多的",
      offset:'lt',
    })
}
const baseNotifyLB = function() {
    layer.notify({
      title:"这是标题",
      content:"默认就是右上，也是用得最多的",
      offset:'lb',
    })
}
const NotifySuccess=function(){
    layer.notify({
      title:"Success",
      content:"默认就是右上，也是用得最多的",
      icon:1
    })
}
const NotifyFailure=function(){
    layer.notify({
      title:"Error",
      content:"默认就是右上，也是用得最多的",
      icon:2
    })
}
const NotifyWarm=function(){
    layer.notify({
      title:"Warming",
      content:"默认就是右上，也是用得最多的",
      icon:3
    })
}
const NotifyInfo=function(){
    layer.notify({
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

<script setup>
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

::: demo 通过 layer.open(option) 创建模态窗, 目前支持 `iframe` `page` 等类型, 你可以使用 options 选项开启 `resize` `offset` 等更多特性。

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
        content: "https://www.layui-vue.com"
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

<script setup>
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

::: demo 查看 [Children1.vue](https://layui-vue.github.io/layui-vue-playground/#eNqdUkGO00AQ/ErLFyeSY5OrSaJFK87LA3yZtTub2R3PjGba0UaWD5w4cUTiCDwA+AGfQZH4BT127HXEjZu7XNVTXd1t9Mba9NhglEcbwtoqQbgrNMDmviEyGm5KJcunbREZi/rW1NZo1LQuot3508/zx++bbCAOIqltQ0Ani6wgfKYiguOqNhUqBipBInVYC/fEeMaSTTY9CoXm2pdOWgIl9EPo4JnnkRrLXMlvO4IWHIqS5BETOCRceKOOODmDDvbO1BDzUPFMpMQJ3fTzhstGZj24umLeHqSqHOo7jRdumo3YOiTFVOi9lkZ7gjATbCdPizb8HmbMIf796+v5/Y84KXS3fNFcR8nqxRK2O+ilvaU0MIZWACRJIfc6f/nw59vn0Cug3IlYncNhMbOc8KS9o2554fmDqFi9F8pjDwUjXUh+iJqDjZJoGH5VC5s+eqP5GtriAvIK8rbrmHQVw78Hszeu7r/+4w5Ykl30s5N4uYfxBsYEsZbEuVW4lxrfcuEXcSmUwiqe5WydsX6ivQvVEGowkMPd/SOWNK5mFkh4l04KwZe8iIqR4G3YjxVVJfVDDutX9vn1GGVg76LuL+G7LGU=), 通过 h() 函数的第二个参数向 Children1.vue 传递响应式变量。

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

::: demo 查看 [Children2.vue](https://layui-vue.github.io/layui-vue-playground/#eNqNksFum0AQhl9lxAWsYmPnSG2UKOoTtLfSA4Yh3hZ2VzC4sRDnSO2h1x6jPkQP7esklfoWnQXWAaWHcGJmv5n9d+ZvnSutV8cGndDZEpa6SAijWAJs9w2RknCZFiL9tIsdpVFeq1IriZIuYid6+PX14ffPbTCAQ5GQuiGgk0auILyl2IHjslQZFpyQTbnnRMDsNpjcxmGdVkITFIm8MZU1YzVSo/lU8J0VQQsVJimJI/pw8DnIoYO8UiW4rN+dcEVywup8eMlhI4I+uZyR1wdRZBXKd5/VyK4Cm7swQ2E0lqmSNYGulIbdWYLXdgt7ZF7VH+XeZr1ec96ezEfGjLeAXQStGVWvZ2UIr48BSFCBIbh/7u/+/vju+kOWOxFXh3DwJnr9oYn5jLKRBVDyKsu8CuvFEwC9wtUxKRpkDZPgFWws1E1avG32L26xfN6iW/Q/ZkCdWfSwWl6k4zvD5JdlolcfayXZdW08JnnlYdt1DM128NyYuarK/u/JpKPhhoitczZtkmXs1Mcv9zObvqCwbtip0ePdt7m/g/HymX2tea1h7fqxFMTTyjAXEt9wUHvvXVbk+i63dz9MnMLZuT2gr/Z6fBikRbn0/6jpadHJ1I0+OhUIdcpuyzhj3jCUam4v5E0Im7W+fW33ZejI6f4B7opkgw==), 通过 h() 函数的第二个参数声明 onXxx() 形式的函数完成 Children2.vue 的事件监听。

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

::: demo 通过 `layer.open(options)` 创建模态窗, 通过 `layer.close(id)` 关闭指定模态窗，通过 `layer.closeAll()` 关闭所有模态窗。

<template>
  <lay-button @click="open" type="primary">打开</lay-button>
  <lay-button @click="close" type="primary">关闭</lay-button>
  <lay-button @click="closeAll" type="primary">关闭所有</lay-button>
  <lay-button @click="reset" type="primary">重置</lay-button>
  <lay-button @click="min" type="primary">最小化</lay-button>
  <lay-button @click="full" type="primary">最大化</lay-button>
  <lay-button @click="revert" type="primary">复原</lay-button>
</template>

<script setup>
import { ref, watch } from "vue";
import { layer } from "@layui/layui-vue"

const id = ref();

const open = () => {
    id.value = layer.open({title:"标题",content:"内容", shade: false, maxmin: true})
}

const close = () => {
    layer.close(id.value)
}

const closeAll = () => {
    layer.closeAll()
}

const reset = () => {
    layer.reset(id.value)
}

const min = () => {
    layer.min(id.value)
}

const full = () => {
    layer.full(id.value)
}

const revert = () => {
    layer.revert(id.value)
}
</script>

:::

::: title 回调事件
:::

::: demo 你可以通过 `success` `end` `close` `beforeClose` `full` `min` `restore` `revert` 等回调属性，监听 layer 的生命周期。

<template>
  <lay-button @click="openCallback" type="primary">打开</lay-button>
  <lay-button @click="openMoveEnd" type="primary">moveEnd设置最终位置</lay-button>
  <lay-button @click="openResizeEnd" type="primary">resizeEnd设置最终宽高</lay-button>
</template>

<script setup>
import { ref, watch } from "vue";
import { layer } from "@layui/layui-vue"

const openMoveEnd = () => {
    layer.open({
        title:"移动结束",
        content:"移动结束最终位置固定为top50px/left50px",
        moveEnd(id, { left, top, isMin, isMax }) {
            console.log(left, top, isMin, isMax, "left, top, isMin, isMax");
            return ["50px", "50px"];
        },
    })
}

const openResizeEnd = () => {
    layer.open({
        title:"缩放结束",
        content:"缩放结束最终宽高固定为top500px/left500px",
        resize: true,
        resizeEnd(id, { width, height }) {
            console.log(width, height, "width, height");
            return ["500px", "500px"];
        },
    })
}

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
        revert: (id) => {
            console.log(`最小/最大化还原:${id}`)
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
        moving: (id, {top, left}) => {
            console.log(`拖拽中：${id}`)
        },
        moveEnd: (id) => {
            console.log(`拖拽结束:${id}`)
        },
        resizeStart: (id) => {
            console.log(`拉伸开始:${id}`)
        },
        resizing: (id, {width, height}) => {
            console.log(`拉伸中：${id}`)
        },
        resizeEnd: (id) => {
            console.log(`拉伸结束:${id}`)
        }
        })
}
</script>

:::

::: title 基础 API
:::

::: describe 以下为 Layer 的基础 API
:::

::: table

| 函数签名                                                                       | 描述                       |
| ------------------------------------------------------------------------------ | -------------------------- |
| `create: (option: LayerProps, defaultOption: LayerProps, callback?: Function)` | 创建一个弹层               |
| `open: (option: LayerProps)`                              | 打开一个弹层               |
| `close: (id: string)`                                                          | 关闭指定 ID 的弹层         |
| `closeAll: ()`                                                                 | 关闭当前上下文中全部的弹层 |
| `reset: (id: string)`                                                          | 重置某个弹层的位置和大小   |
| `full: (id: string)`                                                           | 最大化某个弹层             |
| `min: (id: string)`                                                            | 最小化某个弹层             |
| `revert: (id: string)`                                                         | 最大/最小化时复原弹层      |

:::

::: title 弹层 API
:::

::: describe 弹层 API 是对 `layer.open` 的封装。
:::

::: describe 全部的封装都带有可选属性 `option`，**调用时与内部预置的 `defaultOption` 配置混合，`Option` 的配置将有更高的优先级**。
:::

::: table

| 函数签名                                                               | 描述     |
| ---------------------------------------------------------------------- | -------- |
| `msg: (message: string, option: LayerProps = {}, callback?: Function)` | 消息     |
| `drawer: (option: LayerProps, callback?: Function)`                    | 抽屉     |
| `load: (load: number, option: LayerProps = {}, callback?: Function)`   | 加载     |
| `confirm: (msg: string, option: LayerProps = {}, callback?: Function)` | 确认     |
| `photos: (option: string \| LayerProps, callback?: Function)`          | 图片预览 |
| `notify: (option: LayerProps, callback?: Function)`                    | 通知     |
| `prompt: (option: LayerProps, callback?: Function)`                    | 输入框   |

:::

::: title Properity 属性
:::

::: describe 以下是 layer 支持的基础属性 `LayerProps`。根据 _type_ 的不同，对基础属性的扩充也各不同，`(通用属性 + 回调) + 可选属性 = LayerProps`。
:::

::: table

| 属性                | 描述                                                              | 类型                                                      | 默认值                 | 可选值                                                                             | 版本     |
| ------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------- | -------- |
| _v-model_           | 显示                                                              | boolean                                                   | `false`                |                                                                                    |          |
| _id_                | layer 标识 可不传(内部生成)                                       | `string`                                                  |                        |                                                                                    |          |
| _type_              | 类型                                                              | string                                                    | `1`                    | `0(dialog)` `1(page)` `2(iframe)` `3(loading)` `4(drawer)` `5(photos)` `6(notify)` `7(prompt)` |          |
| _title_             | 标题  **当传入组件时，会影响内部寻找拖拽节点，需要给根元素设置 `pointer-events: none`**          |  `boolean` `PropsContentType (2.19.0)` | `标题`                 | --                                                                                 |          |
| _title-style_       | 标题样式                                                          | `string` `StyleValue`                                     | --                     | --                                                                                 |          |
| _footer_            | 底部                            |  `boolean` `PropsContentType (2.19.0)`          |                        |                                                                                    | `2.19.0` |
| _footer-style_      | 底部样式                                                          | `string` `StyleValue`                                     | --                     | --                                                                                 | `2.19.0` |
| _content_           | 内容                                                              | `PropsContentType`                                        | --                     | --                                                                                 |          |
| _is-html-fragment_  | `content` 是否解析 html                                           | `boolean`                                                 | `false`                | --                                                                                 |          |
| _offset_            | 偏移量                                                            | `string` `string[]`                                       | `auto`                 | --                                                                                 |          |
| _area_              | 弹窗宽高 (`auto` 将自适应)                                        | `string` `string[]`                                       | `auto`                 | --                                                                                 |          |
| _move_              | 开启拖拽                                                          | boolean                                                   | `true`                 | --                                                                                 |          |
| _maxmin_            | 开启最小/最大化                                                   | boolean                                                   | `false`                | --                                                                                 |          |
| _resize_            | 开启左下角拖拽放大缩小                                            | boolean                                                   | `false`                | --                                                                                 |          |
| _shade_             | 显示遮盖层                                                        | boolean                                                   | `true`                 | --                                                                                 |          |
| _shade-close_       | 遮盖层关闭                                                        | boolean                                                   | `true`                 | --                                                                                 |          |
| _shade-style_       | 遮盖层样式                                                        | `StyleValue`                                              | --                     | --                                                                                 |          |
| _shade-opacity_     | 遮盖层透明度                                                      | `string`                                                  | `0.1`                  | `0.1` - `1`                                                                        |          |
| _layer-classes_     | layer box 类名 (原 skin 属性)                                     | `string`                                                  | --                     | --                                                                                 |          |
| _z-index_           | layer `z-index` 不设置内部将从 `99999` 开始递增                   | `number`                                                  | --                     | --                                                                                 |          |
| _close-btn_         | 关闭按钮                                                          | `boolean` `string`                                        | `1`                    | `false` `1` `2`                                                                    |          |
| _btn_               | 底部按钮集合                                                      | `BtnType[]`                                               | --                     | --                                                                                 |          |
| _btn-align_         | 底部按钮位置                                                      | `string`                                                  | `r`                    | `l` `c` `r`                                                                        |          |
| _anim_              | layer 打开动画                                                    | `number`                                                  | `0`                    | `0` - `6`                                                                          |          |
| _is-out-anim_       | 是否需要离场动画                                                  | `boolean`                                                 | `true`                 | --                                                                                 |          |
| _icon_              | `msg` `notify` 展示 Icon                                          | `string` `number`                                         | -                      | `1` `2` `3` `4` `5` `6` `7` `16`                                                   |          |
| _img-list_          | `type` 为 5 渲染图片列表                                          | `ImgListType[]`                                           | --                     | --                                                                                 |          |
| _start-index_       | 图片初始浏览索引                                                  | `number`                                                  | 0                      | --                                                                                 |          |
| _anim-duration_     | layer 打开关闭动画速率                                            | `string`                                                  | `0.3s`                 | --                                                                                 |          |
| _move-out_          | 是否可以拖出浏览器可视区域                                        | `boolean`                                                 | `false`                | --                                                                                 |          |
| _teleport_          | layer 挂载到目标 DOM                                              | `string`                                                  | `body`                 | --                                                                                 |          |
| _teleport-disabled_ | 禁止挂载到目标 DOM，保持原位置                                    | `boolean`                                                 | `false`                | --                                                                                 |          |
| _last-position_     | 最小/最大化复原位置 `true`上次位置(拖动)、 `false` layer 初始位置 | `boolean`                                                 | `true`                 | --                                                                                 |          |
| _time_              | `msg` `notify` 定时关闭                                           | `number`                                                  | `msg`1000 `notify`2000 | --                                                                                 |          |
| _load_              | `type` 为 3 时，loading Icon                                      | `number`                                                  | 0                      | `0`, `1`                                                                           |          |
| _yes-text_          | 底部默认按钮文本                                                  | `string`                                                  | `确定`                 | --                                                                                 |          |

:::

::: describe 以下是 `BtnType`，为 `LayerProps` 的 `btn` 属性所用。
:::

::: table

| 参数       | 描述     | 类型                  | 默认值  | 可选值 |
| ---------- | -------- | --------------------- | ------- | ------ |
| _text_     | 按钮文本 | `string`              |         |        |
| _callback_ | 回调     | `Function`            |         |        |
| _style_    | 按钮样式 | `string` `StyleValue` | `""`    |        |
| _class_    | 按钮类   | `string`              | `""`    |        |
| _disabled_ | 是否禁用 | `boolean`             | `false` |        |

:::

::: title Callbacks 回调
:::

::: table

| 属性           | 描述                                                                       | 类型       | 默认值            | 可选值 |
| -------------- | -------------------------------------------------------------------------- | ---------- | ----------------- | ------ | 
| _full_         | 最大化回调                                                                 | `function` | `(id) => {}`      |        |
| _min_          | 最小化回调                                                                 | `function` | `(id) => {}`      |        |
| _revert_       | 恢复最小/最大化回调                                                        | `function` | `(id) => {}`      |        |
| _success_      | layer 打开回调                                                             | `function` | `(id) => {}`      |        |
| _end_          | layer 关闭回调                                                             | `function` | `(id) => {}`      |        |
| _close_        | 内部(右上角/点击遮罩/默认确认按钮)关闭回调                                 | `function` | `(id) => {}`      |        |
| _before-close_ | 内部(右上角/点击遮罩/默认确认按钮)关闭前回调，返回值为 `true` 内部才会关闭 | `function` | `(id) => boolean` |        |
| _destroy_      | 销毁回调                                                                   | `function` | `() => {}`        |        |
| _yes_          | 点击底部默认按钮(不会主动关闭 `layer` 需要手动关闭，可用于一些逻辑判断)         | `function` | `id`     |        |     
| _move-start_   | 弹窗拖动位置开始回调                                                       | `function` | `id`              | -      |
| _moving_       | 弹窗拖动位置回调                                                           | `function` | `id`              | -      |
| _move-end_     | 弹窗拖动位置结束回调（支持返回最终left/top值）                                | [MoveEndFn](https://www.layui-vue.com/zh-CN/components/layer#types) | `() => undefined`              | -      |
| _resize-start_ | 弹窗拉伸位置开始回调                                                       | `function` | `id`              | -      |
| _resizing_     | 弹窗拉伸位置开始回调                                                       | `function` | `id`              | -      |
| _resize-end_   | 弹窗拉伸位置开始回调（支持返回最终width/height值）                                | [ResizeEndFn](https://www.layui-vue.com/zh-CN/components/layer#types) | `() => undefined`              | -      |

:::

::: title Slot 插槽
:::

::: table

| 名称      | 描述     |
| --------- | -------- |
| _default_ | 主体内容 |
| _title_   | 标题 **当传入组件时，会影响内部寻找拖拽节点，需要给根元素设置 `pointer-events: none`**     |
| _footer_  | 底部     |

:::

::: title Exposes 事件
:::

::: table

| 名称    | 描述                                      |
| ------- | ----------------------------------------- |
| _reset_ | 重置弹窗 `modelValue` 为 false 弹窗将打开 |
| _open_  | 打开弹窗                                  |
| _close_ | 关闭弹窗                                  |
| _full_  | 最大化                                    |
| _min_   | 最小化                                    |
| _reset_ | 复原最小/最大化                           |

:::

::: title layer.msg
:::

::: describe 对用户进行简单提示。
:::

::: describe `option` 如下：
:::

::: table

| 参数名     | 描述             | 类型         | 默认值       |
| ---------- | ---------------- | ------------ | ------------ |
| _message_  | 要显示的消息     | `string`     | `""`         |
| _option_   | 配置             | `LayerProps` | `{}`         |
| _callback_ | 弹层创建后的回调 | `Function`   | `(id) => {}` |

:::

::: describe `defaultOption` 如下：
:::

::: table

| 参数名        | 描述           | 值        |
| ------------- | -------------- | --------- |
| _type_        | 类型           | `0`       |
| _title_       | 标题           | `false`   |
| _content_     | 内容           | _message_ |
| _shade-close_ | 遮盖层关闭     | `false`   |
| _close-btn_   | 关闭按钮       | `false`   |
| _is-message_  | 是否为消息类型 | `true`    |
| _shade_       | 遮盖层         | `false`   |
| _time_        | 关闭时间       | `1000`    |

:::

::: describe 可选属性如下：
:::

::: table

| 属性         | 描述           | 类型      | 默认值 | 可选值         |
| ------------ | -------------- | --------- | ------ | -------------- |
| _is-message_ | 是否为消息类型 | `boolean` | `true` | `true` `false` |

:::

::: title layer.drawer
:::

::: describe 弹出抽屉浮层。
:::

::: describe `option` 如下：
:::

::: table

| 参数名     | 描述             | 类型         | 默认值       |
| ---------- | ---------------- | ------------ | ------------ |
| _option_   | 配置             | `LayerProps` |              |

:::

::: describe `defaultOption` 如下：
:::

::: table

| 属性   | 描述 | 值         |
| ------ | ---- | ---------- |
| _type_ | 类型 | `"drawer"` |

:::

::: describe 可选属性如下：
:::

::: describe 没有可选属性。
:::

::: title layer.load
:::

::: describe 加载数据、异步操作。
:::

::: describe `option` 如下：
:::

:::table

| 参数名     | 描述             | 类型         | 默认值       |
| ---------- | ---------------- | ------------ | ------------ |
| _load_     | 加载层样式       | `number`     |              |
| _option_   | 配置             | `LayerProps` |              |

:::

::: describe `defaultOption` 如下：
:::

::: table

| 属性          | 描述       | 值      |
| ------------- | ---------- | ------- |
| _type_        | 类型       | `3`     |
| _load_        | 加载层样式 | _load_  |
| _anim_        | 入场动画   | `5`     |
| _is-out-anim_ | 出场动画   | `false` |
| _shade-close_ | 遮盖层关闭 | `false` |

:::

::: describe 可选属性如下：
:::

::: table

| 属性   | 描述       | 类型     | 默认值 | 可选值    |
| ------ | ---------- | -------- | ------ | --------- |
| _load_ | 加载层样式 | `number` | `0`    | `0` - `6` |

:::

::: title layer.confirm
:::

::: describe 要求用户确认操作。
:::

::: describe `option` 如下：
:::

::: table

| 参数名     | 描述             | 类型         | 默认值       |
| ---------- | ---------------- | ------------ | ------------ |
| _msg_      | 要显示的消息     | `string`     | `""`         |
| _option_   | 配置             | `LayerProps` | `{}`         |

:::

::: describe `defaultOption` 如下：
:::

::: table

| 属性          | 描述       | 值      |
| ------------- | ---------- | ------- |
| _type_        | 类型       | `0`     |
| _content_     | 内容       | _msg_   |
| _shade-close_ | 遮罩层关闭 | `false` |

:::

::: describe 可选属性如下：
:::

::: describe 没有可选属性。
:::

::: title layer.photos
:::

::: describe 展示一系列的图片。
:::

::: describe `option` 如下：
:::

::: table

| 参数名     | 描述             | 类型                   | 默认值       |
| ---------- | ---------------- | ---------------------- | ------------ |
| _option_   | 配置             | `string` `ImgListType` |              |

:::

::: describe `defaultOption` 如下：
:::

::: table

| 属性            | 描述         | 值      |
| --------------- | ------------ | ------- |
| _type_          | 类型         | `5`     |
| _anim_          | 入场动画     | `2`     |
| _start-index_   | 初始图片索引 | `0`     |
| _is-out-anim_   | 出场动画     | `true`  |
| _shade-close_   | 遮罩层关闭   | `true`  |
| _shade-opacity_ | 遮罩层透明度 | `"0.2"` |

:::

::: describe 可选属性如下：
:::

::: table

| 属性          | 描述         | 类型                 | 默认值 | 可选值 |
| ------------- | ------------ | -------------------- | ------ | ------ |
| _start-index_ | 初始图片索引 | `number`             | `0`    |        |
| _img-list_    | 图片列表     | `Array<ImgListType>` | `[]`   |        |

:::

::: describe `ImgListType` 如下：
:::

::: table

| 属性    | 描述     | 类型     | 默认值 | 可选值 |
| ------- | -------- | -------- | ------ | ------ |
| _src_   | 图片地址 | `string` |        |        |
| _alt_   | 图片描述 | `string` | `""`   |        |
| _thumb_ | 缩略图   | `string` | `""`   |        |

:::

::: title layer.notify
:::

::: describe 显示通知。
:::

::: describe `option` 如下：
:::

::: table

| 参数名     | 描述             | 类型         | 默认值       |
| ---------- | ---------------- | ------------ | ------------ |
| _option_   | 配置             | `LayerProps` |              |
| _callback_ | 弹层创建后的回调 | `Function`   | `(id) => {}` |

:::

::: describe `defaultOption` 如下：
:::

::: table

| 属性     | 描述     | 值       |
| -------- | -------- | -------- |
| _offset_ | 位置     | `"rt"`   |
| _time_   | 关闭时间 | `2000`   |
| _area_   | 尺寸     | `"auto"` |
| _shade_  | 遮罩层   | `false`  |

:::

::: describe 可选属性如下：
:::

::: describe 没有可选属性。
:::

::: title layer.prompt
:::

::: describe 让用户输入少量内容。
:::

::: describe `option` 如下：
:::

::: table

| 参数名     | 描述             | 类型         | 默认值       |
| ---------- | ---------------- | ------------ | ------------ |
| _option_   | 配置             | `LayerProps` |              |

:::

::: describe `defaultOption` 如下：
:::

::: table

| 属性            | 描述         | 值         |
| --------------- | ------------ | ---------- |
| _type_          | 类型         | `7(prompt)` |
| _shade-close_   | 遮罩层关闭   | `false`    |
| _shade-opacity_ | 遮罩层透明度 | `"0.2"`    |

:::

::: describe 可选属性如下：
:::

::: table

| 属性          | 描述         | 类型              | 默认值         | 可选值                                         |
| ------------- | ------------ | ----------------- | -------------- | ---------------------------------------------- |
| _form-type_   | 表单类型     | `string` `number` | `"text"`       | `0` `1` `2` `"text"` `"password"` `"textarea"` |
| _value_       | 表单初始值   | `string`          | `""`           |                                                |
| _max-length_  | 最大输入长度 | `number`          |                |                                                |
| _placeholder_ | 占位符       | `string`          | `"请输入内容"` |                                                |
| _yes_         | 点击底部默认按钮(回调第 `2` 个参数可以拿到输入框内容)  | `(id, PromptValue) => void` |      |        |  

:::

::: title types
:::

```ts
type BtnType = {
  text: string;
  style?: string | StyleValue;
  class?: string;
  disabled?: boolean;
  callback: (id: string, ...args: any) => void;
};

type ImgListType = {
  src: string;
  alt?: string;
  thumb?: string;
};

type PropsContentType = VNodeTypes | (() => VNodeTypes);

type OperateEndReturn = void | [string, string] | undefined;

interface MoveEndFnOptions {
  left: string;
  top: string;
  isMax: boolean;
  isMin: boolean;
}

type MoveEndFn = (
  id: string,
  options: MoveEndFnOptions
) => OperateEndReturn;

interface ResizeEndFnOptions {
  width: string;
  height: string;
}

type ResizeEndFn = (
  id: string,
  options: ResizeEndFnOptions
) => OperateEndReturn;

```
