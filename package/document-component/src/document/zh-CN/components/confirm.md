::: anchor
:::

::: title 基本介绍
:::

::: describe 需要一个简洁的对话框询问用户时。
:::

::: title 基础使用
:::

::: demo 通过 `layer.confirm` 方法, 创建一个对话框。

<template>
    <lay-button type="primary" @click="openConfirm1">信息框</lay-button>
</template>

<script>
import { layer } from "@layui/layer-vue"

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

::: demo 使用 `btn` 属性, 自定义对话框操作列表。

<template>
    <lay-button type="primary" @click="openConfirm2">询问框</lay-button>
</template>

<script>
import { layer } from "@layui/layer-vue"

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

::: title 组件方法
:::

```
layer.confirm(content, options)
```

::: title 组件属性
:::

::: table

| 属性                | 描述   | 备注 |
| ------------------- | ------ | ---- |
| content | 内容 | -- |
| options | 选配属性 | { time: 加载时长, btn: 按钮组 }   |

:::

::: contributor confirm
:::

::: previousNext confirm
:::