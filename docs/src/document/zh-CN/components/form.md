::: anchor
:::

::: title 基本介绍
:::

::: describe 高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。
:::

::: title 基础使用
:::

::: demo 通过 `lay-form` 与 `lay-form-item` 标签，创建 `form` 组件。

<template>
  <lay-form :model="model">
    <lay-form-item label="账户" prop="username" tips="账户是您的登录凭据，可以在注册电子邮件中找到">
      <lay-input v-model="model.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password" tips="密码应当包含字母、数字和特殊符号中的任意两种">
      <lay-input v-model="model.password" type="password"></lay-input>
    </lay-form-item>
    <lay-form-item label="描述" prop="desc">
      <lay-textarea placeholder="请输入描述" v-model="model.describe"></lay-textarea>
    </lay-form-item>
    <lay-form-item style="text-align: center;">
      <lay-button type="primary" @click="submit">提交</lay-button>
      <lay-button type="default" @click="">重置</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { layer } from '@layui/layer-vue'

const model = reactive({})

const submit = () => {
  layer.msg(`${JSON.stringify(model)}`, { time: 2000 });
};
</script>

:::

::: title 方框风格
:::

::: demo 通过 `pane` 属性，启用方框风格，默认为 `false`。

<template>
  <lay-form :model="model1" :pane="pane1" :size="size1">
    <lay-form-item label="开关" prop="switch" mode="inline">
      <lay-switch v-model="pane1"></lay-switch>
    </lay-form-item>
  	<lay-form-item label="单选">
      <lay-radio-button v-model="size1" name="action" value="lg" label="极大"></lay-radio-button>
      <lay-radio-button v-model="size1" name="action" value="md" label="默认"></lay-radio-button>
	  <lay-radio-button v-model="size1" name="action" value="sm" label="微小"></lay-radio-button>
	  <lay-radio-button v-model="size1" name="action" value="xs" label="极小"></lay-radio-button>
    </lay-form-item>
    <lay-form-item label="账户" prop="username">
      <lay-input v-model="model1.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password">
      <lay-input v-model="model1.password" type="password"></lay-input>
    </lay-form-item>
    <lay-form-item label="头像" prop="avatar" mode="inline">
      <lay-icon-picker v-model="model1.avatar" allow-clear></lay-icon-picker>
    </lay-form-item>
	<lay-form-item label="颜色" prop="color" mode="inline">
      <lay-color-picker v-model="model1.color"></lay-color-picker>
    </lay-form-item>
    <lay-form-item label="喜好" prop="like" mode="inline">
      <lay-input v-model="model1.like"></lay-input>
    </lay-form-item>
    <lay-form-item label="爱好" prop="hobby" mode="inline">
      <lay-select v-model="model1.hobby" multiple>
        <lay-select-option value="1" label="学习"></lay-select-option>
        <lay-select-option value="2" label="编码"></lay-select-option>
        <lay-select-option value="3" label="运动"></lay-select-option>
      </lay-select>
    </lay-form-item>
    <lay-form-item label="开关" prop="switch" mode="inline">
      <lay-switch v-model="model1.switch"></lay-switch>
    </lay-form-item>
	<lay-form-item label="复选">
      <lay-checkbox-group v-model="model1.checkbox">
        <lay-checkbox name="like" skin="primary" value="1">写作</lay-checkbox>
        <lay-checkbox name="like" skin="primary" value="2">画画</lay-checkbox>
		<lay-checkbox name="like" skin="primary" value="3">运动</lay-checkbox>
      </lay-checkbox-group>
    </lay-form-item>
	<lay-form-item label="单选">
      <lay-radio v-model="model1.radio" name="action" :value="1" label="写作"></lay-radio>
      <lay-radio v-model="model1.radio" name="action" :value="2" label="画画"></lay-radio>
	  <lay-radio v-model="model1.radio" name="action" :value="3" label="运动"></lay-radio>
    </lay-form-item>
	<lay-form-item label="评分" prop="rate">
      <lay-rate v-model="model1.rate"></lay-rate>
    </lay-form-item>
    <lay-form-item label="权限" prop="treeSelect" mode="inline">
      <lay-tree-select v-model="model1.treeSelect" :data="data1"></lay-tree-select>
    </lay-form-item>
    <lay-form-item label="级联" prop="cascader" mode="inline">
      <lay-cascader  v-model="model1.cascader" :options="options"></lay-cascader>
    </lay-form-item>
    <lay-form-item label="年龄" prop="password" mode="inline">
 	  <lay-slider :showDots="true" :step="10" :max="100" v-model="value1" :disabled="false"></lay-slider>
    </lay-form-item>
    <lay-form-item label="描述" prop="desc">
      <lay-textarea placeholder="请输入描述" v-model="model1.describe"></lay-textarea>
    </lay-form-item>
    <lay-form-item>
      <lay-button type="primary" @click="submit1">提交</lay-button>
      <lay-button type="default" @click="">重置</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { layer } from '@layui/layer-vue'


