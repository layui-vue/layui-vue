::: anchor
:::

::: title 基本介绍
:::

::: describe ### `2.18.0` 版本新增描述列表。
:::

::: describe 分组展示多组字段。
:::

::: title 基础使用
:::

::: demo 使用 `lay-descriptions` 与 `lay-descriptions-item` 结合使用。
<template>
  <lay-descriptions title="用户信息">
    <lay-descriptions-item label="姓名">
        <template #label>
          <lay-tag size="small" type="primary">姓名</lay-tag>
        </template>
        layui-vue
      </lay-descriptions-item>
      <lay-descriptions-item label="电话">
        <lay-tag size="small" type="normal">15000000000</lay-tag>
      </lay-descriptions-item>
      <lay-descriptions-item label="地点">深圳</lay-descriptions-item>
      <lay-descriptions-item label="爱好">篮球</lay-descriptions-item>
      <lay-descriptions-item label="地点">
        中国、广东省、深圳市
      </lay-descriptions-item>
  </lay-descriptions>
</template>
:::

::: title 尺寸
:::

::: demo `sm` 小、 `md` 默认、 `lg` 大， 三种尺寸 默认 `md`。

<template>
    <lay-radio-group name="action" v-model="size1">
      <lay-radio value="sm">sm</lay-radio>
      <lay-radio value="md">md</lay-radio>
      <lay-radio value="lg">lg</lay-radio>
    </lay-radio-group>
    <lay-descriptions title="有边框 border" :border="true" :size="size1" style="margin-top: 50px">
      <lay-descriptions-item label="姓名">
        <template #label>
          <lay-tag size="small" type="primary">姓名</lay-tag>
        </template>
        layui-vue
      </lay-descriptions-item>
      <lay-descriptions-item label="电话">
        <lay-tag size="small" type="normal">15000000000</lay-tag>
      </lay-descriptions-item>
      <lay-descriptions-item label="地点">深圳</lay-descriptions-item>
      <lay-descriptions-item label="爱好">篮球</lay-descriptions-item>
      <lay-descriptions-item label="地点">
        中国、广东省、深圳市
      </lay-descriptions-item>
    </lay-descriptions>
    <lay-descriptions title="无边框" :size="size1" style="margin-top: 50px">
      <lay-descriptions-item label="姓名">
        <template #label>
          <lay-tag size="small" type="primary">姓名</lay-tag>
        </template>
        layui-vue
      </lay-descriptions-item>
      <lay-descriptions-item label="电话">
        <lay-tag size="small" type="normal">15000000000</lay-tag>
      </lay-descriptions-item>
      <lay-descriptions-item label="地点">深圳</lay-descriptions-item>
      <lay-descriptions-item label="爱好">篮球</lay-descriptions-item>
      <lay-descriptions-item label="地点">
        中国、广东省、深圳市
      </lay-descriptions-item>
    </lay-descriptions>
</template>

<script setup>
import { ref, reactive } from "vue";

const size1 = ref("md");
</script>

:::

::: title 垂直排列
:::

::: demo `horizontal` 垂直、 `vertical` 水平 默认 `horizontal`。

<template>
    <lay-descriptions title="垂直排列 有边框" :border="true" direction="vertical">
      <lay-descriptions-item label="姓名">
        <template #label>
          <lay-tag size="small" type="primary">姓名</lay-tag>
        </template>
        layui-vue
      </lay-descriptions-item>
      <lay-descriptions-item label="电话">
        <lay-tag size="small" type="normal">15000000000</lay-tag>
      </lay-descriptions-item>
      <lay-descriptions-item label="地点">深圳</lay-descriptions-item>
      <lay-descriptions-item label="爱好">篮球</lay-descriptions-item>
      <lay-descriptions-item label="地点">
        中国、广东省、深圳市
      </lay-descriptions-item>
    </lay-descriptions>
    <lay-descriptions title="垂直排列 " direction="vertical" style="margin-top: 50px">
      <lay-descriptions-item label="姓名">
        <template #label>
          <lay-tag size="small" type="primary">姓名</lay-tag>
        </template>
        layui-vue
      </lay-descriptions-item>
      <lay-descriptions-item label="电话">
        <lay-tag size="small" type="normal">15000000000</lay-tag>
      </lay-descriptions-item>
      <lay-descriptions-item label="地点">深圳</lay-descriptions-item>
      <lay-descriptions-item label="爱好">篮球</lay-descriptions-item>
      <lay-descriptions-item label="地点">
        中国、广东省、深圳市
      </lay-descriptions-item>
    </lay-descriptions>
</template>

:::

::: title 对齐方式
:::

::: demo 使用 `align` 内容对齐、 `label-align` label对齐。

