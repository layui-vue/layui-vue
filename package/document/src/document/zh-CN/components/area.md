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
    <lay-area v-model="dizhi" ></lay-area> 
</template>

<script>
import {  ref, reactive } from "vue";
export default {
  setup() {
    const dizhi = ref('')
    return {
        dizhi
    }
  }
}
</script>

:::

::: title 使用自定义数据
:::

::: demo

<template>
    <Area  v-model="lian" :title="bt" :data="json" :simple="true" :cust="true"></Area>
</template>

<script>
import { ref,reactive } from "vue"

export default {
  setup() {
       const lian = ref('')
       const bt = reactive(['商品', '规格','型号'])
       const json = reactive({
            商品1: {
                规格: [ "型号1", "型号2", "型号3", "型号4"]
            },
            商品2: {
                 规格: ["型号1", "型号2", "型号3", "型号4"]
            },
            商品3: {
                 规格1: ["型号11", "型号12", "型号13", "型号14"],
                 规格2: ["型号221", "型号222", "型号223", "型号224"],
                 规格3: ["型号131", "型号132", "型号133", "型号134"],
            },
    })
    return {
        lian,bt,json
    }
  }
}
</script>

:::


:::

::: title area 属性
:::

::: table

| 事件 | 描述     | 参数                  |
| ---- | -------- | --------------------- |
| cust | 是否开启自定义 | false true |
| simple | 是否选择完成后关闭 | false true |
| title| 标题数据 | Array |
| data| 自定义数据 | object |
| bool | 是否只选择最后的数据|true,false|
:::

 

::: previousNext area
:::