const model1 = reactive({})

const size1 = ref("md");

const pane1 = ref(true);

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

const data1 = ref([{
	title: '一级1',
	id: 1,
	field: 'name1',
	children: [{
		title: '二级1-1 可允许跳转',
		id: 3,
		field: 'name11',
		href: 'https://www.layui.com/',
		children: [{
			title: '三级1-1-3',
			id: 23,
			field: '',
			children: [{
				title: '四级1-1-3-1',
				id: 24,
				field: '',
				children: [{
					title: '五级1-1-3-1-1',
					id: 30,
				},
				{
					title: '五级1-1-3-1-2',
					id: 31,
				}]
			}]
		},
		{
			title: '三级1-1-1',
			id: 7,
			field: '',
			children: [{
				title: '四级1-1-1-1 可允许跳转',
				id: 15,
				href: 'https://www.layui.com/doc/'
			}]
		},
		{
			title: '三级1-1-2',
			id: 8,
			field: '',
			children: [{
				title: '四级1-1-2-1',
				id: 32,
			}]
		}]
	},
	{
		title: '二级1-2',
		id: 4,
		spread: true,
		children: [{
			title: '三级1-2-1',
			id: 9,
		},
		{
			title: '三级1-2-2',
			id: 10,
		}]
	},
	{
		title: '二级1-3',
		id: 20,
		field: '',
		children: [{
			title: '三级1-3-1',
			id: 21,
			field: ''
		},
		{
			title: '三级1-3-2',
			id: 22,
			field: ''
		}]
	}]
},
{
	title: '一级2',
	id: 2,
	children: [{
		title: '二级2-1',
		id: 5,
		spread: true,
		children: [{
			title: '三级2-1-1',
			id: 11,
		},
		{
			title: '三级2-1-2',
			id: 12,
		}]
	},
	{
		title: '二级2-2',
		id: 6,
		children: [{
			title: '三级2-2-1',
			id: 13,
		},
		{
			title: '三级2-2-2',
			id: 14,
		}]
	}]
},
{
	title: '一级3',
	id: 16,
	field: '',
	children: [{
		title: '二级3-1',
		id: 17,
		field: '',
		fixed: true,
		children: [{
			title: '三级3-1-1',
			id: 18,
			field: ''
		},
		{
			title: '三级3-1-2',
			id: 19,
			field: ''
		}]
	},
	{
		title: '二级3-2',
		id: 27,
		field: '',
		children: [{
			title: '三级3-2-1',
			id: 28,
			field: ''
		},
		{
			title: '三级3-2-2',
			id: 29,
			field: ''
		}]
	}]
}]);

const submit1 = function(){
  layer.msg(`${JSON.stringify(model1)}`, { time: 2000 });
};
</script>

:::

::: title 行内表单
:::

::: demo 通过 `mode` 属性 `inline` 值，采用行内布局，默认为 `block` 块状布局。

<template>
  <lay-form :model="model2" :pane="true">
    <lay-form-item label="账户" prop="username" mode="inline">
      <lay-input v-model="model2.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password" mode="inline">
      <lay-input v-model="model2.password" type="password"></lay-input>
    </lay-form-item>
    <lay-form-item mode="inline">
      <lay-button type="primary" @click="submit2">提交</lay-button>
      <lay-button type="default" @click="">重置</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

const model2 = reactive({
  username: "admin",
  password: "admin",
})

