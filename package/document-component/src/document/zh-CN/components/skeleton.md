::: anchor
:::

::: title 基本介绍
:::

::: describe 在需要等待加载内容的位置提供一个占位图形组合。
:::

::: title 基础使用
:::

::: demo 使用 `lay-skeleton` 标签, 创建骨架屏

<template>
<div>
<div style="margin-bottom: 10px">
<lay-switch v-model="loading" onswitch-text="启用" unswitch-text="关闭"></lay-switch>
</div>
  <lay-skeleton :rows="4" :loading="loading" animated>
    <p style="margin-bottom: 18px">1 layui-vue , 基 于 vue 3.0 的 桌 面 端 组 件 库 , layui 的 另 一 种 呈 现 方 式</p>
    <p style="margin-bottom: 18px">2 layui-vue , 基 于 vue 3.0 的 桌 面 端 组 件 库 , layui 的 另 一 种 呈 现 方 式</p>
    <p style="margin-bottom: 18px">3 layui-vue , 基 于 vue 3.0 的 桌 面 端 组 件 库 , layui 的 另 一 种 呈 现 方 式</p>
    <p style="margin-bottom: 18px">4 layui-vue , 基 于 vue 3.0 的 桌 面 端 组 件 库 , layui 的 另 一 种 呈 现 方 式</p>
  </lay-skeleton>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    return {
        loading,
    }
  }
}
</script>

:::

::: title 图片
:::


::: demo

<template>
<div>
<div style="margin-bottom: 10px">
<lay-switch v-model="loading" onswitch-text="启用" unswitch-text="关闭"></lay-switch>
</div>
  <lay-skeleton :loading="loading" animated>
        <template #skeleton>
            <lay-skeleton-item type="image"/>
            <lay-skeleton-item type="p" style="width: 240px"/>
        </template>
    <div class="img-content">
        <img src="https://portrait.gitee.com/uploads/avatars/user/1611/4835367_Jmysy_1578975358.png" />
        <p style="margin-top: 18px">一套开源免费且受众广泛的 Web UI 组件库</p>
    </div>
  </lay-skeleton>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    return {
        loading,
    }
  }
}
</script>

<style>
    .img-content {
        width: 240px;
        height: 240px;
    }
</style>

:::

::: title Skeleton 属性
:::

::: table

| 属性  | 描述 | 可选值 |
| ----- | ---- | ------ |
| loading | 是否显示 | `true` `false`     |
| rows | 显示行数 | --     |
| animated | 是否动画 | `true` `false`    |
| type | 展示类型 | `p` `image`    |

:::

::: title Skeleton 插槽
:::

::: table

| 插槽   | 描述     | 可选值 |
| ------ | -------- | ------ |
| default| 默认插槽 | --     |
| skeleton | 自定义插槽 | --     |

:::

::: contributor skeleton
:::

::: previousNext skeleton
:::