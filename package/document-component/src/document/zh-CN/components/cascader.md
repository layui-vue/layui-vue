::: anchor
:::

::: title 基本介绍
:::

::: describe 将数据按照指定的格式传入后分层分级，通过此组件逐级查看并选择。
:::

::: title 基础使用
:::

::: demo 使用 `lay-cascader` 标签创建级联选择器

<template>
  <lay-cascader :options="options" v-model="value" placeholder="点我试一试" allow-clear>
  </lay-cascader>
  <span style="margin-left:20px">输出的值：{{value}}</span>
  <lay-button @click='value="Components/data/progress"' size='sm' style='margin-left:10px'>
    修改v-model
  </lay-button>
</template>

<script setup>
import { ref } from "vue";
const value=ref()
const options = [
	{
		value: "Guide",
		label: "指南",
		children: [
			{
				value: "shejiyuanze",
				label: "设计原则",
				children: [
					{
						value: "yizhi",
						label: "一致",
					},
					{
						value: "fankui",
						label: "反馈",
					},
					{
						value: "xiaolv",
						label: "效率",
					},
					{
						value: "kekong",
						label: "可控",
					},
				],
			},
			{
				value: "daohang",
				label: "导航",
				children: [
					{
						value: "cexiangdaohang",
						label: "侧向导航",
					},
					{
						value: "dingbudaohang",
						label: "顶部导航",
					},
				],
			},
		],
	},
	{
		value: "Components",
		label: "组件",
		children: [
			{
				value: "basic",
				label: "Basic",
				children: [
					{
						value: "layout",
						label: "Layout 布局",
					},
					{
						value: "color",
						label: "Color 色彩",
					},
					{
						value: "typography",
						label: "Typography 字体",
					},
					{
						value: "icon",
						label: "Icon 图标",
					},
					{
						value: "button",
						label: "Button 按钮",
					},
				],
			},
			{
				value: "form",
				label: "Form",
				children: [
					{
						value: "radio",
						label: "Radio 单选框",
					},
					{
						value: "checkbox",
						label: "Checkbox 多选框",
					},
					{
						value: "input",
						label: "Input 输入框",
					},
					{
						value: "input-number",
						label: "InputNumber 计数器",
					},
					{
						value: "select",
						label: "Select 选择器",
					},
					{
						value: "cascader",
						label: "Cascader 级联选择器",
					},
					{
						value: "switch",
						label: "Switch 开关",
					},
					{
						value: "slider",
						label: "Slider 滑块",
					},
					{
						value: "time-picker",
						label: "TimePicker 时间选择器",
					},
					{
						value: "date-picker",
						label: "DatePicker 日期选择器",
					},
					{
						value: "datetime-picker",
						label: "DateTimePicker 日期时间选择器",
					},
					{
						value: "upload",
						label: "Upload 上传",
					},
					{
						value: "rate",
						label: "Rate 评分",
					},
					{
						value: "form",
						label: "Form 表单",
					},
				],
			},
			{
				value: "data",
				label: "Data",
				children: [
					{
						value: "table",
						label: "Table 表格",
					},
					{
						value: "tag",
						label: "Tag 标签",
					},
					{
						value: "progress",
						label: "Progress 进度条",
					},
					{
						value: "tree",
						label: "Tree 树形控件",
					},
					{
						value: "pagination",
						label: "Pagination 分页",
					},
					{
						value: "badge",
						label: "Badge 标记",
					},
				],
			},
			{
				value: "notice",
				label: "Notice",
				children: [
					{
						value: "alert",
						label: "Alert 警告",
					},
					{
						value: "loading",
						label: "Loading 加载",
					},
					{
						value: "message",
						label: "Message 消息提示",
					},
					{
						value: "message-box",
						label: "MessageBox 弹框",
					},
					{
						value: "notification",
						label: "Notification 通知",
					},
				],
			},
			{
				value: "navigation",
				label: "Navigation",
				children: [
					{
						value: "menu",
						label: "NavMenu 导航菜单",
					},
					{
						value: "tabs",
						label: "Tabs 标签页",
					},
					{
						value: "breadcrumb",
						label: "Breadcrumb 面包屑",
					},
					{
						value: "dropdown",
						label: "Dropdown 下拉菜单",
					},
					{
						value: "steps",
						label: "Steps 步骤条",
					},
				],
			},
			{
				value: "others",
				label: "Others",
				children: [
					{
						value: "dialog",
						label: "Dialog 对话框",
					},
					{
						value: "tooltip",
						label: "Tooltip 文字提示",
					},
					{
						value: "popover",
						label: "Popover 弹出框",
					},
					{
						value: "card",
						label: "Card 卡片",
					},
					{
						value: "carousel",
						label: "Carousel 走马灯",
					},
					{
						value: "collapse",
						label: "Collapse 折叠面板",
					},
				],
			},
		],
	},
	{
		value: "Resource",
		label: "资源",
		children: [
			{
				value: "axure",
				label: "Axure Components",
			},
			{
				value: "sketch",
				label: "Sketch Templates",
			},
			{
				value: "jiaohu",
				label: "组件交互文档",
			},
		],
	},
];
</script>

