<fieldset class="layui-elem-field layui-field-title">
    <legend>安装</legend>
</fieldset>

通过 npm 工具安装 :

```
npm install @layui/layer-vue
```

在 main.ts 完成 layer-vue 的注册, 并导入 css 文件 :

```
import App from './App';
import { createApp } from 'vue';
import layer from '@layui/layer-vue';
import '@layui/layer-vue/lib/index.css';

const app = createApp(App);

app.use(layer).mount('#app');
```

<fieldset class="layui-elem-field layui-field-title">
    <legend>场景</legend>
</fieldset>

因 layer-vue 可以独立使用，也可以在 layui-vue 中使用。所以请按照你的实际需求来选择。

如果你想独立使用 layer-vue, 你需要通过 npm 安装。如果你使用的是 layui-vue, 那么你无需安装 layer-vue。 

<fieldset class="layui-elem-field layui-field-title">
    <legend>入门</legend>
</fieldset>

我们提供 `layer` 函数来创建弹出层 :

```
<template>
  <button type="button" @click="open">打开</button>
</template>

<script setup>
import { layer } from "@layui/layer-vue";

const open = function () {
  layer.open({title:"标题", content: "内容"});
};
</script>
```

但在较为复杂的应用场景中, `lay-layer` 是一个更好的选择 :

```
<template>
  <button @click="changeVisible">显示/隐藏</button>
  <lay-layer v-model="visible">
    content
  </lay-layer>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);

const changeVisible = () => {
  visible.value = !visible.value;
}
</script>
```

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
import { layer } from  "../../../../layer/src/index"

const msg = function() {
    layer.msg("普通消息", { time: 1000 })
}

const success = function() {
    layer.msg("成功消息", { time: 1000, icon: 1})
}

const failure = function() {
    layer.msg("失败消息", { time: 1000, icon: 2})
}

const warm = function() {
    layer.msg("警告消息", { time: 1000, icon: 3})
}

const info = function() {
    layer.msg("疑问消息", { time: 1000, icon: 4})
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
    layer.load(0, {time: 2000})
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
    <button @click="open">小试牛刀</button>
    <button @click="openSize">指定尺寸</button>
    <button @click="openOffset">指定位置</button>
    <button @click="openIframe">远程窗体</button>
    <button @click="openHtml">HTML</button>
    <button @click="openVNode">vNode</button>
    <button @click="openMaxmin">缩小放大</button>
    <button @click="openResize">尺寸拉伸</button>
    <button @click="openIndex">设置层级</button>
    <button @click="openAreaAuto">内容自撑开</button>
    <button @click="openBtns">自定义按钮组</button>
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
        content: "http://layui-vue.pearadmin.com"
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
        content: "内容"
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
        title: "标题",
        zIndex: 666,
        content: "设置层级"
    })
}

const openAreaAuto = function(){
    layer.open({
        type:1,
        title:"area:auto",
        isHtmlFragment:true,
        content:"<img src='https://chixian.oss-cn-hangzhou.aliyuncs.com/20210819230007_346ce.jpeg'/>"
    })
}

const openBtns = function(){
    layer.open({
        type:1,
        title:"自定义按钮",
        btn:[{text:"第一个按钮",callback:function(){
            console.log("第一个按钮被点击");
        }},{text:"第二个按钮",callback:function(){
            console.log("第二个按钮被点击");
        }}]
    })
}
</script>

:::

<fieldset class="layui-elem-field layui-field-title">
    <legend>询问</legend>
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
    layer.confirm("你如何看待 layui-vue 的发布", {btn: [{text:'站着看', callback: function(){
        layer.msg("有点意思");
    }},{text:'坐着看', callback: function(){
        layer.msg("无聊");
    }}]})
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
</template>

<script setup>
import { layer } from  "../../../../layer/src/index"

const openTop = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        offset: "t"
    })
}

const openBottom = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        offset: "b"
    })
}

const openLeft = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        offset: "l"
    })
}

const openRight = function() {
    layer.drawer({
        title: "标题",
        content: "内容",
        offset: "r"
    })
}
</script>
:::

<fieldset class="layui-elem-field layui-field-title">
    <legend>图片层</legend>
</fieldset>

::: demo 通过 layer.photos(options) 创建图片预览弹层, 参数`options`主要传入预览的图片链接。

<template>
    <button @click="signleImg">快速预览一张图片</button>
    <button @click="signleImg2">单张图片带文字描述</button>
    <button @click="groupImg">图片组</button>
</template>

<script>
import { layer } from  "../../../../layer/src/index"

