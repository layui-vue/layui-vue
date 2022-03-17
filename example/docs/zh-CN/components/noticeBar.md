::: anchor
:::

::: title 基本介绍
:::

::: describe 全局展示操作反馈信息。
:::

::: title 基础使用
:::

::: demo

<template>
    <lay-notice-bar text="要不要作为我的家人，搬来我家。" mode="link"></lay-notice-bar>
</template>

<script>
import { layer } from "@layui/layer-vue"

export default {
  setup() {

    return {
    }
  }
}
</script>

:::

::: title 使用图标
:::

::: demo

<template>
    <lay-notice-bar leftIcon="layui-icon-mute" text="要不要作为我的家人, 搬来我家" mode="closeable"></lay-notice-bar>
</template>

<script>
import { ref } from "vue"

export default {
  setup() {

    return {
    }
  }
}
</script>

:::


::: title 允许关闭
:::

::: demo

<template>
    <lay-notice-bar leftIcon="layui-icon-mute" rightIcon="layui-icon-close" text="多的是你不知道的事" mode="closeable"></lay-notice-bar>
</template>

<script>
import { ref } from "vue"

export default {
  setup() {

    const visible = ref(true);

    return {
        visible
    }
  }
}
</script>

:::