:::

::: title 自定义分割符号
:::
::: demo 使用 `decollator` 属性 自定义分割符号
<template>
  <lay-cascader :options="options" v-model="value1" decollator="-" placeholder="我可以自定义分割符号" allow-clear ></lay-cascader>
</template>

<script setup>
import { ref } from "vue";
const value1=ref(null)
</script>
:::

::: title 控制回显层级
:::
::: demo 使用 `onlyLastLevel` 属性 可以仅在回显的displayValue显示选中项最后一级的标签，而不是完整路径, 注意绑定的v-model仍然是完整的。
<template>
  <lay-cascader :options="options" v-model="valueLv" :onlyLastLevel="true" allow-clear placeholder="仅显示最后一级" ></lay-cascader>
  <span style="margin-left:20px">输出的值：{{valueLv}}</span>
</template>

<script setup>
import { ref } from "vue";
const valueLv=ref(null)
</script>
:::

::: title 选择即改变
:::
::: demo 使用 `changeOnSelect` 属性开启，该功能不能与`onlyLastLevel`同时开启
<template>
  <lay-cascader :options="options" v-model="valueChangeOnSelect" :changeOnSelect="true" allow-clear placeholder="选择即改变" ></lay-cascader>
  <span style="margin-left:20px">输出的值：{{valueChangeOnSelect}}</span>
</template>

<script setup>
import { ref } from "vue";
const valueChangeOnSelect=ref(null)
</script>
:::

::: title 触发方式
:::
::: demo 本组件弹出效果依托于DropDown组件，触发方式与其保持一致
<template>
  <lay-cascader :options="options"  placeholder="click触发(默认)" style="width:250px;margin-right:20px"></lay-cascader>
  <lay-cascader :options="options"  placeholder="hover触发" style="width:250px;margin-right:20px" trigger="hover"></lay-cascader>
  <lay-cascader :options="options"  placeholder="右键触发"  trigger="contextMenu"></lay-cascader>
</template>
:::


::: title Cascader 插槽
:::
::: demo 使用 `默认插槽` 可以自定义回显区域的内容,并且你可以通过change回调轻松拿到回显的值，同时你也可以使用`动态插槽名`来自定义你想要展示的内容，只需要在传入的数据中加入 `slot`参数，然后愉快的使用插槽自定义内容
<template>
  <lay-cascader :options="options" v-model="value2" @change="onChange" style="width:350px;">
    <div style='display:flex;align-items:center'>
      <lay-button type="normal">Click me ❤️</lay-button>
      <lay-badge theme="orange" v-if="displayValue" style="margin-left:10px">{{displayValue}}</lay-badge>
    </div>
  </lay-cascader>
  <lay-cascader :options="options2" v-model="value" placeholder="动态插槽案例" style="width:250px;margin-left:20px">
    <template #Guide>🤨😐😑😶😏😒🙄😬🤥😌</template>
    <template #Components>👋🤚🖐️✋🖖👌🤌🤏🤞🤟</template>
    <template #Resource>📱📲📶📳📴☎📞📟📠🤳</template>
  </lay-cascader>
