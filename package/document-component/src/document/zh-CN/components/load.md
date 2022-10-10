::: anchor
:::

::: title 基本介绍
:::

::: describe 页面正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。
:::

::: title 基础使用
:::

::: demo 使用 layer.load(type, options) 方法创建一个加载层, `type` 属性用于设置弹出层类型。

<template>
  <lay-button-container>
    <lay-button @click="loading0" type="primary">加载一</lay-button>
    <lay-button @click="loading1" type="primary">加载二</lay-button>
    <lay-button @click="loading2" type="primary">加载三</lay-button>
  </lay-button-container>
</template>

<script>
import { ref } from 'vue'
import { layer } from "@layui/layer-vue"

export default {
  setup() {
    
    const loading0 = function() {
        layer.load(0, {time: 3000})
    }

    const loading1 = function() {
        layer.load(1, {time: 3000})
    }

    const loading2 = function() {
        layer.load(2, {time: 3000})
    }
    
    return {
        loading0,
        loading1,
        loading2,
    }
  }
}
</script>

:::

::: title 其他方式
:::

::: demo 使用 `layer.msg` 方法, 设置 `icon` 为 16, 弹出一个带有加载动画的提示信息。

<template>
    <lay-button type="primary" @click="openLoading">加载消息</lay-button>
</template>

<script>
import { layer } from "@layui/layer-vue"

export default {
  setup() {

    const openLoading = function() {
        layer.msg("加载中...", { icon : 16, time: 1000})
    }

    return {
        openLoading
    }
  }
}
</script>

:::

::: title 手动关闭
:::

::: demo 通过 `layer.close()` 方法来关闭一个正在加载的实例。

<template>
  <lay-button-container>
    <lay-button @click="loading" type="primary">关闭消息</lay-button>
  </lay-button-container>
</template>

<script>
import { ref } from 'vue'
import { layer } from "@layui/layer-vue"

export default {
  setup() {
    
    const loading = function() {
        let id = layer.load(0)

        setTimeout(() => {
            layer.close(id)
        },3000)
    }
    
    return {
        loading
    }
  }
}
</script>

:::


::: title 组件方法
:::

```
layer.load(load, options)
```

::: title 组件属性
:::

::: table

| 属性                | 描述   | 备注 |
| ------------------- | ------ | ---- |
| load | 组件类型 | `1` `2` `3` |
| options | 选配属性 | { time: 加载时长 }   |

:::

::: contributor load
:::  

::: previousNext load
:::