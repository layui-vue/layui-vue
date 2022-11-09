::: anchor
:::

::: title 字体使用
:::

::: demo

<template>
<div style="max-width: 100%; ">
 <lay-tooltip content="缩小浏览器时...假装这里有文字提示假装这里有文字提示假装这里有文字提示假装这里有文字提示" ref="tooltip" :isAutoShow="true">
      缩小浏览器时...假装这里有文字提示假装这里有文字提示假装这里有文字提示假装这里有文字提示
  </lay-tooltip>
</div>
<div style="max-width: 124px;  margin-top: 20px">
 <lay-tooltip content="假装这里有文字提示" ref="tooltip" :isAutoShow="true">
      假装这里有文字提示
  </lay-tooltip>
</div>
<div style="width: 126px; margin-top: 20px">
 <lay-tooltip content="假装这里有文字提示" ref="tooltip" :isAutoShow="true">
      假装这里有文字提示
  </lay-tooltip>
</div>
</template>

<script>
  import { ref } from 'vue';

export default {
setup() {

    }
}
</script>

<style>
</style>
:::

::: title 基础使用
:::

::: demo

<template>
  <lay-tooltip content="假装这里有文字提示" trigger="click">
    <lay-button>tooltip</lay-button>
  </lay-tooltip>
</template>
:::

::: title 受控模式
:::

::: demo
<template>
    <lay-tooltip :visible="visible" trigger="click" content="假装这里有文字提示" >
      <lay-button @mouseenter="visible=true" @mouseleave="visible=false">tooltip</lay-button>
    </lay-tooltip>
</template>

<script>
import { ref,watch } from 'vue';
export default {
  setup() {
    const visible = ref(false)
  return {
    visible,
  }
}
}
</script>
<style>
</style>

:::

::: title 显示位置
:::

::: demo

<template>
  <div style="padding: 100px;max-width:400px;">
    <div style="text-align: center;">
      <lay-tooltip  trigger="click" content="假装这里有文字提示">
        <lay-button>上边</lay-button>
      </lay-tooltip>
    </div>
    <div>
      <lay-tooltip  trigger="click" content="假装这里有文字提示假装这里有文字提示假装这里有文字提示假装这里有文字提示假装这里有文字提示" position="left">
        <lay-button style="float:left;">左边</lay-button>
      </lay-tooltip>
      <lay-tooltip  trigger="click" content="假装这里有文字提示假装这里有文字提示假装这里有文字提示假装这里有文字提示假装这里有文字提示" position="right">
        <lay-button style="float:right;">右边</lay-button>
      </lay-tooltip>
      <div style="clear: both;"></div>
    </div>
    <div style="text-align: center;">
      <lay-tooltip  trigger="click" content="假装这里有文字提示假装这里有文字提示假装这里有文字提示假装这里有文字提示" position="bottom">
        <lay-button>下边</lay-button>
      </lay-tooltip>
    </div>
  </div>
</template>

<style>
</style>
:::

::: title 浅色主题
:::

::: demo

<template>
  <lay-tooltip content="不明白是是非非，只知我不会不在。" :is-dark="false">
    <lay-button >tooltip</lay-button>
  </lay-tooltip>
</template>

<script>
</script>
:::

::: title 是否禁用/动态属性
:::

::: demo

<template>
  <lay-tooltip :content="content" :is-dark="isDark" :disabled="!disabled">
    <lay-button>tooltip</lay-button>
  </lay-tooltip>
  <lay-switch v-model="disabled" onswitch-text="启用tooltip"  unswitch-text="禁用tooltip" style="margin-left: 5px;"></lay-switch>
  <lay-switch v-model="isDark" onswitch-text="深色"  unswitch-text="浅色" style="margin-left: 5px;"></lay-switch>
</template>

<script>
  import { ref } from 'vue';

  export default {
    setup() {

      const contentArr = [
        "不明白是是非非，只知我不会不在。",
        "千山万水，去程是你，归程也是你。",
        "一约既定，万山无阻。",
        "时光都淡了，我还伴着你。",
        "只问深情，不问西东。",
        "感谢曾经在我身边的，一直在我身边。",
        "经年再相逢，魂梦与子同。"
      ];
      const rendonCotent = function(){
        return contentArr[Math.floor(Math.random() * contentArr.length)];
      };

      const content = ref(rendonCotent())
      const isDark = ref(false)
      const disabled = ref(true)

      setInterval(()=> content.value =  rendonCotent(), 1000)
      return {
        content,
        isDark,
        disabled
      }
    }
  }
</script>
<style>
</style>
:::

::: title Tooltip 属性
:::

::: table

| 属性        | 描述     | 可选值         |
| ----------- | -------- | -------------- |
| content     | 显示内容 | --             |
| position    | 显示位置 | `top`(默认值)、`bottom`、`left`、`right` |
| isDark      | 是否为黑色主题 | `true`(默认值)、`false`(浅色)   |
| disabled    | 是否禁用 | `false`(默认值)、`true`(禁用)   |
| isCanHide   | 控制是否可以隐藏,可参考`lay-slider`组件 | `true`(默认值)、`false`   |
| isAutoShow   | 控制超出文本 `...` 时自动展示， 没有 `...` 时不展示 | `false`(默认值)、`true`   |
| visible     | 控制显示/隐藏| `true` `false`(默认值)|
| enterable   | 鼠标能否进入 tooltip 中 | `true`(默认值) `false`|
| trigger     | 触发方式| `click` `hover`(默认值) `contextmenu` `focus` `trigger[]`| 

:::

::: contributor tooltip
:::

::: previousNext tooltip
:::