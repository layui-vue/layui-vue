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
        layer.confirm("你没事吧???")
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
        layer.confirm("你没事吧???", {btn: [{text:'确认'},{text:'取消'}]})
    }

    return {
        openConfirm2
    }
  }
}
</script>

:::