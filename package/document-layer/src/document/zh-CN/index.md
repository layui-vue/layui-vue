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