</template>

<script setup>
import { ref } from "vue";
const value2=ref(null)
const displayValue=ref(null)
const onChange=(evt)=>{
  displayValue.value=evt.display
}
const options2 = [
	{
		value: "Guide",
		label: "指南",
        slot:"Guide",
		children: [
			{
				value: "shejiyuanze",
				label: "设计原则",
				children: [
					{
						value: "yizhi",
						label: "一致",
					},
					{
						value: "fankui",
						label: "反馈",
					},
					{
						value: "xiaolv",
						label: "效率",
					},
					{
						value: "kekong",
						label: "可控",
					},
				],
			},
			{
				value: "daohang",
				label: "导航",
				children: [
					{
						value: "cexiangdaohang",
						label: "侧向导航",
					},
					{
						value: "dingbudaohang",
						label: "顶部导航",
					},
				],
			},
		],
	},
	{
		value: "Components",
		label: "组件",
        slot:"Components",
		children: [
			{
				value: "basic",
				label: "Basic",
				children: [
					{
						value: "layout",
						label: "Layout 布局",
					},
					{
						value: "color",
						label: "Color 色彩",
					},
					{
						value: "typography",
						label: "Typography 字体",
					},
					{
						value: "icon",
						label: "Icon 图标",
					},
					{
						value: "button",
						label: "Button 按钮",
					},
				],
			},
			{
				value: "form",
				label: "Form",
				children: [
					{
						value: "radio",
						label: "Radio 单选框",
					},
					{
						value: "checkbox",
						label: "Checkbox 多选框",
					},
					{
						value: "input",
						label: "Input 输入框",
					},
					{
						value: "input-number",
						label: "InputNumber 计数器",
					},
					{
						value: "select",
						label: "Select 选择器",
					},
					{
						value: "cascader",
						label: "Cascader 级联选择器",
					},
					{
						value: "switch",
						label: "Switch 开关",
					},
					{
						value: "slider",
						label: "Slider 滑块",
					},
					{
						value: "time-picker",
						label: "TimePicker 时间选择器",
					},
					{
						value: "date-picker",
						label: "DatePicker 日期选择器",
					},
					{
						value: "datetime-picker",
						label: "DateTimePicker 日期时间选择器",
					},
					{
						value: "upload",
						label: "Upload 上传",
					},
					{
						value: "rate",
						label: "Rate 评分",
					},
					{
						value: "form",
						label: "Form 表单",
					},
				],
			},
			{
				value: "data",
				label: "Data",
				children: [
					{
						value: "table",
						label: "Table 表格",
					},
					{
						value: "tag",
						label: "Tag 标签",
					},
					{
						value: "progress",
						label: "Progress 进度条",
					},
					{
						value: "tree",
						label: "Tree 树形控件",
					},
					{
						value: "pagination",
						label: "Pagination 分页",
					},
					{
						value: "badge",
						label: "Badge 标记",
					},
				],
			},
			{
				value: "notice",
				label: "Notice",
				children: [
					{
						value: "alert",
						label: "Alert 警告",
					},
					{
						value: "loading",
						label: "Loading 加载",
					},
					{
						value: "message",
						label: "Message 消息提示",
					},
					{
						value: "message-box",
						label: "MessageBox 弹框",
					},
					{
						value: "notification",
						label: "Notification 通知",
					},
				],
			},
			{
				value: "navigation",
				label: "Navigation",
				children: [
					{
						value: "menu",
						label: "NavMenu 导航菜单",
					},
					{
						value: "tabs",
						label: "Tabs 标签页",
					},
					{
						value: "breadcrumb",
						label: "Breadcrumb 面包屑",
					},
					{
						value: "dropdown",
						label: "Dropdown 下拉菜单",
					},
					{
						value: "steps",
						label: "Steps 步骤条",
					},
				],
			},
			{
				value: "others",
				label: "Others",
				children: [
					{
						value: "dialog",
						label: "Dialog 对话框",
					},
					{
						value: "tooltip",
						label: "Tooltip 文字提示",
					},
					{
						value: "popover",
						label: "Popover 弹出框",
					},
					{
						value: "card",
						label: "Card 卡片",
					},
					{
						value: "carousel",
						label: "Carousel 走马灯",
					},
					{
						value: "collapse",
						label: "Collapse 折叠面板",
					},
				],
			},
		],
	},
	{
		value: "Resource",
		label: "资源",
        slot:"Resource",
		children: [
			{
				value: "axure",
				label: "Axure Components",
			},
			{
				value: "sketch",
				label: "Sketch Templates",
			},
			{
				value: "jiaohu",
				label: "组件交互文档",
			},
		],
	},
];
</script>

