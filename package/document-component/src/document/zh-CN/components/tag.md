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
  <lay-tag>tag</lay-tag>
  &nbsp&nbsp
  <lay-tag bordered color="#FFF">tag</lay-tag>
  &nbsp&nbsp
  <lay-tag closable>tag</lay-tag>
  &nbsp&nbsp
  <lay-tag closable disabled>tag</lay-tag>
</template>

<script>
</script>

:::

::: title 标签尺寸
:::

::: demo 通过 size 属性控制标签尺寸。

<template>
  <lay-tag>default</lay-tag>
  &nbsp&nbsp
  <lay-tag size="lg">tag lg</lay-tag>
  &nbsp&nbsp
  <lay-tag size="md">tag md</lay-tag>
  &nbsp&nbsp
  <lay-tag size="sm">tag sm</lay-tag>
  &nbsp&nbsp
  <lay-tag size="xs">tag xs</lay-tag>
  <br><br>
  <lay-tag><template #icon><lay-icon type="layui-icon-addition" /></template>default</lay-tag>
  &nbsp&nbsp
  <lay-tag size="lg"><template #icon><lay-icon type="layui-icon-addition" /></template>tag lg</lay-tag>
  &nbsp&nbsp
  <lay-tag size="md"><template #icon><lay-icon type="layui-icon-addition" /></template>tag md</lay-tag>
  &nbsp&nbsp
  <lay-tag size="sm"><template #icon><lay-icon type="layui-icon-addition" /></template>tag sm</lay-tag>
  &nbsp&nbsp
  <lay-tag size="xs"><template #icon><lay-icon type="layui-icon-addition" /></template>tag xs</lay-tag>
  <br><br>
  <lay-tag closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    default
  </lay-tag>
  &nbsp&nbsp
    <lay-tag size="lg" closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    tag lg
  </lay-tag>
  &nbsp&nbsp
    <lay-tag size="md" closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    tag md
  </lay-tag>
  &nbsp&nbsp
  <lay-tag size="sm" closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    tag sm
  </lay-tag>
  &nbsp&nbsp
  <lay-tag size="xs" closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    tag xs
  </lay-tag>
  &nbsp&nbsp
</template>

<script>
</script>

:::

::: title 可关闭
:::

::: demo 通过 closable 属性控制标签是否可关闭

<template>
  <lay-tag closable>Tag</lay-tag>
  &nbsp&nbsp
  <lay-tag closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    Tag 2
  </lay-tag>
    &nbsp&nbsp
  <lay-tag closable>
    <template #icon><lay-icon type="layui-icon-addition" /></template>
    自定义关闭图标
    <template #close-icon><lay-icon type="layui-icon-close-fill" /></template>
  </lay-tag>
</template>

<script>
</script>

:::

::: title 标签颜色
:::

::: demo 标签颜色,待优化。

<template>
  <span v-for="color in TAG_COLORS">
  <lay-tag :color="color">Tag</lay-tag>
  &nbsp&nbsp
  </span>
  <br><br>
  <span v-for="color in TAG_COLORS">
  <lay-tag :color="color" bordered>Tag</lay-tag>
  &nbsp&nbsp
  </span>
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
  "#EEE",
  "#5FB878",
  "#FFB800",
];

    return {
      TAG_COLORS
    }
  }
}
</script>

:::

::: title 图标插槽
:::

::: demo 标签的基本用法。

<template>
  <lay-tag bordered size="lg" color="#FFF">
    <template #icon>
      <lay-icon type="layui-icon-vercode" />
    </template>
    tag
  </lay-tag>
  &nbsp&nbsp
  <lay-tag bordered size="lg" color="#FFF">
    <template #icon>
      <lay-icon type="layui-icon-login-qq" />
    </template>
    tag
  </lay-tag>
  &nbsp&nbsp
  <lay-tag bordered size="lg" color="#FFF">
    <template #icon>
      <lay-icon type="layui-icon-star-fill" />
    </template>
    tag
  </lay-tag>
  &nbsp&nbsp
</template>

<script>
</script>

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
| color | 标签颜色 | string | `green`| `red` `orange` `green` `cyan` `blue` `black` `gray` `string` | 
| bordered | 是否显示边框 | boolean | false | `true` `false`|
| closable |  是否可关闭 | boolean | false | `true` `false`|

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