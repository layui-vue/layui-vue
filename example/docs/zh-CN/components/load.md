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
        loading2
    }
  }
}
</script>

:::

::: title 手动关闭
:::

::: demo

<template>
  <lay-button-container>
    <lay-button @click="loading" type="primary">加载</lay-button>
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
