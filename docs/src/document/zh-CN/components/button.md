::: anchor
:::

::: title 基本介绍
:::

::: describe 按钮用于开始一个即时操作。
:::

::: title 基础使用
:::

::: demo 使用 `lay-button` 标签, 创建一个按钮。

<template>
  <lay-button>默认按钮</lay-button>
  <lay-button type="primary">原始按钮</lay-button>
  <lay-button type="normal">百搭按钮</lay-button>
  <lay-button type="warm">暖色按钮</lay-button>
  <lay-button type="danger">警告按钮</lay-button>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::

::: title 简约按钮
:::

::: demo 通过 `border` 属性设置边框颜色。

<template>
  <lay-button>原始按钮</lay-button>
  <lay-button border="green">默认按钮</lay-button>
  <lay-button border="blue">百搭按钮</lay-button>
  <lay-button border="orange">暖色按钮</lay-button>
  <lay-button border="red">警告按钮</lay-button>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::

::: title 次要按钮
:::

::: demo 通过 `border-style` 属性设置边框样式。

<template>
  <lay-button border-style="dashed">原始按钮</lay-button>
  <lay-button border="green" border-style="dashed">默认按钮</lay-button>
  <lay-button border="blue" border-style="dashed">百搭按钮</lay-button>
  <lay-button border="orange" border-style="dashed">暖色按钮</lay-button>
  <lay-button border="red" border-style="dashed">警告按钮</lay-button>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::

::: title 按钮尺寸
:::

::: demo 通过 `size` 属性, 创建指定尺寸的按钮, 可选值 `lg` `sm` `xs`。

<template>
  <lay-button type="primary" size="lg">原始按钮</lay-button>
  <lay-button type="default" size="lg">默认按钮</lay-button>
  <lay-button type="normal" size="lg">百搭按钮</lay-button>
  <lay-button type="warm" size="lg">暖色按钮</lay-button>
  <lay-button type="danger" size="lg">警告按钮</lay-button>
  <lay-button disabled size="lg">禁用按钮</lay-button>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::

::: title 流式按钮
:::

::: demo 通过 `fluid` 属性, 使其适合父级最大宽度。

<template>
  <lay-button type="primary" fluid>最大化按钮</lay-button>
  <br/>
  <br/>
  <lay-button type="default" fluid>最大化按钮</lay-button>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::

::: title 圆角按钮
:::

::: demo 通过 `radius` 属性，创建圆角按钮。

<template>
  <lay-button type="primary" radius>原始按钮</lay-button>
  <lay-button type="default" radius>默认按钮</lay-button>
  <lay-button type="normal" radius>百搭按钮</lay-button>
  <lay-button type="warm" radius>暖色按钮</lay-button>
  <lay-button type="danger" radius>警告按钮</lay-button>
  <lay-button disabled radius>禁用按钮</lay-button>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::

::: title 按钮分组
:::

::: demo 使用 `lay-button-group` 标签, 配合 `lay-button` 标签, 创建按钮组。

<template>
  <div>
    <lay-button-group>
      <lay-button type="default">默认按钮</lay-button>
      <lay-button type="default">默认按钮</lay-button>
      <lay-button type="default">默认按钮</lay-button>
    </lay-button-group>
    <br>
    <br>
    <lay-button-group>
      <lay-button type="primary">默认按钮</lay-button>
      <lay-button type="primary">默认按钮</lay-button>
      <lay-button type="primary">默认按钮</lay-button>
    </lay-button-group>
    <br>
    <br>
    <lay-button-group>
      <lay-button border="green" border-style="dashed">默认按钮</lay-button>
      <lay-button border="green" border-style="dashed">默认按钮</lay-button>
      <lay-button border="green" border-style="dashed">默认按钮</lay-button>
    </lay-button-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::

::: title 图标按钮
:::

::: demo 使用 `lay-icon` 标签, 配合 `lay-button` 标签, 创建图标按钮。

<template>
  <lay-button-container>
      <lay-button type="primary"><lay-icon type="layui-icon-left"></lay-icon></lay-button>
      <lay-button type="primary"><lay-icon type="layui-icon-right"></lay-icon></lay-button>
      <lay-button prefix-icon="layui-icon-left" suffix-icon="layui-icon-right">文字</lay-button>
  </lay-button-container>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::

