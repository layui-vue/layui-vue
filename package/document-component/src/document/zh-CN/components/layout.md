::: anchor
:::

::: title 基本介绍
:::

::: describe 既可编织出绚丽的前台页面，又可满足繁杂的管理系统界面需求。
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-layout class="example">
    <lay-header>header</lay-header>
    <lay-body>content</lay-body>
    <lay-footer>footer</lay-footer>
  </lay-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    return {
    }
  }
}
</script>

<style>
.example .layui-footer,
.example .layui-header {
  line-height: 60px;
  text-align: center;
  background: #87ca9a;
  color: white;
}
.example .layui-side {
  display: flex;
  background: #77c38c;
  align-items: center;
  justify-content: center;
  color: white;
}
.example .layui-body {
  display: flex;
  background: #5FB878;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>

:::

::: title 左右布局
:::
 
::: demo

<template>
  <lay-layout class="example">
    <lay-side>left</lay-side>
    <lay-body>content</lay-body>
    <lay-side>right</lay-side>
  </lay-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    return {
    }
  }
}
</script>
<style>
.example .layui-footer,
.example .layui-header {
  line-height: 60px;
  text-align: center;
  background: #87ca9a;
  color: white;
}
.example .layui-side {
  display: flex;
  background: #77c38c;
  align-items: center;
  justify-content: center;
  color: white;
}
.example .layui-body {
  display: flex;
  background: #5FB878;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>

:::

::: title 后台布局
:::

::: demo

<template>
  <lay-layout class="example">
    <lay-header>header</lay-header>
    <lay-layout>
      <lay-side>side</lay-side>
      <lay-body>content</lay-body>
    </lay-layout>
  </lay-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    return {
    }
  }
}
</script>
<style>
.example .layui-footer,
.example .layui-header {
  line-height: 60px;
  text-align: center;
  background: #87ca9a;
  color: white;
}
.example .layui-side {
  display: flex;
  background: #77c38c;
  align-items: center;
  justify-content: center;
  color: white;
}
.example .layui-body {
  display: flex;
  background: #5FB878;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>

:::

::: title 复杂布局
:::

::: demo

<template>
  <lay-layout class="example">
    <lay-side>side</lay-side>
    <lay-layout>
      <lay-header>header</lay-header>
      <lay-body>body</lay-body>
      <lay-footer>footer</lay-footer>
    </lay-layout>
  </lay-layout>
  <hr>
  <lay-layout class="example">
    <lay-layout>
      <lay-header>header</lay-header>
      <lay-body>body</lay-body>
      <lay-footer>footer</lay-footer>
    </lay-layout>
    <lay-side>side</lay-side>
  </lay-layout>
  <hr>
  <lay-layout class="example">
    <lay-header>Header</lay-header>
    <lay-body>
      <lay-layout>
        <lay-side>Left</lay-side>
        <lay-body>Content</lay-body>
      </lay-layout>
    </lay-body>
    <lay-footer>Footer</lay-footer>
  </lay-layout>
  <hr>
  <lay-layout class="example">
    <lay-header>Header</lay-header>
    <lay-body>
      <lay-layout>
        <lay-body>Content</lay-body>
        <lay-side>Right</lay-side>
      </lay-layout>
    </lay-body>
    <lay-footer>Footer</lay-footer>
  </lay-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    return {
    }
  }
}
</script>
<style>
.example .layui-footer,
.example .layui-header {
  line-height: 60px;
  text-align: center;
  background: #87ca9a;
  color: white;
}
.example .layui-side {
  display: flex;
  background: #77c38c;
  align-items: center;
  justify-content: center;
  color: white;
}
.example .layui-body {
  display: flex;
  background: #5FB878;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>

:::

<br>
<br>

::: title 布局组件
:::

::: table

| 组件       | 描述 |     |
| ---------- | ---- | --- |
| lay-layout | 容器 | --  |
| lay-header | 顶部 | --  |
| lay-logo   | 图标 | --  |
| lay-side   | 侧边 | --  |
| lay-body   | 内容 | --  |
| lay-footer | 底部 | --  |

:::

::: contributor layout
:::  

::: previousNext layout
:::