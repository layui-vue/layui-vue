::: anchor
:::

::: title 基本介绍
:::

::: describe 树形组件一般用于展示具有层级关系的数据
:::

::: title 基础使用
:::

::: demo 使用 `lay-tree` 标签, 创建树形组件, @node-click 监听节点点击。

<template>
  <lay-tree
    :data="data"
    @node-click="handleClick"
  >
  </lay-tree>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([{
	title: '一级1',
	id: 1,
	checked: true,
	children: [{
		title: '二级1-1 可允许跳转',
		id: 3,
		href: 'https://www.layui.com/',
		children: [{
			title: '三级1-1-3',
			id: 23,
			children: [{
				title: '四级1-1-3-1',
				id: 24,
				children: [{
					title: '五级1-1-3-1-1',
					id: 30,
					field: ''
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
			children: [{
				title: '四级1-1-1-1 可允许跳转',
				id: 15,
				href: 'https://www.layui.com/doc/'
			}]
		},
		{
			title: '三级1-1-2',
			id: 8,
			children: [{
				title: '四级1-1-2-1',
				id: 32,
			}]
		}]
	},
	{
		title: '二级1-2',
		id: 4,
		children: [{
			title: '三级1-2-1',
			id: 9,
			disabled: true
		},
		{
			title: '三级1-2-2',
			id: 10,
		}]
	},
	{
		title: '二级1-3',
		id: 20,
		children: [{
			title: '三级1-3-1',
			id: 21,
		},
		{
			title: '三级1-3-2',
			id: 22,
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
			disabled: true
		}]
	}]
},
{
	title: '一级3',
	id: 16,
	children: [{
		title: '二级3-1',
		id: 17,
		fixed: true,
		children: [{
			title: '三级3-1-1',
			id: 18,
		},
		{
			title: '三级3-1-2',
			id: 19,
		}]
	},
	{
		title: '二级3-2',
		id: 27,
		children: [{
			title: '三级3-2-1',
			id: 28,
		},
		{
			title: '三级3-2-2',
			id: 29,
		}]
	}]
}]);

function handleClick(node) {
  console.log("Click Node:" + JSON.stringify(node));
}
</script>

:::

::: title 选择节点
:::

::: demo 使用 `showCheckbox` 属性开启复选框, `checkedKeys` 属性设置选中项。

<template>
  <lay-tree
    :data="data2"
	:showCheckbox="showCheckbox2"
	v-model:checkedKeys="checkedKeys2"
  >
  </lay-tree>
  <lay-space>
    <lay-button @click="updateView2">更新数据</lay-button>
  	<lay-button @click="updateCheckedKeys2">更新选择</lay-button>
  	{{ checkedKeys2 }}
  </lay-space>
</template>

<script setup>
import { ref } from 'vue';

const checkedKeys2 = ref([]);
const showCheckbox2 = ref(true);

const updateCheckedKeys2=()=>{
  checkedKeys2.value=[4]
}

const updateView2=()=>{
  data3.value[0].title='更新视图'
}

const data2 = ref([{
	title: '一级1',
	id: 1,
	checked: true,
	spread: true,
	children: [{
		title: '二级1-1 可允许跳转',
		id: 3,
		href: 'https://www.layui.com/',
		children: [{
			title: '三级1-1-3',
			id: 23,
			children: [{
				title: '四级1-1-3-1',
				id: 24,
				children: [{
					title: '五级1-1-3-1-1',
					id: 30,
					field: ''
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
			children: [{
				title: '四级1-1-1-1 可允许跳转',
				id: 15,
				href: 'https://www.layui.com/doc/'
			}]
		},
		{
			title: '三级1-1-2',
			id: 8,
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
			disabled: true
		},
		{
			title: '三级1-2-2',
			id: 10,
		}]
	},
	{
		title: '二级1-3',
		id: 20,
		children: [{
			title: '三级1-3-1',
			id: 21,
		},
		{
			title: '三级1-3-2',
			id: 22,
		}]
	}]
},
{
	title: '一级2',
	id: 2,
	spread: true,
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
			disabled: true
		}]
	}]
},
{
	title: '一级3',
	id: 16,
	children: [{
		title: '二级3-1',
		id: 17,
		fixed: true,
		children: [{
			title: '三级3-1-1',
			id: 18,
		},
		{
			title: '三级3-1-2',
			id: 19,
		}]
	},
	{
		title: '二级3-2',
		id: 27,
		children: [{
			title: '三级3-2-1',
			id: 28,
		},
		{
			title: '三级3-2-2',
			id: 29,
		}]
	}]
}]);
</script>

:::

::: title 禁用级联
:::

::: demo 通过 `checkStrictly` 属性禁用父子关联选择, 让每个复选框都是独立的。

<template>
  <lay-tree
	v-model:checkedKeys="checkedKeys3"
    :checkStrictly="true"
	:showCheckbox="true"
	:data="data3"
  >
  </lay-tree>
</template>

<script setup>
import { ref } from 'vue';

const data3 = ref([{
	title: '一级1',
	id: 1,
	checked: true,
	spread: true,
	children: [{
		title: '二级1-1 可允许跳转',
		id: 3,
		href: 'https://www.layui.com/',
		children: [{
			title: '三级1-1-3',
			id: 23,
			children: [{
				title: '四级1-1-3-1',
				id: 24,
				children: [{
					title: '五级1-1-3-1-1',
					id: 30,
					field: ''
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
			children: [{
				title: '四级1-1-1-1 可允许跳转',
				id: 15,
				href: 'https://www.layui.com/doc/'
			}]
		},
		{
			title: '三级1-1-2',
			id: 8,
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
			disabled: true
		},
		{
			title: '三级1-2-2',
			id: 10,
		}]
	},
	{
		title: '二级1-3',
		id: 20,
		children: [{
			title: '三级1-3-1',
			id: 21,
		},
		{
			title: '三级1-3-2',
			id: 22,
		}]
	}]
},
{
	title: '一级2',
	id: 2,
	spread: true,
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
			disabled: true
		}]
	}]
},
{
	title: '一级3',
	id: 16,
	children: [{
		title: '二级3-1',
		id: 17,
		fixed: true,
		children: [{
			title: '三级3-1-1',
			id: 18,
		},
		{
			title: '三级3-1-2',
			id: 19,
		}]
	},
	{
		title: '二级3-2',
		id: 27,
		children: [{
			title: '三级3-2-1',
			id: 28,
		},
		{
			title: '三级3-2-2',
			id: 29,
		}]
	}]
}]);

const checkedKeys3 = ref([2,3])
</script>

:::

::: title 关闭连线
:::

::: demo 使用 `showLine` 属性关闭节点连线

<template>
  <lay-tree
    :data="data"
	:showLine="showLine"
  >
  </lay-tree>
</template>

<script setup>
import { ref } from 'vue';

const showLine=ref(false)
</script>

:::

::: title 定义标题
:::

::: demo 使用 `title` 插槽自定义节点标题

<template>
  <lay-tree :data="data">	
	<template #title="{ data }">
		{{ data.id }}
	</template>
  </lay-tree>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::

::: title Tree 属性
:::

::: table

| Name                             | Description                              | Accepted Values | Version |
| -------------------------------- | ---------------------------------------- | --------------- |--------------- |
| data                             | 树型组件数据,类型 TreeData \| TreeData[] | null            | |
| showCheckbox                     | 是否显示复选框                           | false           | |
| onlyIconControl                  | 是否仅允许节点左侧图标控制展开收缩       | false           | |
| showLine                         | 是否开启连接线                           | true            | |
| checkedKeys(v-model:checkedKeys) | 开启 showCheckbox 后, 选中的节点         | []              | |
| expandKeys(v-model:expandKeys)   | 展开的节点 key 数组                      | []              | 1.8.7 |
| collapse-transition              | 是否开启展示收起动画                     | false           | |

:::

::: title Tree 数据
:::

::: table

| Name                | Description | Accepted Values | Version |
|---------------------|-------------| --------------- |--------------- |
| id                  | 唯一值          | -               | -|
| title               | 节点名称        | -               | -|
| children            | 子节点          | []              | -|
| disabled            | 该节点是否禁用   | false           | - |
| spread              | 是否展开        | false           | -|

:::

::: title Tree 事件
:::

::: table

| Name       | Description     | Accepted Params |
| ---------- | --------------- | --------------- |
| node-click | 节点 click 事件 | --              |

:::

::: contributor transition
:::

::: previousNext transition
:::