::: title 按钮容器
:::

::: demo 尽管按钮在同节点并排时会自动拉开间距，但在按钮太多的情况，效果并不是很美好。因此你需要用到按钮容器。

<template>
  <lay-button-container>
      <lay-button type="default">新增</lay-button>
      <lay-button type="default">删除</lay-button>
      <lay-button type="default">修改</lay-button>
  </lay-button-container>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::

::: title 加载按钮
:::

::: demo 通过 `loading` 属性, 控制按钮的加载状态。

<template>
  <lay-button-container>
      <lay-button type="primary" :loading="loadState" @click="loadStateClick">加载</lay-button>
      <lay-button type="default" :loading="loadState" loadingIcon="layui-icon-loading">加载</lay-button>
      <lay-switch v-model="loadState"></lay-switch>
  </lay-button-container>
</template>

<script setup>
import { ref } from 'vue';

const loadState = ref(true);

const loadStateClick = () => {
  alert("触发")
}
</script>

:::

::: title 事件处理
:::

::: demo 使用 `@click` 设置单击回调。

<template>
  <lay-button type="default" @click="clickHandle">单击事件</lay-button>
</template>

<script setup>
import { ref } from 'vue';

const clickHandle = () => {
  console.log('点击事件')
}
</script>

:::

::: title 下拉按钮
:::

::: demo 使用 `lay-button` 组件，配合 `lay-dropdown` 系列组件，完成下拉菜单。

<template>
	<lay-button-group>
  	<lay-button type="primary">更多操作</lay-button>   
  	<lay-dropdown placement="bottom-end">
    	<lay-button type="primary" style="padding-left:8px;padding-right:8px;">
      	<lay-icon type="layui-icon-down"></lay-icon>
    	</lay-button>
    	<template #content>
      	<lay-dropdown-menu style="width: 130px">
        	<lay-dropdown-menu-item>复制</lay-dropdown-menu-item>
        	<lay-dropdown-menu-item>删除</lay-dropdown-menu-item>
      </lay-dropdown-menu>
    </template>
  </lay-dropdown>
  </lay-button-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
</script>

:::

::: title Button 属性
:::

::: table

| 名称         | 描述                       | 类型       | 默认值    | 可选值                                  |
| ------------ | ------------------------- | --------- | --------- | --------------------------------------- |
| type         | 主题                      | `string`  | `primary` | `primary` `normal` `warm` `danger`       |
| size         | 尺寸                      | `string`  | --        | `lg` `sm` `xs`                           |
| fluid        | 最大化                    | `boolean` | `false`   | `true` `false`                           |
| radius       | 圆角                      | `boolean` | `false`   | `true` `false`                           |
| border       | 边框                      | `string`  | `green`   | `green` `blue` `orange` `red`            |
| border-style | 边框样式                  | `string`  | `soild`   | `soild` `dashed` `dotted`                |
| disabled     | 禁用                      | `boolean` | `false`   | `true` `false`                           |
| loading      | 加载                      | `boolean` | `false`   | `true` `false`                           |
| native-type  | 原生类型                  | `string`  | `button`  | `button` `submit` `reset`                 |
| prefix-icon  | 前置图标                  | `string`  | --        | <a href="/zh-CN/components/icon">前往</a> |
| suffix-icon  | 后置图标                  | `string`  | --        | <a href="/zh-CN/components/icon">前往</a> |
| loading-icon | 后置图标                  | `string`  | --        | <a href="/zh-CN/components/icon">前往</a> |

:::

::: title Button 插槽
:::

::: table

| 名称    | 描述     | 参数 |
| ------- | -------- | ---- |
| default | 默认内容 | --   |

:::

::: title Button Group 属性
:::

::: table

| 名称 | 描述 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| -    | -    | -    | -      |

:::

::: title Button Group 插槽
:::

::: table

| 名称    | 描述     | 参数 |
| ------- | -------- | ---- |
| default | 默认内容 | --   |

:::

::: previousNext button
:::
