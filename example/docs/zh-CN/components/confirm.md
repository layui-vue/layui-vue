::: title 基础使用
:::

::: demo

<template>
    <lay-button type="primary" @click="openConfirm1">信息框</lay-button>
</template>

<script>
import { layer } from "../../../../src/index.ts"

export default {
  setup() {

    const openConfirm1 = function() {
        layer.confirm("layui-vue 1.0.0 已经发布")
    }

    return {
        openConfirm1
    }
  }
}
</script>

:::

::: title 指定操作
:::

::: demo

<template>
    <lay-button type="primary" @click="openConfirm2">询问框</lay-button>
</template>

<script>
import { layer } from "../../../../src/index.ts"

export default {
  setup() {

    const openConfirm2 = function() {
        layer.confirm("你如何看待 layui-vue 的发布", {btn: [{text:'站着看'},{text:'坐着看'}]})
    }

    return {
        openConfirm2
    }
  }
}
</script>

:::