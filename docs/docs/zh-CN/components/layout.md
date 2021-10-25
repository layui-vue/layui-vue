::: title 基础使用
:::

::: demo

<template>
  <lay-layout>
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
.lay-code .layui-footer,
.lay-code .layui-header {
  line-height: 60px;
  text-align: center;
  background: #87ca9a;
  color: white;
}
.lay-code .layui-side {
  display: flex;
  background: #77c38c;
  align-items: center;
  justify-content: center;
  color: white;
}
.lay-code .layui-body {
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
  <lay-layout>
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

:::

::: title 后台布局
:::

::: demo

<template>
  <lay-layout>
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

:::

::: title 复杂布局
:::

::: demo

<template>
  <lay-layout>
    <lay-side>side</lay-side>
    <lay-layout>
      <lay-header>header</lay-header>
      <lay-body>body</lay-body>
      <lay-footer>footer</lay-footer>
    </lay-layout>
  </lay-layout>
  <hr>
  <lay-layout>
    <lay-layout>
      <lay-header>header</lay-header>
      <lay-body>body</lay-body>
      <lay-footer>footer</lay-footer>
    </lay-layout>
    <lay-side>side</lay-side>
  </lay-layout>
  <hr>
  <lay-layout>
    <lay-header>Header</lay-header>
    <lay-body>
      <lay-layout>
        <lay-side :width="160">Left</lay-side>
        <lay-body>Content</lay-body>
      </lay-layout>
    </lay-body>
    <lay-footer>Footer</lay-footer>
  </lay-layout>
  <hr>
  <lay-layout>
    <lay-header>Header</lay-header>
    <lay-body>
      <lay-layout>
        <lay-body>Content</lay-body>
        <lay-side :width="160">Right</lay-side>
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

:::

<br>
<br>

::: title 布局组件
:::

|            |      |     |
| ---------- | ---- | --- |
| lay-layout | 容器 | --  |
| lay-header | 顶部 | --  |
| lay-logo   | 图标 | --  |
| lay-side   | 侧边 | --  |
| lay-body   | 内容 | --  |
| lay-footer | 底部 | --  |
