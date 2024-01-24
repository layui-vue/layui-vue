::: title 概述导读
:::

::: describe 从 1.0.0 发布，layui-vue 迎来了重多的用户关注，同时也意味着大量 issues 涌入，以至于 1.x 版本从始至终处于小跑阶段。
:::

::: describe 随着 690 个 issues 的完成与 152 个 Release 版本的发布，逐渐走出了该阶段。于是 2.0.0 秉承着稳定的特性孕育而出，值得注意得这是一次  <span style="color:red">"兼容性"</span> 的版本升级。
:::

::: describe 该文档将帮助你从 1.x 升级到 2.0.0 版本。
:::

::: title 升级准备
:::

::: describe 升级到 1.0.0 的最新版本，按照控制台 warning 信息移除/修改相关的 API。
:::

::: title 新主题
:::

::: describe 主色：<span style="color:#16baaa;">#16baaa</span> 在原有的墨绿基础上赋予了清新。
:::

::: describe 次色：<span style="color:#16b777;">#16b777</span> 在原有的浅绿基础上增加了饱和。
:::

::: demo

<template>
    <ul class="layui-row layui-col-space15">
        <li class="layui-col-sm6">
            <div style="background-color: #16baaa;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
                <p>#16baaa</p>
                <p tips="">主色调</p>
            </div>
        </li>
        <li class="layui-col-sm6">
            <div style="background-color: #16b777;padding:10px;color:whitesmoke;padding:30px;border-radius:2px;">
                <p>#16b777</p>
                <p tips="">次色调</p>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::

::: title 新组件
:::

::: describe 我们加入了 `RadioButton` 单选按钮，`Popconfirm` 确认提示 `Checkcard` 多选卡片 `Select-Group` 下拉分组 等基础组件。
:::

::: demo

<template>
    <lay-space>
        <lay-radio-group name="action" v-model="selected" @change="change">
            <lay-radio-button value="1">写作</lay-radio-button>
            <lay-radio-button value="2">画画</lay-radio-button>
            <lay-radio-button value="3">运动</lay-radio-button>
        </lay-radio-group>
        <lay-select v-model="value" placeholder="Please select">
            <template  v-for="option in options">
                <lay-select-option-group :label="option.label">
                    <template v-for="children in option.children">
                        <lay-select-option :value="children.value" :label="children.label"></lay-select-option>
                    </template>
                </lay-select-option-group>
            </template>
        </lay-select>
        <lay-popconfirm content="不知江月待何人,但见长江送流水。" :is-dark="false">
            <lay-button type="primary">Popconfirm</lay-button>
        </lay-popconfirm>
    </lay-space>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref("1");

const value = ref(null);
    
const change = function( current ) {
    console.log("当前值:" + current)
}

const options = ref([
    {
        label: "分组",
        children: [
            {
                label: "运动",
                value: 0
            },
            {
                label: "编码",
                value: 1
            },
            {
                label: "运动",
                value: 2
            }
        ]
    },
    {
        label: "分组",
        children: [
            {
                label: "运动",
                value: 3
            },
            {
                label: "编码",
                value: 4
            },
            {
                label: "运动",
                value: 5
            }
        ]
    }
]);
</script>

:::

::: demo

<template>
  <lay-checkcard-group v-model="checked" @change="groupChange">
    <lay-checkcard
      value="1"
      avatar="https://portrait.gitee.com/uploads/avatars/namespace/2849/8547475_layui-vue_1645856954.png"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-checkcard>
   <lay-checkcard
      value="4"
      avatar="https://portrait.gitee.com/uploads/avatars/namespace/2849/8547475_layui-vue_1645856954.png"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-checkcard>
  <lay-checkcard
      disabled
      avatar="https://portrait.gitee.com/uploads/avatars/namespace/2849/8547475_layui-vue_1645856954.png"
      title="标题"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。">
  </lay-checkcard>
  </lay-checkcard-group>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const checked = ref(['1', '2', '3'])

    const groupChange = (val) => {
      console.log(val, 2232)
    }
    return {
      checked,
      groupChange
    }
  }
}
</script>

:::

::: title 新特性
:::

::: describe `form` `select` `tree-select` `table` `layer` 等已有组件，迎来大幅度改善，包括 `问题修复`，`属性新增` `样式优化`。
:::

::: describe 如需了解更多，可前往 <a style="color:#009688;" href="http://www.layui-vue.com/zh-CN/guide/changelog">更新日志</a> 查看详情。
:::

::: title 遇到问题
:::

::: describe 我们尽可能收集了已知的所有不兼容变化和相关影响，但是有可能还是有一些场景我们没有考虑到，如果你在升级过程中遇到了问题。
:::

::: describe 请到 Gitee issues 进行反馈。我们会尽快响应和相应改进这篇文档。
:::