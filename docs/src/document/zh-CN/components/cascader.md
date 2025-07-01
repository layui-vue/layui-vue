::: anchor
:::

::: title 基本介绍
:::

::: describe ### `2.18.0` 版本新增多选、搜索、动态加载功能。
:::

::: describe 将数据按照指定的格式传入后分层分级，通过此组件逐级查看并选择。
:::

::: title 基础使用
:::

::: demo 使用 `lay-cascader` 标签创建级联选择器

<template>
  <div>
    <lay-cascader :options="options" v-model="value" placeholder="点我试一试" allow-clear></lay-cascader>
    <span style="margin-left:20px">输出的值：{{value}}</span>
    <lay-button @click="clickSetValue" size='sm' style='margin-left:10px'>修改v-model</lay-button>
  </div>
  <div style="margin-top:12px;">
    <lay-cascader :options="options" v-model="multipleVal" placeholder="点我试一试" :multiple="true" allow-clear></lay-cascader>
    <span style="margin-left:20px">输出的值：{{multipleVal}}</span>
  </div>
  <div style="margin-top:12px;">
    <span style="margin-right: 12px;">非严格单选</span>
    <lay-cascader :lazy="true" :load="lazyLoad" :options="options" v-model="singleValue" placeholder="点我试一试" :check-strictly="true" allow-clear></lay-cascader>
    <span style="margin-left:20px">输出的值：{{singleValue}}</span>
  </div>
  <div style="margin-top:12px;">
    <span style="margin-right: 12px;">非严格多选</span>
    <lay-cascader :options="options" :lazy="true" :load="lazyLoad" v-model="multipleValue" placeholder="点我试一试" :multiple="true" :check-strictly="true" allow-clear></lay-cascader>
    <span style="margin-left:20px">输出的值：{{multipleValue}}</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
