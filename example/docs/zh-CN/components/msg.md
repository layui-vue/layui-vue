::: title 基础使用
:::

::: demo

<template>
    <lay-button type="primary" @click="openMsg">普通消息</lay-button>
</template>

<script>
import { layer } from "../../../../src/index.ts"

export default {
  setup() {

    const openMsg = function() {
        layer.msg("普通消息", { time: 1000 })
    }
    return {
        openMsg
    }
  }
}
</script>

:::

::: title 指定图标
:::

::: demo

<template>
    <lay-button type="primary" @click="openSuccess">成功消息</lay-button>
    <lay-button type="primary" @click="openFailure">失败消息</lay-button>
    <lay-button type="primary" @click="openWarning">警告消息</lay-button>
    <lay-button type="primary" @click="openPrimary">详情消息</lay-button>
    <lay-button type="primary" @click="openLoading">加载消息</lay-button>
</template>

<script>
import { layer } from "../../../../src/index.ts"

export default {
  setup() {

    const openSuccess = function() {
        layer.msg("成功消息", { icon : 1, time: 1000})
    }

    const openFailure = function() {
        layer.msg("失败消息", { icon : 2, time: 1000})
    }

    const openWarning = function() {
        layer.msg("警告消息", { icon : 3, time: 1000})
    }

    const openPrimary = function() {
        layer.msg("详情消息", { icon : 4, time: 1000})
    }

    const openLoading = function() {
        layer.msg("加载消息", { icon : 16, time: 1000})
    }

    return {
        openSuccess, openFailure, openWarning, openPrimary, openLoading
    }
  }
}
</script>

:::

::: title 组件方法
:::

```
layer.msg(content, options)
```

::: title 组件属性
:::

::: table

| 属性                | 描述   | 备注 |
| ------------------- | ------ | ----|
| content | 消息内容 | -- |
| options | 选配属性 | { time: 加载时长, icon: 图标 }   |

:::

::: comment
:::