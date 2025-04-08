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
		:tail-node-icon="false"
		:onlyIconControl="true"
		:default-expand-all="true"
		v-model:selectedKey="selectedKey"
    @node-click="handleClick"
  >
  </lay-tree>
</template>

<script setup>
import { ref } from 'vue';

const selectedKey = ref(1);

const data = ref([{
	title: '一级1',
	id: 1,
	checked: true,
	children: [{
		title: '二级1-1',
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
				title: '四级1-1-1-1',
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
			disabled: true,
			children: [{
				title: '三级1-2-1-1',
				id: 91,
				disabled: true
			}]
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

::: title 启用多选
:::

::: demo 使用 `showCheckbox` 属性开启复选框, `checkedKeys` 属性设置选中项。

<template>
  <lay-tree
    :data="data2"
		:showCheckbox="showCheckbox2"
		v-model:checkedKeys="checkedKeys2"
  >
  </lay-tree>
</template>

<script setup>
import { ref } from 'vue';

const checkedKeys2 = ref([]);
const showCheckbox2 = ref(true);

const data2 = ref([{
	title: '一级1',
	id: 1,
	checked: true,
	spread: true,
	children: [{
		title: '二级1-1',
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
				title: '四级1-1-1-1',
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
		title: '二级1-1',
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
				title: '四级1-1-1-1',
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
		v-model:selectedKey="selectedKey"
	:showLine="showLine"
  >
  </lay-tree>
</template>

<script setup>
import { ref } from 'vue';

const showLine=ref(false)
</script>

:::

::: title 使用插槽
:::

::: demo 使用插槽自定义节点标题

<template>
  <lay-tree :data="data">
	<template #title="{ data }">
		{{ data.title }}
	</template>
  </lay-tree>
</template>

<script setup>
import { ref } from 'vue';
</script>

:::

::: title 懒加载子节点
:::

::: demo 异步加载子节点

<template>
  <lay-row>
		<lay-col>
			<lay-tree :data="data10" lazy :load="handleLoad" default-expand-all> </lay-tree>
		</lay-col>
		<lay-col>
			<h5>loadOnCheck</h5>
			<lay-tree :data="data10" loadOnCheck showCheckbox lazy :load="handleLoad" default-expand-all> </lay-tree>
		</lay-col>
	</lay-row>
</template>

<script setup>
import { ref } from 'vue';

const data10 = ref([
  {
    title: "一级1",
    id: 1,
  },
	{
    title: "一级2",
    id: 2,
		children: [
			{
				title: "一级2-1",
				id: 21,
			}
		]
  },
]);

const handleLoad = (node, resolve) => {
  console.log(node);
  if (node.id === 1) {
    setTimeout(() => {
      resolve([
        {
          title: "一级1-1",
          id: 11,
        },
        {
          title: "一级1-2",
          id: 12,
        },
      ]);
    }, 2000);
  } else if (node.id === 11) {
    resolve([
      {
        title: "一级1-1-1",
        id: 111,
      },
      {
        title: "一级1-2-1",
        id: 121,
      },
    ]);
  } else {
    resolve([]);
  }
};
</script>

:::

::: title 自定义字段
:::

::: demo 使用 `replaceFields` 替换 `data` 中的字段名

<template>
  <lay-tree
    :data="data9"
		:showCheckbox="showCheckbox2"
		v-model:checkedKeys="checkedKeys2"
		:replaceFields="replaceFields"
  >
  </lay-tree>
</template>

<script setup>
import { ref } from 'vue';

const checkedKeys2 = ref([]);
const showCheckbox2 = ref(true);

const replaceFields = ref({
	id: 'key',
	title: 'name',
	children: 'child'
})

const data9 = ref([{
	name: '一级1',
	key: 1,
	spread: true,
	child: [
		{
			name: '一级1-1',
			key: 11,
			child: [
				{
					name: '一级1-1-1',
					key: 111,
				},
				{
					name: '一级1-1-2',
					key: 112,
				}
			]
		},
		{
			name: '一级1-2',
			key: 12,
			child: [
				{
					name: '一级1-2-1',
					key: 121,
				},
				{
					name: '一级1-2-2',
					key: 122,
				}
			]
		}
	]
},
{
	name: '一级2',
	key: 2,
	spread: true,
	child: [
		{
			name: '一级2-1',
			key: 21,
			spread: true,
		},
		{
			name: '一级2-2',
			key: 22,
			spread: true,
			child: [
				{
					name: '一级2-2-1',
					key: 221,
					spread: true,
				}
			]
		}
	]
}]);
</script>

:::

::: title 手风琴模式
:::

::: demo 使用 `accordion` 开启手风琴

<template>
  <lay-tree
    :data="data11"
		accordion
  >
  </lay-tree>
</template>

<script setup>
import { ref } from 'vue';

const data11 = ref([{
	title: '一级1',
	id: 1,
	checked: true,
	children: [{
		title: '二级1-1',
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
				title: '四级1-1-1-1',
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
			disabled: true,
			children: [{
				title: '三级1-2-1-1',
				id: 91,
				disabled: true
			}]
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
</script>

:::

::: title Tree 属性
:::

::: table

| Name                             | Description                                              | Accepted Values                                                                        | Version |
| -------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------- |
| data                             | 树型组件数据,类型 OriginalTreeData \| OriginalTreeData[]                 | null                                                                                   |         |
| showCheckbox                     | 是否显示复选框                                           | false                                                                                  |         |
| check-strictly                   | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 | false                                                                                  |         |
| onlyIconControl                  | 是否仅允许节点左侧图标控制展开收缩                       | false                                                                                  |         |
| showLine                         | 是否开启连接线                                           | true                                                                                   |         |
| checkedKeys(v-model:checkedKeys) | 开启 showCheckbox 后, 选中的节点                         | []                                                                                     |         |
| expandKeys(v-model:expandKeys)   | 展开的节点 key 数组                                      | []                                                                                     | 1.8.7   |
| collapse-transition              | 是否开启展示收起动画                                     | true                                                                                  |         |
| selectedKey(v-model:selectedKey)   | 选中节点                                                 | --                                                                                     |         |
| tail-node-icon                   | 尾节点图标，通过设置 false 关闭尾节点图标                | 图标集                                                                                 |         |
| replace-fields                   | 替换 data 中`id` `title` `children` `disabled` `checked` `spread` `leaf` 字段名               | `{id: "id", title: "title", children: "children", disabled: "disabled", checked: "checked", expanded: "spread", leaf: "leaf"}`                                       |         |
| default-expand-all               | 是否默认展开所有节点，开启 `lazy` 懒加载此参数将失效     | false                                                                                  |         |
| lazy                             | 是否懒加载子节点，需与 `load` 方法结合使用               | false                                                                                  | 2.16.2  |
| load                             | 加载子树数据的方法，仅当 `lazy` 属性为 true 时生效       | function(node, resolve)，node 为当前点击的节点，resolve 为数据加载完成的回调(必须调用) | 2.16.2  |
| searchNodeMethod                 | 过滤树节点，配合Exposes事件中的`filter` 使用             | `(node, value) => boolean`，node 节点，value 内容                                      | 2.17.7  |
| shouldIconBorder                 | 图标是否带边框        | `(iconName: string) => boolean`   | `2.22.0`  |
| cacheData                 			 | 预渲染懒加载数据 `Array<OriginalTreeData>`      |    | `2.22.0`  |
| loadOnCheck                 		 | 是否在勾选 `checkbox` 时加载子节点     				 |    | `2.22.0`  |
| accordion                 		 	 | 是否开启手风琴模式    													 |    | `2.22.0`  |


:::

::: title Tree 数据
:::

::: table

| Name     | Description    | Accepted Values | Type | Version |
| -------- | -------------- | --------------- |----------- | ------- |
| id       | 唯一值         | -               | -       |-       |
| title    | 节点名称       | -               | -       |-       |
| children | 子节点         | []              | -       |-       |
| disabled | 该节点是否禁用 | false           | -       |-       |
| checked   | 是否选中，节点数据会自动同步至 `checkedKeys`  | false           |-       |`2.22.0`     |
| spread   | 是否展开       | false           | -       |-       |
| leaf   	 | 控制是否在`叶子`节点       | false           |-       |`2.22.0`      |
| slot   	 | 节点展开时，自定义渲染内容    |     |  `string` \| `((data: OriginalTreeData) => VNode)`      |`2.22.0`      |


:::

::: title Callbacks 回调
:::

::: table

| Name         | Description                              | Accepted Params | Version  |
| ------------ | ---------------------------------------- | --------------- | -------- |
| node-click   | 节点 click 事件                          | node   |          |
| check-change | `showCheckbox`为true时，点击checkbox触发 | node, checked   | `2.17.7` |
| node-double | 节点双击事件 | event, node,   | `2.22.0` |
| node-contextmenu | 节点右键点击事件 | event, node   | `2.22.0` |

:::

::: title Exposes 事件
:::

::: table

| Name   | Description                              | Accepted Params | Version  |
| ------ | ---------------------------------------- | --------------- | -------- |
| filter | 过滤树节点，配合`props.searchNodeMethod` | 过滤内容        | `2.17.7` |
| getTree | 获得组件内部树形数据，包括懒加载数据 |   --      | `2.22.0` |
| getFlatTree | 获得组件内部树形数据(一维数组)，包括懒加载数据 | --       | `2.22.0` |
| getNode | 获得组件内部属性数据某节点 | `id`        | `2.22.0` |

:::

::: title Types

```ts
type NumberOrString = number | string;

interface OriginalTreeData {
  id?: NumberOrString;
  title?: NumberOrString;
  children?: OriginalTreeData[];
  disabled?: boolean;
  checked?: boolean;
  spread?: boolean;
  leaf?: boolean;
  [key: string]: any;
}

```

::: previousNext transition
:::