const submit2 = function(){
  layer.open(`${JSON.stringify(model)}`);
};
</script>

:::

::: title label超出隐藏
:::

::: demo 通过 `isLabelTooltip` 属性开启超出隐藏，默认值为 `false`

<template>
  <lay-form :model="model3"  :label-position="labelPosition3" required isLabelTooltip :tooltipProps="tooltipProps">
    <lay-form-item label="label label label label" prop="username">
      <lay-input v-model="model3.username"></lay-input>
    </lay-form-item>
		<lay-form-item label="超出密码超出密码超出密码" prop="username">
      <lay-input v-model="model3.password"></lay-input>
    </lay-form-item>
  </lay-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

const model3 = reactive({})
const labelPosition3 = ref('right');
const tooltipProps = reactive({
	isDark: true
})

</script>

:::


::: title 对齐方式
:::

::: demo 通过 `label-position` 属性改变标签位置，默认值为 `right`，可选值为 `top`，`left`。

<template>
  <lay-form :model="model3"  :label-position="labelPosition3">
    <lay-form-item label="账户" prop="username">
      <lay-input v-model="model3.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password">
      <lay-input v-model="model3.password" type="password"></lay-input>
    </lay-form-item>
    <lay-form-item label="爱好" prop="hobby">
      <lay-select v-model="model3.hobby">
        <lay-select-option value="1" label="学习"></lay-select-option>
        <lay-select-option value="2" label="编码"></lay-select-option>
        <lay-select-option value="3" label="运动"></lay-select-option>
      </lay-select>
    </lay-form-item>
    <lay-form-item label="特长" prop="specialty">
      <lay-radio v-model="labelPosition3" name="labelPosition" value="left">左</lay-radio>
      <lay-radio v-model="labelPosition3" name="labelPosition" value="top">上</lay-radio>
      <lay-radio v-model="labelPosition3" name="labelPosition" value="right">右</lay-radio>
    </lay-form-item>
    <lay-form-item label="描述" prop="desc">
      <lay-textarea placeholder="请输入描述" v-model="model3.desc"></lay-textarea>
    </lay-form-item>
  </lay-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

const model3 = reactive({})
const labelPosition3 = ref('right');

</script>

:::

::: title 表单验证
:::

::: demo

<template>
  <lay-form :model="model4" ref="layFormRef4" required>
    <lay-form-item label="账户" prop="username">
      <lay-input v-model="model4.username"></lay-input>
    </lay-form-item>
    <lay-form-item prop="password">
      <lay-input v-model="model4.password" type="password">></lay-input>
    </lay-form-item>
    <lay-form-item label="爱好" prop="hobby">
      <lay-select v-model="model4.hobby" multiple>
        <lay-select-option value="1" label="学习"></lay-select-option>
        <lay-select-option value="2" label="编码"></lay-select-option>
        <lay-select-option value="3" label="运动"></lay-select-option>
      </lay-select>
    </lay-form-item>
    <lay-form-item label="特长" prop="specialty.x[0].y">
      <lay-radio v-model="model4.specialty.x[0].y" name="specialty" value="1">写作</lay-radio>
      <lay-radio v-model="model4.specialty.x[0].y" name="specialty" value="2">画画</lay-radio>
      <lay-radio v-model="model4.specialty.x[0].y" name="specialty" value="3">编码</lay-radio>
    </lay-form-item>
    <lay-form-item label="描述" prop="desc">
      <lay-textarea placeholder="请输入描述" v-model="model4.desc"></lay-textarea>
    </lay-form-item>
    <lay-form-item style="text-align: center;">
      <lay-button type="primary" @click="submit4">提交</lay-button>
      <lay-button @click="clearValidate4">清除校验</lay-button>
      <lay-button @click="reset4">重置表单</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { layer } from '@layui/layer-vue'

const model4 = reactive({
	specialty: {
		x: [{
			y: "1"
		}]
	},
	aaaaaaaaa: "aaaaa"
})

const layFormRef4 = ref();

