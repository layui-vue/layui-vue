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

::: title 允许关闭
:::

::: demo

<template>
    <lay-notice-bar leftIcon="layui-icon-mute" rightIcon="layui-icon-close" text="所有发生过的都是既定的。是应该发生。只能发生。" mode="closeable"></lay-notice-bar>
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

:::  垂直滚动
:::

::: demo

<template>
    <lay-notice-bar  :scrollable="true" :textlist="list"></lay-notice-bar>
</template>

<script>
import { ref,reactive } from "vue"

export default {
  setup() {

    const list = reactive([
      '通知一：users !',
      '通知二：world !',
      '通知三：friend !',
      '通知四：ok!',  
    ])

    return {
        list
    }
  }
}
</script>

:::

::: title Notice Bar 属性
:::

::: table

| 事件 | 描述     | 参数                  |
| ---- | -------- | --------------------- |
| mode | 模式 | 'link' 'closeable' |
| text | 内容 | 滚动内容 |
| leftIcon | 左侧图标 | -- |
| rightIcon | 右侧图标 | -- |
| scrollable | 是否开启垂直滚动|true,false|
|  textlist  | 垂直滚动内容| Array|
:::

 

::: previousNext area
:::