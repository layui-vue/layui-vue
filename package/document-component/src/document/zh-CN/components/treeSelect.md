::: anchor
:::

::: title 基本介绍
:::

::: describe 树形组件一般用于展示具有层级关系的数据
:::

::: title 基础使用
:::

::: demo 使用 `lay-tree-select` 标签, 创建下拉树组件。

<template>
  <lay-tree-select v-model="value1" :data="data1"></lay-tree-select>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(1);

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

function handleClick(node) {
  console.log(node)
}
</script>

:::

::: title 开启多选
:::

::: demo 通过 `multiple` 标签, 开启下拉树多选。

<template>
  <lay-tree-select v-model="value2" placeholder="123" :data="data2" multiple></lay-tree-select>
</template>

<script setup>
import { ref } from 'vue';

const value2 = ref([23]);

const data2 = ref([{
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
</script>

:::

::: title 禁止选择
:::

::: demo 通过 `disabled` 属性, 禁止选择。

<template>
  <lay-tree-select v-model="value3" :data="data3" disabled></lay-tree-select>
</template>

<script setup>
import { ref } from 'vue';

const value3 = ref([]);

const data3 = ref([{
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
</script>

:::

::: title 允许清空
:::

::: demo 通过 `allow-clear` 属性开启清空操作。

<template>
  <lay-tree-select v-model="value4" :data="data4" placeholder="请选择" :allow-clear="true" :search="true" :multiple="true"></lay-tree-select>
</template>

<script setup>
import { ref } from 'vue';

const value4 = ref([]);

const data4 = ref([{
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
</script>

:::

::: title Tree Select 属性
:::

::: table

| 属性                             | 描述                                      | 类型          | 可选值          |默认值          |
| -------------------------------- | ---------------------------------------- | --------------- | --------------- | --------------- |
| v-model                          | 选中值                                    |  --            | --            | --            |
| data                             | 树数据                                    |  --            | --            | --            |
| multiple                         | 开启多选                                  |  --            | --            | --            |
| allow-clear                      | 允许清空                                  |  --            | --            | --            |
| disabled                         | 禁用选择                                  |  --            | --            | --            |
| placeholder                      | 输入提示                                  |  --            | --            | --            |
| checkStrictly                    | 禁用级联复选                              |  --            | --            | --            |
| collapseTagsTooltip              | 折叠提示                                  |  --            | --            | --            |
| checkStrictly                    | 禁用级联复选                              |  --            | --            | --            |
| minCollapsedNum                  | 超过指定标签后开启折叠                     |  --            | --            | --            |
| size                             | 尺寸大小                                  |  --            | --            | --            |

:::

::: title Tree Select 事件
:::

::: table

| 名称       | 描述     | 参数 |
| ---------- | --------------- | --------------- |
| change     | 选中值变化事件   | --              |

:::

::: contributor transition
:::

::: previousNext transition
:::