const signleImg = function() {
    layer.photos("/src/assets/logo.jpg")
}
const signleImg2 = function() {
    layer.photos({
      imgList:[ {src:'/src/assets/logo.jpg',alt:'layer for vue'}]
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


<fieldset class="layui-elem-field layui-field-title">
    <legend>通讯</legend>
</fieldset>

::: demo 👉 查看 [Children1.vue](https://gitee.com/layui-vue/layer-vue/blob/master/example/src/components/Children1.vue), 通过 h() 函数的第二个参数向 Children1.vue 传递响应式变量。

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

::: demo 👉 查看 [Children2.vue](https://gitee.com/layui-vue/layer-vue/blob/master/example/src/components/Children2.vue), 通过 h() 函数的第二个参数声明 onXxx() 形式的函数完成 Children2.vue 的事件监听。 

<template>
  <button @click="openComponent2">事件</button>
  <input type="text" v-model="numb" />
</template>

<script setup>
import { reactive, h, resolveComponent } from 'vue'
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
    <legend>组件</legend>
</fieldset>

::: demo 我们提供了一些核心函数来创建弹出层, 但在一些复杂的应用场景中, `lay-layer`是一个更好的选择。

<template>
  <button @click="changeVisible">{{ visible ? '隐藏':'显示' }}</button>
  <lay-layer title="标题" v-model="visible" :area="['300px','300px']">
    content
  </lay-layer>
</template>

<script setup>
import { ref, reactive, h } from 'vue'
import { layer } from  "../../../../layer/src/index"

const visible = ref(false)
const changeVisible = () => {
  visible.value = !visible.value;
}
</script>

:::

<fieldset class="layui-elem-field layui-field-title">
    <legend>选项</legend>
</fieldset>

我们提供了丰富的 `options` 配置, 你可以通过配置来满足对 layer 的定制化, 需要注意的是有些属性仅适用部分组件。

| 属性 | 描述 | 类型 | 默认值 | 可选值 |
| -- | -- | -- | -- | -- |
| type | 类型 | string | `1` | `0` `1` `2` `3` |
| title | 标题 | string boolean | `信息` | -- |
| content | 内容 | string vnode | -- | -- |
| v-model | 显示 | boolean | `false`  | `true` `false` |
| offset | 位置 | string array | `['50%','50%']` | -- |
| area | 尺寸 | string array | `auto`  | -- |
| move | 拖拽 | boolean | `true` | `true` `false` |anim
| maxmin | 缩放 | boolean | `false` | `true` `false` |
| resize | 拉伸 | boolean | `false` | `true` `false` |
| anim | 入场动画 | number | `0` | `0` - `6` |
| isOutAnim | 出场动画 | boolean | `true` | `true` `false` |
| btnAlign | 按钮位置 | string | `r` | `l` `c` `r` |
| closeBtn | 关闭按钮 | boolean | `true` | `true` `false` |
| time | 关闭时间 | number | `0` | -- |
| shade | 遮盖层 | boolean | `true` | `true` `false` |
| shadeClose | 遮盖层关闭 | boolean | `true` | `true` `false` |
| shadeOpacity | 遮盖层透明度 | string | `0.1` | `0.1` - `1` |
| isHtmlFragment | 解析 html 字符 | boolean | `false` | `true` `false` |
| imgList | 图片数据数组 | array[{src:图片链接,alt:图片名字可选'}] | - | - |
<fieldset class="layui-elem-field layui-field-title">
    <legend>动画</legend>
</fieldset>

anim：Number，默认：0

我们的出场动画全部采用CSS3。这意味着除了ie6-9，其它所有浏览器都是支持的。目前anim可支持的动画类型有0-6 如果不想显示动画，设置 anim: -1 即可。

另外需要注意的是，3.0之前的版本用的是 shift 参数。

| 属性 | 描述 |
| -- | -- | 
| anim:0 | 平滑放大 | 
| anim:1 | 从上掉落 | 
| anim:2 | 从最底部往上滑入 | 
| anim:3 | 从左滑入 | 
| anim:4 | 从左翻滚 | 
| anim:5 | 渐显 |
| anim:5 | 抖动 |

<fieldset class="layui-elem-field layui-field-title">
    <legend>问题</legend>
</fieldset>

直接调用 layer 的方法，组件会通过 Vue.render 动态创建新的 Vue 实体。其 context 与当前代码所在 context 并不相同，因而无法获取 context 信息。

当你需要 context 信息（例如使用全局注册的组件）时，可以通过 appContext 属性传递当前组件 context, 当你需要保留属性响应式时，你可以使用函数返回:

```
import { getCurrentInstance, ref } from 'vue';
import { layer } from "@layui/layer-vue";

const appContext = getCurrentInstance().appContext;

const title = ref("标题")

layer.open({
    title: () => title.value,
    content: h("children"),
    appContext: appContext
})
```

<fieldset class="layui-elem-field layui-field-title">
    <legend>结语</legend>
</fieldset>

::: demo 以写作为工具，为道途，先帮助自己一程，再以自己的领悟帮助他人一程, 这是一种服务 -- 庆山
<template></template>
<script setup></script>
:::