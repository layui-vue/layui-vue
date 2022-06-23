::: anchor
:::

::: title 基本介绍
:::

::: describe 将某一区域的内容全屏展示。
:::

::: title 浏览器全屏
:::

::: demo 使用 `lay-fullscreen` 标签包裹触发全屏事件的按钮

<template>
  <lay-fullscreen v-slot="{ enter, exit, toggle, isFullscreen }" @fullscreenchange=fullscreen>
    <lay-button type="normal" @click="enter()">进入全屏</lay-button>  
    <lay-button type="normal" @click="exit()">退出</lay-button> 
    <lay-button type="warm" @click="toggle()">切换: {{isFullscreen ? "退出" : "进入全屏"}}</lay-button>
  </lay-fullscreen>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const fullscreen = function(isFullscreen){
      console.log(isFullscreen)
    }
    return {
      fullscreen
    }
  }
}
</script>

:::

::: title 局部区域全屏
:::

::: demo 使用 `target` 属性指定需要局部全屏的元素, 组件必须用 `div` 包裹, 因为不是所有元素都能向浏览器请求全屏

<template>
  <lay-fullscreen :target="elRef" v-slot="{ enter, exit, toggle, isFullscreen }" @fullscreenchange=fullscreen2>
    <div ref="elRef" class="wrapper-fullscreen">
      <lay-button type="normal" @click="enter()">进入全屏</lay-button>  
      <lay-button type="normal" @click="exit()">退出</lay-button> 
      <lay-button type="warm" @click="toggle()"> 切换: {{isFullscreen ? "退出" : "进入全屏"}} </lay-button>
    </div>
  </lay-fullscreen>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const elRef = ref(null);
    const fullscreen2 = function(isFullscreen){
      console.log(isFullscreen)
    }
    return {
      elRef,
      fullscreen2
    }
  }
}
</script>
<style>
.wrapper-fullscreen{
  padding:10px;
  border:1px solid #dddddd;
  background-color:#F6F6F6;
  display:inline-block
}
</style>

:::

::: title 浏览器窗口内全屏
:::

::: demo 使用 `target` 属性指定需要局部全屏的元素, 并设置`immersive`属性为 `false`,可使 `target` 在浏览器窗口内全屏

<template>
  <lay-fullscreen 
    :target="fullscreenTargetRef" 
    :immersive="false" 
    zIndex="10000"  
    v-slot="{ enter, exit, toggle, isFullscreen }" 
    @fullscreenchange=fullscreen3>
    <div ref="fullscreenTargetRef" class="wrapper-fullscreen">
      <lay-button type="normal" @click="enter()">进入全屏</lay-button>  
      <lay-button type="normal" @click="exit()">退出</lay-button> 
      <lay-button type="warm" @click="toggle()"> 切换: {{isFullscreen ? "退出" : "进入全屏"}} </lay-button>
    </div>
  </lay-fullscreen>
</template>

<script>
import { ref } from 'vue'

export default {
  
  setup() {
    const fullscreenTargetRef = ref(null)
    const fullscreen3 = function(isFullscreen){
      console.log(isFullscreen)
    }
    return {
      fullscreenTargetRef,
      fullscreen3
    }
  }
}
</script>
<style>
.wrapper-fullscreen{
  padding:10px;
  border:1px solid #dddddd;
  background-color:#F6F6F6;
  display:inline-block
}
</style>

:::

::: title 铺满特定容器
:::

::: demo 使用 `target` 属性指定需要局部全屏的元素, 并设置`immersive = false`, `position="absolute"`,可使 `target` 在特定容器内全屏

<template>
<div class="container" style="position:relative;height:300px;width:500px;background-color: #cccccc;">
  <lay-fullscreen 
    :target="fullscreenTargetRef2" 
    :immersive="false" 
    zIndex="12000" 
    position="absolute"  
    v-slot="{ enter, exit, toggle, isFullscreen }" 
    @fullscreenchange=fullscreen4>
    <div ref="fullscreenTargetRef2" class="wrapper-fullscreen">
      <lay-button type="normal" @click="enter()">进入全屏</lay-button>  
      <lay-button type="normal" @click="exit()">退出</lay-button> 
      <lay-button type="warm" @click="toggle()"> 切换: {{isFullscreen ? "退出" : "进入全屏"}} </lay-button>
    </div>
  </lay-fullscreen>
</div>
</template>

<script>
import { ref } from 'vue'

export default {
  
  setup() {
    const fullscreenTargetRef2 = ref(null);
    const fullscreen4 = function(isFullscreen){
      console.log(isFullscreen)
    }
    return {
      fullscreenTargetRef2,
      fullscreen4
    }
  }
}
</script>
<style>
.container{
  position:relative;
  height:300px;
  width:500px;
  background-color: red;
  border:1px solid #dddddd;
};
.wrapper-fullscreen{
  padding:10px;
  border:1px solid #dddddd;
  background-color:#F6F6F6;
  display:inline-block;
}
</style>

:::

:::title fullscreen 属性
:::

:::table
| 属性 | 描述 | 类型 | 默认值 | 可选值 |
| --------- | ----------------------------------------- | ------------- | ------ | ------------------- |
| target | 可选，要全屏显示的元素 | `HTMLElement` | `html` | - |
| immersive | 可选，全屏模式，`false`时浏览器窗口内全屏 | `boolean` | true | `true` `false` |
| position | 可选，浏览器窗口内全屏定位模式 | `string` | - | `absolute` `fixed` |
| zIndex | 可选，全屏层级 | `string` | - | - |
:::

:::title fullscreen 事件
:::

:::table
| 事件 | 描述 | 参数 |
|------ |----------|-----------|
| fullscreenchange | 全屏更改事件回调 | isFullscreen 是否全屏 |
:::

:::title fullscreen 插槽
:::

:::table
| 插槽 | 描述 | 参数 |
|------ |----------|-----------|
| default | 默认插槽 | - |
:::

:::title fullscreen 插槽属性
:::

:::table
| 属性 | 描述 | 类型 | 参数 |
| --------- | --------------| ------------- | ------ |
| enter | 进入全屏 | Function | 可选,`HTMLElement` |
| exit | 退出全屏 | Function | 可选,`HTMLElement` `Document` |
| toggle | 进入/退出全屏 | Function | - |
| isFullscreen | 是否全屏 | boolean | - |
:::

::: contributor fullscreen
::: 

::: previousNext fullscreen
:::