const value=ref("Guide/shejiyuanze/yizhi");
const multipleVal=ref([]);
const singleValue=ref([]);
const multipleValue=ref([]);
const lazyLoad = (node, resolve) => {
    resolve([{ label: "test", value: "test" }]);
}
const clickSetValue = () => {
    value.value="Guide/shejiyuanze/fankui";
}
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
::: demo 使用 `changeOnSelect` 属性开启。
<template>
  <lay-cascader :options="options" v-model="valueChangeOnSelect" :only-last-level="true" :change-on-select="true" allow-clear placeholder="选择即改变" ></lay-cascader>
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
  <lay-cascader :options="options5" v-model="value" placeholder="动态插槽案例" style="width:250px;margin-left:20px">
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
const options5 = [
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
  <lay-cascader :options="options3" :replaceFields="replaceFields" placeholder="自定义key"></lay-cascader>
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

::: title 搜索
:::

::: demo `search` 是否开启搜索，`searchMethod` 控制过滤数据。
<template>
  <lay-cascader :options="options4" search></lay-cascader><br />
	多选:{{multipleValue1}}<br />
  <lay-cascader v-model="multipleValue1" :options="options4" multiple search></lay-cascader>
</template>

<script setup>
	import {ref} from 'vue'

	const multipleValue1 = ref([])
	const options4 = [
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

::: title 懒加载
:::

::: demo 懒加载需要通过 `lazy` 属性与 `load` 方法实现。`lazy` 属性接受一个布尔值，`load` 方法接受一个回调函数，用于动态加载选项，这个回调函数接受两个参数，第一个参数是当前点击的节点，第二个参数是加载完成后的回调函数。
<template>
  <lay-cascader v-model="searchValue" :options="options2" :lazy="true" :load="load"></lay-cascader>
</template>

<script setup>
  import { ref } from 'vue';
	const searchValue = ref()
  const options2 = ref([
    {label: "北京", value: '010000'},
    {label: "广西壮族自治区", value: '450000'},
  ]);
  const load = (el, resolve) => {
		if(el.value === '450000') {
			setTimeout(() => {
				resolve([
					{label: "南宁", value: '450100'},
					{label: "柳州", value: '450200'},
					{label: "桂林", value: '450300'},
				]);
			}, 2000);
		}else {
			resolve()
		}
    
  };
</script>
:::

::: title CascaderPanel 级联选择器面板
:::

::: demo CascaderPanel 是 Cascader 的核心组件，你可以在上面使用部分 Cascader 的参数。
<template>
  <div style="padding: 12px;">{{_selectKeys}}</div>
  <lay-form>
    <lay-form-item label="严格选择">
        <lay-switch v-model="checkStrictly"></lay-switch>
    </lay-form-item>
  </lay-form>
  <lay-cascader-panel :options="options4" v-model="_selectKeys" :checkStrictly="checkStrictly" @update:multiple-select-item="onMultipleSelectItem" :replaceFields="[{label:'label'}]" :multiple="true"></lay-cascader-panel>
</template>

<script setup>
  import { ref } from 'vue';

  const _selectKeys = ref(["450201", "450202", "450101", "450102"]);
  const checkStrictly = ref(false);
  const onMultipleSelectItem = (item) => {
    console.log(item);
  }
  const options4 = ref([
	{label: "北京", value: '010000'},
	{label: "广西壮族自治区", value: '450000', children: [
        {label: "南宁", value: '450100', children: [
            {label: "市辖区", value: '450101'},
            {label: "兴宁区", value: '450102'},
            {label: "青秀区", value: '450103'},
            {label: "江南区", value: '450105'},
            {label: "西乡塘区", value: '450107'},
            {label: "良庆区", value: '450108'},
            {label: "邕宁区", value: '450109'},
            {label: "武鸣区", value: '450122'},
            {label: "隆安县", value: '450123'},
            {label: "马山县", value: '450124'},
            {label: "上林县", value: '450125'},
            {label: "宾阳县", value: '450126'},
            {label: "横县", value: '450127'},
        ]},
		{label: "柳州", value: '450200', children: [
			{label: "市辖区", value: '450201'},
			{label: "城中区", value: '450202'},
			{label: "鱼峰区", value: '450203'},
			{label: "柳南区", value: '450204'},
			{label: "柳北区", value: '450205'},
			{label: "柳江县", value: '450221'},
			{label: "鹿寨县", value: '450222'},
			{label: "融安县", value: '450223'},
			{label: "融水苗族自治县", value: '450224'},
			{label: "三江侗族自治县", value: '450225'},
		]},
		{label: "桂林", value: '450300', children: [
			{label: "市辖区", value: '450301'},
			{label: "秀峰区", value: '450302'},
			{label: "叠彩区", value: '450303'},
			{label: "象山区", value: '450304'},
			{label: "七星区", value: '450305'},
			{label: "雁山区", value: '450311'},
			{label: "临桂区", value: '450312'},
			{label: "阳朔县", value: '450321'},
			{label: "灵川县", value: '450322'},
			{label: "全州县", value: '450323'},
			{label: "兴安县", value: '450324'},
			{label: "永福县", value: '450325'},
			{label: "灌阳县", value: '450326'},
			{label: "龙胜各族自治县", value: '450327'},
			{label: "资源县", value: '450328'},
			{label: "平乐县", value: '450329'},
			{label: "荔浦县", value: '450330'},
			{label: "恭城瑶族自治县", value: '450331'},
		]},
	]}
  ]);
</script>
:::

::: title Cascader 属性
:::

::: table

| 属性                     | 描述                  | 类型                  |  默认值           |版本          |
| -----------------------  | -------------------- |-------------------- |-------------------- |-------------------- |
| placeholder              | 提示信息                                  | `string` | -- | -- | 
| v-model / modelValue     | 值                                       | `string` `Array<string>` | -- | -- | 
| decollator               | 分割符号，默认为 /                         | `string` | -- | -- | 
| options                  | 选项参数 格式请见上面的demo                 | -- | -- | -- | 
| onlyLastLevel            | 回显display仅显示最后一级                  | `boolean` | `false` | -- | 
| replaceFields            | 字段别名                                  | `{label: string, value: string, children: string}` | -- | -- | 
| allow-clear              | 默认slot提供清空功能，与lay-input保持一致    | `boolean` | -- | -- | 
| size                     | 尺寸参数，与lay-input保持一致               | -- | -- | -- | 
| contentStyle             | 内容自定义样式                             | `StyleValue` | -- | -- |
| contentClass             | 内容自定义Class                          | `string` `Array<string \| object>` `object` | -- | -- |
| disabled                 | 禁用                                    | `boolean`  | --  | --  |
| checkStrictly            | 严格模式        | `boolean` | -- | `2.18.0` |
| lazy                     | 是否启用懒加载       | `boolean` | -- | `2.18.0` |
| load                     | 懒加载方法           | `CascaderPanelLazyloadFunction` | -- | `2.18.0` |
| search                   | 是否启用搜索           | `boolean` | -- | `2.18.0` |
| searchMethod             | 搜索方法            | `(value: string) => Array<CascaderPanelItemProps>` | -- | `2.18.0` |
| multiple                 | 多选模式           | `boolean` | -- | `2.18.0` |
| fullpath                 | 多选模式下显示Tag的完整路径               | `boolean` | -- | `2.18.0` |
| min-collapsed-num        | 多选模式下显示Tag超过指定标签后开启折叠       | `number` | `3` | `2.19.0`  |
| collapse-tags-tooltip    | 多选模式下显示Tag折叠提示      | `boolean` | -- | `2.19.0` |
| teleport-props        | 继承至 dropdown 组件，下拉面板 `传递` 属性              | `object`   | `{to: 'body', disabled: false}` | `2.19.0` |
:::

::: title Cascader 事件
:::

::: table

| 方法名 | 描述         |用法|
| ---- | ------------ |--------|
| change | 选中后数据改变的回调 | `(value: Array<string>) => void`  |

:::

::: title Cascader 方法
:::

::: table

| 属性 | 描述         | 属性类型 | 版本 |
| ---- | -------------- |--------|-------|
| getSelectLabel | 选中值对应的文本 | `ComputedRef<string \| string[]>`  | `2.23.0` |

:::

::: title CascaderPanel 属性
:::

::: table

| 属性                     | 描述                  | 类型                  | 可选值                  | 默认值                  |
| -----------------------  | -------------------- |-------------------- |-------------------- |-------------------- |
| v-model / modelValue     | 值                                       | `string` `Array<string>` | -- | -- | 
| decollator               | 分割符号，默认为 /                         | `string` | -- | -- | 
| options                  | 选项参数 格式请见上面的demo                 | -- | -- | -- | 
| onlyLastLevel            | 回显display仅显示最后一级                  | `boolean` | -- | `false` | 
| replaceFields            | 字段别名                                  | `{label: string, value: string, children: string}` | -- | -- | 
| allow-clear              | 默认slot提供清空功能，与lay-input保持一致    | `boolean` | -- | -- | 
| disabled                 | 禁用                                    | `boolean`  | --  | --  |
| checkStrictly            | 严格模式                                 | `boolean` | -- | -- |
| lazy                     | 是否启用懒加载                            | `boolean` | -- | -- |
| load                     | 懒加载方法                               | `CascaderPanelLazyloadFunction` | -- | -- |
| multiple                 | 多选模式                                 | `boolean` | -- | -- |
| height                   | 高度                                   | `number` `string` | -- | -- |
:::

::: title CascaderPanel 事件
:::

::: table

| 方法名 | 描述         |用法|
| ---- | ------------ |--------|
| change | 选中后数据改变的回调 | `(value: Array<string>) => void`  |
| update:multipleSelectItem | 多选勾选事件 | `(map: Map<string, CascaderPanelItemPropsInternal>) => void` |

:::

::: previousNext cascader
:::
