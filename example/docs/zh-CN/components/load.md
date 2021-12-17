::: title 基础使用
:::

::: demo

<template>
  <lay-button-container>
    <lay-button @click="loading0" type="primary">加载一</lay-button>
    <lay-button @click="loading1" type="primary">加载二</lay-button>
    <lay-button @click="loading2" type="primary">加载三</lay-button>
  </lay-button-container>
</template>

<script>
import { ref } from 'vue'
import { layer } from "../../../../src/index.ts"

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

::: demo

<template>
    <lay-button type="primary" @click="openLoading">加载消息</lay-button>
</template>

<script>
import { layer } from "../../../../src/index.ts"

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

::: demo 使用 layer.msg 创建弹出层, time 属性用于配置显示时长

<template>
  <lay-button-container>
    <lay-button @click="loading" type="primary">关闭消息</lay-button>
  </lay-button-container>
</template>

<script>
import { ref } from 'vue'
import { layer } from "../../../../src/index.ts"

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

::: comment
:::