::: anchor
:::

::: title 基本介绍
:::

::: describe 警告提示，展现需要关注的信息。
:::

::: title 基础使用
:::

::: demo 使用 `lay-tooltip` 标签，创建文字提示。

<template>
  <lay-tooltip content="假装这里有文字提示" trigger="click">
    <lay-button>提示信息</lay-button>
  </lay-tooltip>
</template>
:::

::: title 受控模式
:::

::: demo 通过 `visible` 属性，达成受控模式。

<template>
    <lay-space>
      <lay-tooltip :visible="visible" trigger="click" content="假装这里有文字提示" >
        <lay-button>提示信息</lay-button>
      </lay-tooltip>
      <lay-switch v-model="visible"></lay-switch>
    </lay-space>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false)
</script>

:::

::: title 显示位置
:::

::: demo 通过 `position` 属性，设置 tooltip 显示位置。

<template>
  <lay-space>
      <lay-tooltip  trigger="click" content="假装这里有文字提示">
        <lay-button>上边</lay-button>
      </lay-tooltip>
      <lay-tooltip  trigger="click" content="假装这里有文字提示" position="left">
        <lay-button style="float:left;">左边</lay-button>
      </lay-tooltip>
      <lay-tooltip  trigger="click" content="假装这里有文字提示" position="right">
        <lay-button style="float:right;">右边</lay-button>
      </lay-tooltip>
      <lay-tooltip  trigger="click" content="假装这里有文字提示" position="bottom">
        <lay-button>下边</lay-button>
      </lay-tooltip>
  </lay-space>
</template>

<style>
</style>
:::

::: title 提示主题
:::

::: demo 通过 `is-dark` 属性，开启暗色主题。

<template>
  <lay-space>
    <lay-tooltip content="不明白是是非非，只知我不会不在。" :is-dark="isDark">
      <lay-button >tooltip</lay-button>
    </lay-tooltip>
    <lay-switch v-model="isDark"></lay-switch>
  </lay-space>
</template>

<script>
import { ref } from "vue";

const isDark = ref(false);
</script>
:::

::: title 是否禁用
:::

::: demo 通过 `disabled` 属性，禁用提示效果。

<template>
  <lay-space>
    <lay-tooltip :content="content" :disabled="!disabled">
      <lay-button>提示信息</lay-button>
    </lay-tooltip>
    <lay-switch v-model="disabled" onswitch-text="启用"  unswitch-text="禁用"></lay-switch>
  </lay-space>
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

      const disabled = ref(true)

      setInterval(()=> content.value =  rendonCotent(), 1000)

      return {
        content,
        disabled
      }
    }
  }
</script>
:::

::: title 自动提示
:::

::: demo 通过 `is-dark` 属性，开启暗色主题。

<template>
    <lay-space>
        <div @click="changeText"><lay-button>Edit</lay-button></div>
        <div style="width: 100px;">
          <lay-tooltip content="不明白是是非非，只知我不会不在。" :isAutoShow="true">
            {{ text }}
          </lay-tooltip>
        </div>
    </lay-space>
</template>

<script>
import { ref } from "vue";

const text = ref("自动提示");

const changeText = () => {
  text.value = "以创造性的行为实践于人世。若能以写作为工具，为道途，先帮助自己一程，再以领悟帮助他人一程。这是一种服务";
}
</script>
:::

::: title Tooltip 属性
:::

::: table

| 属性        | 描述     | 类型         | 默认值         | 可选值         |
| ----------- | -------- | -------------- |-------------- |-------------- |
| content     | 显示内容 | `string`        | -             |-             |
| position    | 显示位置 | `string`        | `top`          | `top` `bottom` `left` `right` |
| isDark      | 是否为黑色主题 | `boolean` | `false` | `true` `false`   |
| disabled    | 是否禁用 | `boolean` | `false` |`false` `true`   |
| isCanHide   | 控制是否可以隐藏,可参考`lay-slider`组件 | `boolean` | `true` | `true` `false`   |
| isAutoShow   | 控制超出文本 `...` 时自动展示， 没有 `...` 时不展示 | `boolean` | `false` | `false` `true`   |
| visible     | 控制显示/隐藏| `true` `false`(默认值)| `boolean` | `false` | `true` `false` |
| enterable   | 鼠标能否进入 tooltip 中 | `boolean` | `true` | `true` `false`|
| trigger     | 触发方式 | `string` | `hover` | `click` `hover` `contextmenu` `focus` `trigger[]`| 

:::

::: title Tooltip 事件
:::

::: table

| 插槽    | 描述     | 参数 |
| ------- | -------- | ------ |
| hide | tooltip弹出内容隐藏后触发 | false  |

:::

::: previousNext tooltip
:::
