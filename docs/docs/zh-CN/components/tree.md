::: demo

<template>
  <lay-tree
    :data="data"
    :onlyIconControl="iconCtrl"
    :showLine="showLine"
    :showCheckbox="showCheckbox"
    v-model:checkedKeys="checkedKeys"
    @node-click="handleClick"
  >
  </lay-tree>
  <br/>
  是否可开启选择框：
  <br/>
  <lay-switch v-model="showCheckbox"></lay-switch>
  <br/>
  checkedKeys：
  <pre>
    {{ checkedKeys }}
  </pre>
  只能通过节点左侧图标来展开收缩：
  <br/>
  <lay-switch v-model="iconCtrl"></lay-switch>
  <br/>
  是否开启连接线：
  <br/>
  <lay-switch v-model="showLine"></lay-switch>
  <br/>
  当前点击的节点：
  <br/>
  <pre>
    {{ clickNode }}
  </pre>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([{
	title: '一级1',
	id: 1,
	field: 'name1',
	checked: true,
	spread: true,
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
					field: ''
				},
				{
					title: '五级1-1-3-1-2',
					id: 31,
					field: ''
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
				field: '',
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
				field: ''
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
			field: '',
			disabled: true
		},
		{
			title: '三级1-2-2',
			id: 10,
			field: ''
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
	field: '',
	spread: true,
	children: [{
		title: '二级2-1',
		id: 5,
		field: '',
		spread: true,
		children: [{
			title: '三级2-1-1',
			id: 11,
			field: ''
		},
		{
			title: '三级2-1-2',
			id: 12,
			field: ''
		}]
	},
	{
		title: '二级2-2',
		id: 6,
		field: '',
		children: [{
			title: '三级2-2-1',
			id: 13,
			field: ''
		},
		{
			title: '三级2-2-2',
			id: 14,
			field: '',
			disabled: true
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

const iconCtrl = ref(false);
const showLine = ref(true);
const clickNode = ref(null);
const showCheckbox = ref(true);
const checkedKeys = ref([9, 10, 24]);

function handleClick(node) {
 clickNode.value = node
}
</script>

:::

::: field tree attributes

:::

| Name   | Description | Accepted Values  |
| -------- | ---- | ----------------------- | 
| name       | 原始属性 name | --  | 
| data       | 树型组件数据,类型TreeData[] | null | 
| showCheckbox | 是否显示复选框 | false |
| onlyIconControl | 是否仅允许节点左侧图标控制展开收缩 | false |
| showLine | 是否开启连接线 | true |
| checkedKeys(v-model:checkedKeys)    |  开启选中后选中的节点 | - |


::: field tree events

:::

| Name   | Description | Accepted Params  |
| -------- | ---- | ----------------------- | 
| node-click       | 节点 click 事件 | --  | 