const submit4= function() {
  layFormRef4.value.validate((isValidate, model, errors) => {
    layer.open({
      type: 1,
      title:"表单提交结果", 
      content: `<div style="padding: 10px"><p>是否通过 : ${isValidate}</p> <p>表单数据 : ${JSON.stringify(model)} </p> <p>错误信息 : ${JSON.stringify(errors)}</p></div>`, 
      shade: false,
      isHtmlFragment: true,
      btn : [{ text: '确认', callback(index) {  layer.close(index) }}],
      area : '500px'
    });
  });
}

const clearValidate4 = () => {
  layFormRef4.value.clearValidate();
}

const reset4 = () => {
  layFormRef4.value.reset();
}

</script>

:::

::: title 校验规则
:::

::: demo

<template>
  <lay-form :model="model5" ref="layFormRef5" :rules="rules5" required>
    <lay-form-item label="邮箱" prop="email">
      <lay-input v-model="model5.email"></lay-input>
    </lay-form-item>
    <lay-form-item label="路径" prop="url">
      <lay-input v-model="model5.url"></lay-input>
    </lay-form-item>
    <lay-form-item label="日期" prop="date">
      <lay-input v-model="model5.date"></lay-input>
    </lay-form-item>
    <lay-form-item label="账户" prop="username">
      <lay-input v-model="model5.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="年龄" prop="age">
      <lay-input v-model.number="model5.age" type="number" :allow-clear="true"></lay-input>
    </lay-form-item>
		<lay-form-item label="异步校验" prop="sync">
      <lay-input v-model.number="model5.sync" type="number" :allow-clear="true"></lay-input>
    </lay-form-item>
    <lay-form-item style="text-align: center">
      <lay-button @click="submit5" type="primary">提交</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {layer} from '@layui/layer-vue'

const layFormRef5 = ref();

const model5 = reactive({
  email: "",
  url: "",
  date: "",
  username: "",
  age: null,
	sync: 0,
})

const rules5 = ref({
  email : {
    type : 'email',
  },
  url : {
    type : 'url'
  },
  date : {
    type : 'date'
  },
  username : {
    type :  'string',
    min : 8,
    max : 16
  },
  age : {
    validator(rule, value, callback, source, options){
      if (value < 18) {
        callback(new Error(`${rule.field}太过于年轻`));
      } else {
        return true;
      }
    }
  },
	sync: {
		 asyncValidator: (rule, value) => {
      return new Promise((resolve, reject) => {
        if (value < 18) {
					// 模拟接口
          setTimeout(() => {
						reject('年龄不能小于18岁');  // reject with error message
					}, 1000)
        } else {
          resolve();
        }
      });
    },
	}
})

const submit5 = function() {
  layFormRef5.value.validate((isValidate, model, errors) => {
      layer.open({
      type: 1,
      title:"表单提交结果", 
      content: `<div style="padding: 10px"><p>是否通过 : ${isValidate}</p> <p>表单数据 : ${JSON.stringify(model)} </p> <p>错误信息 : ${JSON.stringify(errors)}</p></div>`, 
      shade: false,
      isHtmlFragment: true,
      btn : [{ text: '确认', callback(index) {  layer.close(index) }}],
      area : '500px'
    });
  });
}
</script>

:::

::: title 原生提交
:::

::: demo

<template>
  <lay-form @submit="submit10" :model="submitModel10" requiredIcons="layui-icon-heart-fill" :use-CN="false" required>
    <lay-form-item label="账户" prop="username">
      <lay-input v-model="submitModel10.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password">
      <lay-input v-model="submitModel10.password"></lay-input>
    </lay-form-item>
    <lay-form-item style="text-align:center">
      <lay-button type="primary" native-type="submit">提交</lay-button>
    </lay-form-item>
  </lay-form>
</template>

<script>
import { ref, reactive } from 'vue';
import { layer } from '@layui/layer-vue';

const submitModel10 = reactive({
  username: "",
  password: ""
})

const submit10 = function(isValidate, model, errors) {
  layer.msg(`${JSON.stringify(errors)}`)
}
</script>

:::

::: title 表单(form)属性
:::

::: table