:::

::: title Cascader 自定义字段名
:::
::: demo 也许你当前数据键名并不是`label`、`value`、`children`,这时只需要使用replaceFields属性来自定义key
<template>
  <lay-cascader :options="options3" :replaceFields="replaceFields" placeholder="自义定key" :disabled="true"></lay-cascader>
</template>

<script setup>
import { ref } from "vue";
const replaceFields={
  label:'name',
  value:'id',
  children:'group'
}
const options3=[
  {
    name:"张三",
    id:1,
    group:[
      {
        name:"张三-1",
        id:2
      },
      {
        name:"张三-2",
        id:3
      },
      {
        name:"张三-3",
        id:4
      }
    ]
  },
  {
    name:"李四",
    id:5,
    group:[
      {
        name:"李四-1",
        id:6
      },
      {
        name:"李四-2",
        id:7
      },
      {
        name:"李四-3",
        id:8
      }
    ]
  }
]
</script>

:::

::: title Cascader 属性
:::

::: table

| 属性                     | 描述                  | 类型                  | 可选值                  | 默认值                  |
| -----------------------  | -------------------- |-------------------- |-------------------- |-------------------- |
| placeholder              | 提示信息              |             |             |             | 
| v-model / modelValue     | 值                   |             |             |             | 
| decollator               | 分割符号，默认为 /     |            |             |             | 
| options                  | 选项参数 格式请见上面的demo  |            |             |             | 
| onlyLastLevel            | 回显display仅显示最后一级，默认为 `false`  |            |             |             | 
| replaceFields            | 字段名称配置, 配置项为 `label`,`value`,`children`  |            |             |             | 
| allow-clear              | 默认slot提供清空功能，与lay-input保持一致|            |             |             | 
| size                     | 尺寸参数，与lay-input保持一致|            |             |             | 
| contentStyle             | 内容自定义样式     | `StyleValue` | -- | -- |
| contentClass             | 内容自定义Class    | `string` `Array<string \| object>` `object` | -- | -- |
| disabled | 禁用 | `boolean`  |--  |--  |
:::

::: title Cascader 事件
:::

::: table

| 方法名 | 描述         |用法|
| ---- | ------------ |--------|
| change | 选中后数据改变的回调 |onChange( evt ){ <br>	&nbsp;	&nbsp;/* evt.display<br>	&nbsp;	&nbsp;/* evt.value,<br>	&nbsp;	&nbsp;/* evt.label<br>	&nbsp;	&nbsp;/* evt.currentClick<br>}|

:::

::: contributor cascader
:::

::: previousNext cascader
:::
