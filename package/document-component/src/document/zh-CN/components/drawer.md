::: anchor
:::

::: title 基本介绍
:::

::: describe 屏幕边缘滑出的浮层面板。
:::

::: title 基础使用
:::

::: demo 基础抽屉，点击触发按钮抽屉从右滑出，点击遮罩区关闭。

<template>
  <lay-button @click="changeVisible" type="primary">打开</lay-button>
  <lay-layer type="drawer" v-model="visible" title="标题">内容</lay-layer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const visible = ref(false)
    const changeVisible = function() {
        visible.value = !visible.value;
    }
    return {
        visible,
        changeVisible
    }
  }
}
</script>

:::


::: title 抽屉嵌套
:::

::: demo 在抽屉内打开新的抽屉，用以解决多分支任务的复杂状况。

<template>
  <lay-button @click="changeVisible1" type="primary">打开</lay-button>
  <lay-layer type="drawer" v-model="visible1" title="标题">
      <lay-button @click="changeVisible2" type="primary" style="margin:10px;">打开</lay-button>
      <lay-layer type="drawer" area="200px" v-model="visible2" title="标题">
      内容
      </lay-layer>
  </lay-layer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const visible1 = ref(false)
    const changeVisible1 = function() {
        visible1.value = !visible1.value;
    }
    const visible2 = ref(false)
    const changeVisible2 = function() {
        visible2.value = !visible2.value;
    }
    return {
        visible1,
        visible2,
        changeVisible1,
        changeVisible2
    }
  }
}
</script>

:::

::: title 函数调用
:::

::: demo 通过函数 layer.drawer(options) 打开抽屉

<template>
  <lay-button @click="openDrawer" type="primary">调用</lay-button>
</template>

<script>
import { ref } from 'vue'
import { layer } from "@layui/layer-vue"

export default {
  setup() {
    const openDrawer = function() {
        layer.drawer({
            title: "标题",
            content: "内容"
        })
    }
    return {
        openDrawer
    }
  }
}
</script>

:::

::: title 不同方向
:::

::: demo 自定义位置，点击触发按钮抽屉从相应的位置滑出

<template>
    <lay-button @click="openTopDrawer" type="primary">上</lay-button>
    <lay-button @click="openBottomDrawer" type="primary">下</lay-button>
    <lay-button @click="openLeftDrawer" type="primary">左</lay-button>
    <lay-button @click="openRightDrawer" type="primary">右</lay-button>
</template>

<script>
import { ref } from 'vue'
import { layer } from "@layui/layer-vue"

export default {
  setup() {
    const openTopDrawer = function() {
        layer.drawer({
            title: "标题",
            content: "内容",
            offset: "t"
        })
    }
    const openBottomDrawer = function() {
        layer.drawer({
            title: "标题",
            content: "内容",
            offset: "b"
        })
    }
    const openLeftDrawer = function() {
        layer.drawer({
            title: "标题",
            content: "内容",
            offset: "l"
        })
    }
    const openRightDrawer = function() {
        layer.drawer({
            title: "标题",
            content: "内容",
            offset: "r"
        })
    }
    return {
        openTopDrawer,
        openBottomDrawer,
        openLeftDrawer,
        openRightDrawer,
    }
  }
}
</script>

:::

::: contributor drawer
:::

::: previousNext drawer
:::