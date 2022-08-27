::: anchor
:::

::: title 基本介绍
:::

::: describe 标签组件。
:::

::: title 基础使用
:::

::: demo 标签的基本用法。

<template>
<lay-space size="md">
  <lay-tag>标签</lay-tag>
  <lay-tag bordered color="#FFF">标签</lay-tag>
  <lay-tag closable>标签</lay-tag>
  <lay-tag closable disabled>标签</lay-tag>
  <lay-tag closable max-width="120px" title="超过设置长度省略文本">超过设置长度省略文本</lay-tag>
</lay-space>
</template>

<script>
</script>

:::

::: title 标签尺寸
:::

::: demo 通过 size 属性控制标签尺寸。

<template>
<lay-space direction="vertical" size="md">
<lay-space size="md">
  lg: 
  <lay-tag size="lg">tag lg</lay-tag>
  <lay-tag size="lg"><template #icon><lay-icon type="layui-icon-addition" /></template>tag lg</lay-tag>
  <lay-tag size="lg" closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    tag lg
  </lay-tag>
</lay-space>
<lay-space size="md">
  md: 
  <lay-tag size="md">tag md</lay-tag>
  <lay-tag size="md"><template #icon><lay-icon type="layui-icon-addition" /></template>tag md</lay-tag>
  <lay-tag size="md" closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    tag md
  </lay-tag>
</lay-space>
<lay-space size="md">
  sm: 
  <lay-tag size="sm">tag sm</lay-tag>
  <lay-tag size="sm"><template #icon><lay-icon type="layui-icon-addition" /></template>tag sm</lay-tag>
  <lay-tag size="sm" closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    tag sm
  </lay-tag>
</lay-space>
<lay-space size="md">
  xs: 
  <lay-tag size="xs">tag xs</lay-tag>
  <lay-tag size="xs"><template #icon><lay-icon type="layui-icon-addition" /></template>tag xs</lay-tag>
  <lay-tag size="xs" closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    tag xs
  </lay-tag>
</lay-space>
</lay-space>
</template>

<script>
</script>
<style>
.tag-demo {
  width: 500px;
  display: flex;
  margin-bottom: 15px;
}
.tag-demo .layui-tag{
  margin-right: 15px;
}
</style>

:::

::: title 可关闭
:::

::: demo 通过 closable 属性控制标签是否可关闭

<template>
<lay-space size="md">
  <lay-tag closable>Tag</lay-tag>
  <lay-tag closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    Tag 2
  </lay-tag>
  <lay-tag closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    自定义关闭图标
    <template #close-icon><lay-icon type="layui-icon-close-fill" /></template>
  </lay-tag>
</lay-space>
</template>

<script>
</script>
<style>
.tag-demo {
  width: 500px;
  display: flex;
  margin-bottom: 15px;
}
.tag-demo .layui-tag{
  margin-right: 15px;
}
</style>

:::

::: title 标签颜色
:::

::: demo 标签颜色, 非内置颜色只支持默认样式, plain 默认有边框。

<template>
<lay-space direction="vertical" size="md">
  default:
  <lay-space size="md">
    <lay-tag v-for="color in TAG_COLORS" :color="color">标签</lay-tag>
  </lay-space>
  <lay-space size="md">
    <lay-tag v-for="color in TAG_COLORS" :color="color" bordered closable>标签</lay-tag>
  </lay-space>
  light:
  <lay-space size="md">
    <lay-tag v-for="color in TAG_COLORS" :color="color" variant="light">标签</lay-tag>
  </lay-space>
  <lay-space size="md">
    <lay-tag v-for="color in TAG_COLORS" :color="color" variant="light" bordered closable>标签</lay-tag>
  </lay-space>
  plain:
  <lay-space size="md">
    <lay-tag v-for="color in TAG_COLORS" :color="color" variant="plain">标签</lay-tag>
  </lay-space>
  <lay-space size="md">
    <lay-tag v-for="color in TAG_COLORS" :color="color" variant="plain" bordered closable>标签</lay-tag>
  </lay-space>
  custom:
  <lay-space size="md">
    <lay-tag v-for="color in COLORS" :color="color" variant="plain">标签</lay-tag>
  </lay-space>
  <lay-space size="md">
    <lay-tag v-for="color in COLORS" :color="color" variant="plain" bordered closable>标签</lay-tag>
  </lay-space>
</lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

  const TAG_COLORS = [
  "red",
  "orange",
  "green",
  "cyan",
  "blue",
  "black",
  "gray",
];

const COLORS = [
  "#EEE",
  "#67C23A",
  "#0fc6c2",
  "#165dff"
];

    return {
      TAG_COLORS,
      COLORS
    }
  }
}
</script>
<style>
.tag-demo {
  width: 500px;
  display: flex;
  margin-bottom: 15px;
}
.tag-demo .layui-tag{
  margin-right: 15px;
}
.tag-demo-variant{
  margin-bottom: 10px;
}
</style>

:::

::: title 图标插槽
:::

::: demo 通过插槽自定义图标。

<template>
<lay-space size="md">
  <lay-tag bordered size="lg" color="#FFF">
    <template #icon>
      <lay-icon type="layui-icon-vercode" />
    </template>
    tag
  </lay-tag>
  <lay-tag bordered size="lg" color="#FFF">
    <template #icon>
      <lay-icon type="layui-icon-login-qq" />
    </template>
    tag
  </lay-tag>
  <lay-tag bordered size="lg" color="#FFF">
    <template #icon>
      <lay-icon type="layui-icon-star-fill" />
    </template>
    tag
  </lay-tag>
</lay-space>
</template>

<script>
</script>
<style>
.tag-demo {
  width: 500px;
  display: flex;
  margin-bottom: 15px;
}
.tag-demo .layui-tag{
  margin-right: 15px;
}
</style>

:::

::: title 动态编辑
:::

::: demo 标签的基本用法。

<template>
  {{ tagData }}
  <br><br>
  <template v-for="(tag, index) of tagData" :key="`tag-${index}`">
  <lay-tag 
    closable
    @close="handleClose(index)"
    color="#EEE"
    style="margin-right: 5px;"
    >
    {{tag}}
  </lay-tag>
  </template>
  <span id="tagDemo" @click="handlerFocus">
    <lay-input 
    v-if="showInput"   
    ref="inputRef"      
    v-model.trim="inputVal"
    autofocus
    style="width:60px; height:24px"
    @keyup.enter="handleAdd"
    @blur="handleAdd" />
  <lay-tag 
    v-else 
    color="#EEE" 
    >
    <template #icon>
      <lay-icon type="layui-icon-addition"/>
    </template>
    添加
  </lay-tag>
  </span>
</template>

<script>
import { ref, nextTick } from 'vue';

export default {
  setup() {
    const tagData = ref(['Tag']);
    const inputRef = ref(null);
    const showInput = ref(false);
    const inputVal = ref('');

    const handleAdd = () => {
      if (inputVal.value) {
        tagData.value.push(inputVal.value);
        inputVal.value = '';
      }
      showInput.value = false;
    };

    const handleClose = (index) => {
      tagData.value.splice(index, 1);
    };

    const handlerFocus = (e) => {
      showInput.value = true;
      console.log("FIXME 临时")
      setTimeout(() => {
        document.querySelector('#tagDemo input').focus()
      },200)
 
    }

    return {
      tagData,
      inputRef,
      showInput,
      inputVal,
      handleAdd,
      handleClose,
      handlerFocus,
    };
  },
};
</script>
:::


::: title Tag 属性
:::

::: table

| 属性        | 描述     | 类型    | 默认值    | 可选值                             |
| ----------- | -------- | ------ | ------ | ------ |
| size | 标签大小 | string | md | `lg` `md` `sm` `xs`|
| color | 标签颜色 | string | `#EEE`| `red` `orange` `green` `cyan` `blue` `black` `gray` `string` | 
| bordered | 是否显示边框 | boolean | false | `true` `false`|
| closable | 是否可关闭 | boolean | false | `true` `false`|
| variant  | 标签风格  | string | `default` | `default` `light` `plain`|
| disabled | 禁用标签  | boolean | false | `true` `false`|
| shape    | 标签类型  | string | square | `square` `round`|
| maxWidth | 标签最大宽度 | string| -- | --|

:::

:::title Tag 插槽
:::

:::table
| 插槽 | 描述 | 参数 |
|------ |----------|-----------|
| default | 默认插槽 | - |
| icon | 图标 | - |
| close-icon | 关闭图标 | - |
:::

:::title Tag 事件
:::

:::table
| 事件 | 描述 | 参数 |
|------ |----------|-----------|
| close | 关闭时触发 | e: MouseEvent |
:::

::: contributor tag
:::  

::: previousNext tag
:::