<template>
    <lay-descriptions title="对齐方式" border>
      <lay-descriptions-item label="左对齐" align="left" labelAlign="left">
        内容左对齐
      </lay-descriptions-item>
      <lay-descriptions-item label="居中对齐" align="center" labelAlign="center">
        内容居中对齐
      </lay-descriptions-item>
       <lay-descriptions-item label="右对齐" align="right" labelAlign="right">
        内容右对齐
      </lay-descriptions-item>
    </lay-descriptions>
    <lay-descriptions title="垂直排列 对齐方式" direction="vertical" border style="margin-top: 50px">
      <lay-descriptions-item label="左对齐" align="left" labelAlign="left">
        内容左对齐
      </lay-descriptions-item>
      <lay-descriptions-item label="居中对齐" align="center" labelAlign="center">
        内容居中对齐
      </lay-descriptions-item>
       <lay-descriptions-item label="右对齐" align="right" labelAlign="right">
        内容右对齐
      </lay-descriptions-item>
    </lay-descriptions>
</template>
:::

::: title 自定义样式
:::

::: demo 使用 `style` | `class` 内容样式、 `label-style` | `label-class` label样式。

<template>
    <lay-descriptions title="自定义样式" border>
      <lay-descriptions-item label="label-style" labelStyle="background-color: #16baaa;">style</lay-descriptions-item>
      <lay-descriptions-item label="style" style="background-color: #ff5722;">label-style</lay-descriptions-item>
      <lay-descriptions-item label="class" class="descriptions-class">class</lay-descriptions-item>
      <lay-descriptions-item label="label-class" labelClass="descriptions-label-class">篮球</lay-descriptions-item>
    </lay-descriptions>
</template>
:::

::: title 数据生成
:::

::: demo 使用 `data-list` 可快速生成描述列表、对象中可传 `descriptions-item` 的所有 `props`

<template>
  <lay-descriptions title="数据生成" :dataList="dataList"></lay-descriptions>
</template>

<script setup>
import { h, resolveComponent } from "vue";

const LayTag = resolveComponent('lay-tag')
const LayButton = resolveComponent('lay-button')

const dataList = [
  {
    label: "姓名",
    content: "layui-vue",
  },
  {
    label: "爱好",
    content: "篮球",
  },
  {
    label: h(
      LayTag,
      { size: "small", type: "primary" },
      {
        default: () => "h函数",
      }
    ),
    content: "label可以传入VNode",
  },
  {
    label: "Content可以传入VNode",
    content: h(
      LayButton,
      {},
      {
        default: () => "h函数",
      }
    ),
  },
];
</script>
:::

::: title Descriptions 属性
:::

::: table

| 属性    | 描述          | 类型 | 默认值 |
| ------- | ------------- | ------ |------ |
| dataList    | 可通过数据主动生成 `descriptionsItem` 组件 |  `Array<DataListType>`    |--     |
| title   | 标题文本       | `string`    |     |
| extra   | 标题右侧本文        | `string`    |     |
| border   | 是否开启边框        | `boolean`    | `false`    |
| column   | 一行展示列数        | `number`     | 3     |
| direction | 方向        | `horizontal` 、 `vertical`     |`horizontal`    |
| size   | 尺寸    | `sm` 、`md`、 `lg`     |--     |
:::

::: title Descriptions Slot
:::

::: table

| 插槽名    | 描述     | 
| ------- | -------- |
| default | 放置 `descriptionsItem` 组件 | 
| label | 标题文本 | 
| extra | 标题右侧本文 | 

:::

::: title DescriptionsItem 属性
:::

::: table

| 属性    | 描述          | 类型 | 默认值 |
| ------- | ------------- | ------ |------ |
| label    | `label` 区域文本 |  `string`    |--     |
| span   | 占几列       | `number`    |  1   |
| align   | 内容区域对齐方式        | `BaseAlignType`    |  `left`   |
| labelAlign   | `label` 区域对齐方式        | `BaseAlignType`    |  `left`   |
| style   | 内容 区域样式        | `CSSProperties`    | --    |
| class   | 内容 区域类名        | `string`     | --     |
| labelStyle | `label` 区域样式        | `CSSProperties`     |--    |
| labelClass   | `label` 区域类名    | `string`     |--     |
:::

::: title DescriptionsItem Slot
:::

::: table

| 插槽名    | 描述     | 
| ------- | -------- |
| default | 内容 | 
| label | 标签文本 | 

:::

::: title Types
:::

```ts

interface DescriptionsProps {
  dataList?: DataListType[];
  title?: string;
  extra?: string;
  border?: boolean;
  column?: number;
  direction?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
}

interface DataListType extends Omit<DescriptionsItemProps, "label"> {
  label?: VNodeTypes;
  content?: VNodeTypes;
}

interface DescriptionsItemProps {
  label?: string;
  span?: number;
  align?: BaseAlignType;
  labelAlign?: BaseAlignType;
  style?: CSSProperties;
  class?: string;
  labelStyle?: CSSProperties;
  labelClass?: string;
}

```


::: previousNext descriptions
:::


