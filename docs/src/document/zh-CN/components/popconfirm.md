::: anchor
:::

::: title 基本介绍
:::

::: describe 目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。 和 'confirm' 弹出的全屏居中模态对话框相比，交互形式更轻量
:::

::: title 基础使用
:::

::: demo 使用 `lay-popconfirm` 标签，创建确认提示，使用 `content` 属性设置文本信息，使用 `@confirm` 与 `@cancel` 接收回调事件。

<template>
  <lay-popconfirm content="请确认你的操作，流程将结束" @confirm="confirm" @cancel="cancel">
    <lay-button>删除</lay-button>
  </lay-popconfirm>
</template>

<script setup>
import { layer } from "@layui/layui-vue";

const confirm = () => {
  layer.msg("确认回调");
}

const cancel = () => {
  layer.msg("取消回调");
}
</script>
:::

::: title 显示位置
:::

::: demo 通过 `position` 属性设置 `popconfirm` 面板显示位置，默认为 `top` 值，`left` `bottom` `right` 为可选值。
<template>
  <lay-space>
    <lay-popconfirm content="请确认你的操作，流程将结束" position="top" @confirm="confirm" @cancel="cancel">
      <lay-button>上</lay-button>
    </lay-popconfirm>
    <lay-popconfirm content="请确认你的操作，流程将结束" position="left" @confirm="confirm" @cancel="cancel">
      <lay-button>左</lay-button>
    </lay-popconfirm>
    <lay-popconfirm content="请确认你的操作，流程将结束" position="bottom" @confirm="confirm" @cancel="cancel">
      <lay-button>下</lay-button>
    </lay-popconfirm>
    <lay-popconfirm content="请确认你的操作，流程将结束" position="right" @confirm="confirm" @cancel="cancel">
      <lay-button>右</lay-button>
    </lay-popconfirm>
  </lay-space>
</template>

<script setup>
import { layer } from "@layui/layui-vue";

const confirm = () => {
  layer.msg("确认回调");
}

const cancel = () => {
  layer.msg("取消回调");
}
</script>
:::

::: title 触发方式
:::

::: demo 通过 `trigger` 属性设置 popconfirm 触发方式，默认为 `hover` 方式，`click` `contextMenu` `focus` 为可选值。
<template>
  <lay-space>
    <lay-popconfirm content="请确认你的操作，流程将结束" trigger="click" @confirm="confirm" @cancel="cancel">
      <lay-button>点击</lay-button>
    </lay-popconfirm>
    <lay-popconfirm content="请确认你的操作，流程将结束" trigger="contextMenu" @confirm="confirm" @cancel="cancel">
      <lay-button>右击</lay-button>
    </lay-popconfirm>
    <lay-popconfirm content="请确认你的操作，流程将结束" trigger="hover" @confirm="confirm" @cancel="cancel">
      <lay-button>移入移出</lay-button>
    </lay-popconfirm>
    <lay-popconfirm content="请确认你的操作，流程将结束" trigger="focus" @confirm="confirm" @cancel="cancel">
      <lay-input placeholder="获取焦点"></lay-input>
    </lay-popconfirm>
  </lay-space>
</template>

<script setup>
import { layer } from "@layui/layui-vue";

const confirm = () => {
  layer.msg("确认回调");
}

const cancel = () => {
  layer.msg("取消回调");
}
</script>
:::

::: title 禁用提示
:::

::: demo 通过 `disabled` 属性禁用 `popconfirm` 提示。
<template>
  <lay-space>
    <lay-popconfirm content="请确认你的操作，流程将结束" :disabled="disabled" @confirm="confirm" @cancel="cancel">
      <lay-button>点击</lay-button>
    </lay-popconfirm>
    <lay-switch v-model="disabled"></lay-switch>
  </lay-space>
</template>

<script setup>
import { layer } from "@layui/layui-vue";
import { ref } from "vue";

const disabled = ref(false);

const confirm = () => {
  layer.msg("确认回调");
}

const cancel = () => {
  layer.msg("取消回调");
}
</script>
:::

::: title Popconfirm 属性
:::

::: table

| 名称        | 描述     | 可选值         |
| ----------- | -------- | -------------- |
| content     | 显示内容 | --             |
| confirmText    | 确认按钮文本 | --             |
| cancelText    | 取消按钮文本 | --             |
| btnAlign    | 按钮位置 | --             |
| position    | 显示位置 | `top`(默认值)、`bottom`、`left`、`right` |
| disabled    | 是否禁用 | `false`(默认值)、`true`(禁用)   |
| trigger     | 触发方式 | `click` `hover`(默认值) `contextmenu` `focus` `trigger[]`| 
| teleportProps  | 继承至 `tooltip` 组件 下拉面板 `传递` 属性  | `object`  | `{to: 'body', disabled: false}`   |  `vue teleport` 组件  | `2.19.3` |


:::

::: title Popconfirm 事件
:::

::: table

| 属性        | 描述     | 参数         |
| ----------- | -------- | -------------- |
| confirm     | 确认回调  | --             |
| cancel      | 取消回调  | --             |

:::

::: previousNext tooltip
:::