| 属性                    | 描述                         | 类型      | 可选值         | 默认值       |
| ----------------------- | --------------------------- | --------- | -------------- | ------------ |
| model                 | 表单绑定                     | `object`  | -              | {}           |
| required                | 是否必填                     | `boolean` | `true` `false` | `false`      |
| rules                   | 表单校验规则; <br>可查看[async-validator](https://github.com/yiminghe/async-validator) `object`  | -              | -            |
| size                    | 全局控件尺寸                     | `string`          | `xs`  `sm`  `md`  `lg`        | `md`      |
| mode              | 全局表单项显示的模式，`块元素` / `行元素`                       | `string`    |  `block` `inline`     | `block`    |
| pane                    | 启用方框风格                 | `boolean`  |  `true` `false`              | `false` |
| initValidate            | 是否一开始就校验表单          | `boolean` | `true` `false` | `false`      |
| useCN                   | 是否使用中文错误提示          | `boolean` | `true` `false` | `true`      |
| label-position          | 全局标签位置                     | `string`    |  `top` `right` `left`        | `right` |
| labelWidth              | 全局标签宽度                     | `string` `number`    |                 | `95`   |
| inlineWidth `2.17.4`       |主体宽度       | `string` `number`    |                 | `auto`   |
| requiredIcons           | 必填前缀图标`class`          | `string`  | -              | `*`          |
| required-error-message | 必填错误提示信息              | `string`  | -              | `%s不能为空` |
| validate-message        | 自定义校验错误提示信息; <br>由于内置了中文错误提示，可按需求增量增加<br>可查看 [async-validator 内置错误提示](https://github.com/yiminghe/async-validator/blob/master/src/messages.ts)<br>也可参考 [layui-vue 内置中文错误提示](https://gitee.com/layui/layui-vue/blob/next/package/component/src/component/formItem/cnValidateMessage.ts) | `string`  | -              | `%s不能为空` |
| isLabelTooltip `2.17.0`      | Label是否超出隐藏省略号     | `boolean`    |       | `false`    |
| tooltipProps              | 可查看[tooltip组件](http://www.layui-vue.com/zh-CN/components/tooltip)      | `object`    |      |    |

:::

::: title 表单(form)事件
:::

::: table

| 属性   | 描述                   | 回调参数 |
| ------ | --------------------- | -------- |
| submit | 提交事件`(不推荐使用)` | (`isValidate`, `model`, `errors`)<br><br> `isValidate`: (`boolean`)是否校验通过<br><br> `model`: (`object`)表单绑定的值<br><br> `errors`: (`Array`)校验结果的错误信息 |

:::

::: title 表单(form)方法
:::

::: table

| 属性          | 描述                                                                                                                                                      | 入参                                                                                                                                                                                                                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| validate      | 表单校验; <br>如果没有`callback`回调，会返回`Promise`, <br> `Promise`参数为{`isValidate`, `model`, `errors`}<br> 参数具体描述请看上面表单`submit`提交事件 | (`fields` `[可选]`, `callback` `[可选]`)<br><br> `fields`: (`string` / `string[]` / `function`)<br>单独校验的字段，<br>该字段如果为`function`, <br>则认为`callback`入参，校验全部字段;<br><br> `callback`: (`function`)校验之后的回调，<br>回调参数为(`isValidate`, `model`, `errors`)；<br>参数具体描述请看上面表单`submit`提交事件 |
| clearValidate | 清除表单校验                                                                                                                                              | (`fields`[可选])<br><br> `fields`: (`string` / `string[]`)<br>需要进行清除校验的表单字段, 如果该字段为空则清除全部校验                                                                                                                                                                                                               |
| reset         | 重置表单所有值                                                                                                                                            | -                                                                                                                                                                                                                                                                                                                                    |

:::

::: title 表单项(form-item)属性
:::

::: table

| 属性                   | 描述                                                                                   | 类型              | 可选值               | 默认值  |
| ---------------------- | -------------------------------------------------------------------------------------- | ----------------- | -------------------- | ------- |
| prop                   | 在表单绑定值(`model`)中字段`key`                                                       | `string`          | -                    | -       |
| size                    | 全局控件尺寸                     | `string`          | `xs`  `sm`  `md`  `lg`        | `md`      |
| mode              | 全局表单项显示的模式，`块元素` / `行元素`                       | `string`    |  `block` `inline`     | `block`    |
| label                  | 子项前边描述值，**尽量填写**，中文校验错误需要用到                                     | `string`          | -                    | -       |
| label-position         | 子项前边描述值的位置                                                                   | `string`          | `left` `top` `right` | `right` |
| label-width            | 子项前边描述值的宽度                                                                   | `string` `number` | -                    | `95`    |
| inlineWidth `2.17.4`            |主体宽度       | `string` `number`    |                 | `auto`   |
| required               | 表单必填                                                                               | `boolean`         | `true` `false`       | `false` |
| required-error-message | 表单必填校验失败固定提示语                                                             | `string`          | --                   | --      |
| rules                  | 表单校验规则; <br>可查看[async-validator](https://github.com/yiminghe/async-validator) | `object`          | -                    | -       |
| error-message          | 表单校验失败固定提示语                                                                 | `string`          | --                   | --      |
| tips | 表单项说明 | `string` | - | - |
:::

::: title 表单项(form-item)方法
:::

::: table

| 属性          | 描述         | 入参        |
| ------------- | ------------ | -----------|
| validate      | 表单校验;    | (`callback` `[可选]`)<br><br> `callback`: (`function`)校验之后的回调，<br>回调参数为(`errors`, `fields`)；<br><br> `errors`: (`Array`)校验结果的错误信息；<br><br> `fields`: (`Array`)当前校验的字段信息 |
| clearValidate | 清除表单校验  | -         |

:::

::: title 表单项(form-item)插槽
:::

::: table

| 属性     | 描述                                                                 | 可使用参数                               |
| -------- | --------------------------------------------------------------------| ---------------------------------------- |
| -        | 默认插槽                                                             | 传递进来的`props`和表单绑定的值(`model`) |
| label    | 子项前边描述插槽<br>如果使用此插槽，`props`**尽量**也传递`label`参数    | 传递进来的`props`和表单绑定的值(`model`) |
| required | 必填前缀插槽                                                         | `*` / `表单props` 中的 `requiredIcons`   |

:::

::: title 关于 async-validator 的使用
:::

::: describe 查看： https://github.com/yiminghe/async-validator。
:::

::: describe 翻译： https://www.cnblogs.com/wozho/p/10955525.html。
:::

::: title async-validator 基本校验类型
:::

::: table
| 属性 | 描述 | 使用方式 |
| -------------| ----------------- | ------------------- |
| number | 数字 | `{type : 'number'}` |
| boolean | 布尔类型 | `{type : 'boolean'}` |
| method | 方法 | `{type : 'method'}` |
| regexp | 正则表达式 | `{type : 'regexp'}` |
| integer | 整型数字 | `{type : 'integer'}` |
| float | 浮点小数 | `{type : 'float'}` |
| array | 数组 | `{type : 'array'}` |
| object | 对象 | `{type : 'object'}` |
| enum | 枚举 | `{type : 'enum'}` |
| date | 日期 | `{type : 'date'}` |
| url | url | `{type : 'url'}` |
| hex | 十六进制 | `{type : 'hex'}` |
| email | 邮箱 | `{type : 'email'}` |
:::

::: title async-validator 中 validator 参数使用
:::

```javascript
{
  validator: (rule, value) => value === "root";
}
```

::: title async-validator 中 asyncValidator 参数使用
:::

```javascript
{
  asyncValidator: (rule, value) => {
    return new Promise((resolve, reject) => {
      if (value < 18) {
        reject("too young"); // reject with error message
      } else {
        resolve();
      }
    });
  };
}
```

::: title form 配置 async-validator 的使用
:::

```javascript
{
    key : rule // key为表单子项需要校验的对应key名称， rule为校验规则，格式为{}
}
// 例如 表单绑定值为 {email : 'xxx', username: 'xxxxx'}
// 需要校验邮箱,而邮箱输入框在表单绑定的值中key为email，
// 需要校验用户名长度为8到16之间,而用户名输入框在表单绑定的值中key为username，
{
  email : {
    type :  'email'
  },
  username : {
    type :  'string',
    min : 8,
    max : 16
  }
}
```

::: title form-item 配置 async-validator 的使用
:::

```javascript
// 例如 表单绑定值为 {email : 'xxx', phone: 'xxxxx'}
// 需要校验邮箱,而邮箱输入框在表单绑定的值中key为email
{
  type: "email";
}
```

::: previousNext form
:::
