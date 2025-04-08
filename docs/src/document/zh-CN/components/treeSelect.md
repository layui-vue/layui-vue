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

<script setup>import {ref} from "vue";

const value1 = ref(1);

const data1 = ref([]);

data1.value = [{
	title: "一级1",
	id: 1,
	field: "name1",
	children: [{
		title: "二级1-1 可允许跳转",
		id: 3,
		field: "name11",
		href: "https://www.layui.com/",
		children: [{
			title: "三级1-1-3",
			id: 23,
			field: "",
			children: [{
				title: "四级1-1-3-1",
				id: 24,
				field: "",
				children: [{
					title: "五级1-1-3-1-1",
					id: 30,
				},
				{
					title: "五级1-1-3-1-2",
					id: 31,
				}]
			}]
		},
		{
			title: "三级1-1-1",
			id: 7,
			field: "",
			children: [{
				title: "四级1-1-1-1 可允许跳转",
				id: 15,
				href: "https://www.layui.com/doc/"
			}]
		},
		{
			title: "三级1-1-2",
			id: 8,
			field: "",
			children: [{
				title: "四级1-1-2-1",
				id: 32,
			}]
		}]
	},
	{
		title: "二级1-2",
		id: 4,
		spread: true,
		children: [{
			title: "三级1-2-1",
			id: 9,
		},
		{
			title: "三级1-2-2",
			id: 10,
		}]
	},
	{
		title: "二级1-3",
		id: 20,
		field: "",
		children: [{
			title: "三级1-3-1",
			id: 21,
			field: ""
		},
		{
			title: "三级1-3-2",
			id: 22,
			field: ""
		}]
	}]
},
{
	title: "一级2",
	id: 2,
	children: [{
		title: "二级2-1",
		id: 5,
		spread: true,
		children: [{
			title: "三级2-1-1",
			id: 11,
		},
		{
			title: "三级2-1-2",
			id: 12,
		}]
	},
	{
		title: "二级2-2",
		id: 6,
		children: [{
			title: "三级2-2-1",
			id: 13,
		},
		{
			title: "三级2-2-2",
			id: 14,
		}]
	}]
},
{
	title: "一级3",
	id: 16,
	field: "",
	children: [{
		title: "二级3-1",
		id: 17,
		field: "",
		fixed: true,
		children: [{
			title: "三级3-1-1",
			id: 18,
			field: ""
		},
		{
			title: "三级3-1-2",
			id: 19,
			field: ""
		}]
	},
	{
		title: "二级3-2",
		id: 27,
		field: "",
		children: [{
			title: "三级3-2-1",
			id: 28,
			field: ""
		},
		{
			title: "三级3-2-2",
			id: 29,
			field: ""
		}]
	}]
}];

function handleClick(node) {
  console.log(node);
}
</script>

:::

::: title 开启多选
:::

::: demo 通过 `multiple` 标签, 开启下拉树多选。

<template>
  <lay-tree-select v-model="value2" :data="data2" multiple></lay-tree-select>
</template>

<script setup>
import { ref } from "vue";

const value2 = ref([23,5555]);

const data2 = ref([{
	title: "一级1",
	id: 1,
	field: "name1",
	checked: true,
	spread: true,
	children: [{
		title: "二级1-1 可允许跳转",
		id: 3,
		field: "name11",
		href: "https://www.layui.com/",
		children: [{
			title: "三级1-1-3",
			id: 23,
			field: "",
			children: [{
				title: "四级1-1-3-1",
				id: 24,
				field: "",
				children: [{
					title: "五级1-1-3-1-1",
					id: 30,
					field: ""
				},
				{
					title: "五级1-1-3-1-2",
					id: 31,
					field: ""
				}]
			}]
		},
		{
			title: "三级1-1-1",
			id: 7,
			field: "",
			children: [{
				title: "四级1-1-1-1 可允许跳转",
				id: 15,
				field: "",
				href: "https://www.layui.com/doc/"
			}]
		},
		{
			title: "三级1-1-2",
			id: 8,
			field: "",
			children: [{
				title: "四级1-1-2-1",
				id: 32,
				field: ""
			}]
		}]
	},
	{
		title: "二级1-2",
		id: 4,
		spread: true,
		children: [{
			title: "三级1-2-1",
			id: 9,
			field: "",
			disabled: true
		},
		{
			title: "三级1-2-2",
			id: 10,
			field: ""
		}]
	},
	{
		title: "二级1-3",
		id: 20,
		field: "",
		children: [{
			title: "三级1-3-1",
			id: 21,
			field: ""
		},
		{
			title: "三级1-3-2",
			id: 22,
			field: ""
		}]
	}]
},
{
	title: "一级2",
	id: 2,
	field: "",
	spread: true,
	children: [{
		title: "二级2-1",
		id: 5,
		field: "",
		spread: true,
		children: [{
			title: "三级2-1-1",
			id: 11,
			field: ""
		},
		{
			title: "三级2-1-2",
			id: 12,
			field: ""
		}]
	},
	{
		title: "二级2-2",
		id: 6,
		field: "",
		children: [{
			title: "三级2-2-1",
			id: 13,
			field: ""
		},
		{
			title: "三级2-2-2",
			id: 14,
			field: "",
			disabled: true
		}]
	}]
},
{
	title: "一级3",
	id: 16,
	field: "",
	children: [{
		title: "二级3-1",
		id: 17,
		field: "",
		fixed: true,
		children: [{
			title: "三级3-1-1",
			id: 18,
			field: ""
		},
		{
			title: "三级3-1-2",
			id: 19,
			field: ""
		}]
	},
	{
		title: "二级3-2",
		id: 27,
		field: "",
		children: [{
			title: "三级3-2-1",
			id: 28,
			field: ""
		},
		{
			title: "三级3-2-2",
			id: 29,
			field: ""
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
import { ref } from "vue";

const value3 = ref([]);

const data3 = ref([{
	title: "一级1",
	id: 1,
	field: "name1",
	checked: true,
	spread: true,
	children: [{
		title: "二级1-1 可允许跳转",
		id: 3,
		field: "name11",
		href: "https://www.layui.com/",
		children: [{
			title: "三级1-1-3",
			id: 23,
			field: "",
			children: [{
				title: "四级1-1-3-1",
				id: 24,
				field: "",
				children: [{
					title: "五级1-1-3-1-1",
					id: 30,
					field: ""
				},
				{
					title: "五级1-1-3-1-2",
					id: 31,
					field: ""
				}]
			}]
		},
		{
			title: "三级1-1-1",
			id: 7,
			field: "",
			children: [{
				title: "四级1-1-1-1 可允许跳转",
				id: 15,
				field: "",
				href: "https://www.layui.com/doc/"
			}]
		},
		{
			title: "三级1-1-2",
			id: 8,
			field: "",
			children: [{
				title: "四级1-1-2-1",
				id: 32,
				field: ""
			}]
		}]
	},
	{
		title: "二级1-2",
		id: 4,
		spread: true,
		children: [{
			title: "三级1-2-1",
			id: 9,
			field: "",
			disabled: true
		},
		{
			title: "三级1-2-2",
			id: 10,
			field: ""
		}]
	},
	{
		title: "二级1-3",
		id: 20,
		field: "",
		children: [{
			title: "三级1-3-1",
			id: 21,
			field: ""
		},
		{
			title: "三级1-3-2",
			id: 22,
			field: ""
		}]
	}]
},
{
	title: "一级2",
	id: 2,
	field: "",
	spread: true,
	children: [{
		title: "二级2-1",
		id: 5,
		field: "",
		spread: true,
		children: [{
			title: "三级2-1-1",
			id: 11,
			field: ""
		},
		{
			title: "三级2-1-2",
			id: 12,
			field: ""
		}]
	},
	{
		title: "二级2-2",
		id: 6,
		field: "",
		children: [{
			title: "三级2-2-1",
			id: 13,
			field: ""
		},
		{
			title: "三级2-2-2",
			id: 14,
			field: "",
			disabled: true
		}]
	}]
},
{
	title: "一级3",
	id: 16,
	field: "",
	children: [{
		title: "二级3-1",
		id: 17,
		field: "",
		fixed: true,
		children: [{
			title: "三级3-1-1",
			id: 18,
			field: ""
		},
		{
			title: "三级3-1-2",
			id: 19,
			field: ""
		}]
	},
	{
		title: "二级3-2",
		id: 27,
		field: "",
		children: [{
			title: "三级3-2-1",
			id: 28,
			field: ""
		},
		{
			title: "三级3-2-2",
			id: 29,
			field: ""
		}]
	}]
}]);
</script>

:::

::: title 允许清空
:::

::: demo 通过 `allow-clear` 属性开启清空操作。

<template>
  <lay-tree-select v-model="value4" :data="data4" placeholder="请选择" :allow-clear="true" default-expand-all></lay-tree-select>
</template>

<script setup>
import { ref } from "vue";

const value4 = ref([]);

const data4 = ref([{
	title: "一级1",
	id: 1,
	field: "name1",
	children: [{
		title: "二级1-1 可允许跳转",
		id: 3,
		field: "name11",
		href: "https://www.layui.com/",
		children: [{
			title: "三级1-1-3",
			id: 23,
			field: "",
			children: [{
				title: "四级1-1-3-1",
				id: 24,
				field: "",
				children: [{
					title: "五级1-1-3-1-1",
					id: 30,
				},
				{
					title: "五级1-1-3-1-2",
					id: 31,
				}]
			}]
		},
		{
			title: "三级1-1-1",
			id: 7,
			field: "",
			children: [{
				title: "四级1-1-1-1 可允许跳转",
				id: 15,
				href: "https://www.layui.com/doc/"
			}]
		},
		{
			title: "三级1-1-2",
			id: 8,
			field: "",
			children: [{
				title: "四级1-1-2-1",
				id: 32,
			}]
		}]
	},
	{
		title: "二级1-2",
		id: 4,
		spread: true,
		children: [{
			title: "三级1-2-1",
			id: 9,
		},
		{
			title: "三级1-2-2",
			id: 10,
		}]
	},
	{
		title: "二级1-3",
		id: 20,
		field: "",
		children: [{
			title: "三级1-3-1",
			id: 21,
			field: ""
		},
		{
			title: "三级1-3-2",
			id: 22,
			field: ""
		}]
	}]
},
{
	title: "一级2",
	id: 2,
	children: [{
		title: "二级2-1",
		id: 5,
		spread: true,
		children: [{
			title: "三级2-1-1",
			id: 11,
		},
		{
			title: "三级2-1-2",
			id: 12,
		}]
	},
	{
		title: "二级2-2",
		id: 6,
		children: [{
			title: "三级2-2-1",
			id: 13,
		},
		{
			title: "三级2-2-2",
			id: 14,
		}]
	}]
},
{
	title: "一级3",
	id: 16,
	field: "",
	children: [{
		title: "二级3-1",
		id: 17,
		field: "",
		fixed: true,
		children: [{
			title: "三级3-1-1",
			id: 18,
			field: ""
		},
		{
			title: "三级3-1-2",
			id: 19,
			field: ""
		}]
	},
	{
		title: "二级3-2",
		id: 27,
		field: "",
		children: [{
			title: "三级3-2-1",
			id: 28,
			field: ""
		},
		{
			title: "三级3-2-2",
			id: 29,
			field: ""
		}]
	}]
}]);
</script>

:::

::: title 启用搜索
:::

::: demo 通过 `search` 属性开启搜索，`searchNodeMethod` 设置对树过滤方法

<template>
  <lay-space>
  	<lay-tree-select v-model="value9" :data="data8" placeholder="请选择" :allow-clear="true" :search="true" multiple></lay-tree-select>
	</lay-space>
	<lay-space>
		<lay-tree-select v-model="value8" :data="data8" placeholder="请选择 searchNodeMethod" :allow-clear="true" :search="true" :searchNodeMethod="searchNodeMethod"></lay-tree-select>
	</lay-space>
</template>

<script setup>
import { ref } from "vue";

const value8 = ref();
const value9 = ref([]);

const searchNodeMethod = (node, value) => {
	console.log(node, value, 'node, value')
	return node.title.includes(value)
}

const data8 = ref([{
	title: "一级1",
	id: 1,
	field: "name1",
	children: [{
		title: "二级1-1 可允许跳转",
		id: 3,
		field: "name11",
		href: "https://www.layui.com/",
		children: [{
			title: "三级1-1-3",
			id: 23,
			field: "",
			children: [{
				title: "四级1-1-3-1",
				id: 24,
				field: "",
				children: [{
					title: "五级1-1-3-1-1",
					id: 30,
				},
				{
					title: "五级1-1-3-1-2",
					id: 31,
				}]
			}]
		},
		{
			title: "三级1-1-1",
			id: 7,
			field: "",
			children: [{
				title: "四级1-1-1-1 可允许跳转",
				id: 15,
				href: "https://www.layui.com/doc/"
			}]
		},
		{
			title: "三级1-1-2",
			id: 8,
			field: "",
			children: [{
				title: "四级1-1-2-1",
				id: 32,
			}]
		}]
	},
	{
		title: "二级1-2",
		id: 4,
		spread: true,
		children: [{
			title: "三级1-2-1",
			id: 9,
		},
		{
			title: "三级1-2-2",
			id: 10,
		}]
	},
	{
		title: "二级1-3",
		id: 20,
		field: "",
		children: [{
			title: "三级1-3-1",
			id: 21,
			field: ""
		},
		{
			title: "三级1-3-2",
			id: 22,
			field: ""
		}]
	}]
},
{
	title: "一级2",
	id: 2,
	children: [{
		title: "二级2-1",
		id: 5,
		spread: true,
		children: [{
			title: "三级2-1-1",
			id: 11,
		},
		{
			title: "三级2-1-2",
			id: 12,
		}]
	},
	{
		title: "二级2-2",
		id: 6,
		children: [{
			title: "三级2-2-1",
			id: 13,
		},
		{
			title: "三级2-2-2",
			id: 14,
		}]
	}]
},
{
	title: "一级3",
	id: 16,
	field: "",
	children: [{
		title: "二级3-1",
		id: 17,
		field: "",
		fixed: true,
		children: [{
			title: "三级3-1-1",
			id: 18,
			field: ""
		},
		{
			title: "三级3-1-2",
			id: 19,
			field: ""
		}]
	},
	{
		title: "二级3-2",
		id: 27,
		field: "",
		children: [{
			title: "三级3-2-1",
			id: 28,
			field: ""
		},
		{
			title: "三级3-2-2",
			id: 29,
			field: ""
		}]
	}]
}]);
</script>

:::

::: title 回调事件
:::

::: demo 通过 `change` 属性开启清空操作。

<template>
  <lay-tree-select v-model="value5" :data="data5" placeholder="请选择" @change="change" :multiple="true"></lay-tree-select>
</template>

<script setup>
import { ref } from "vue";

const value5 = ref([]);

const change = (value) => {
	console.log(value);
};

const data5 = ref([{
	title: "一级1",
	id: 1,
	field: "name1",
	children: [{
		title: "二级1-1 可允许跳转",
		id: 3,
		field: "name11",
		href: "https://www.layui.com/",
		children: [{
			title: "三级1-1-3",
			id: 23,
			field: "",
			children: [{
				title: "四级1-1-3-1",
				id: 24,
				field: "",
				children: [{
					title: "五级1-1-3-1-1",
					id: 30,
				},
				{
					title: "五级1-1-3-1-2",
					id: 31,
				}]
			}]
		},
		{
			title: "三级1-1-1",
			id: 7,
			field: "",
			children: [{
				title: "四级1-1-1-1 可允许跳转",
				id: 15,
				href: "https://www.layui.com/doc/"
			}]
		},
		{
			title: "三级1-1-2",
			id: 8,
			field: "",
			children: [{
				title: "四级1-1-2-1",
				id: 32,
			}]
		}]
	},
	{
		title: "二级1-2",
		id: 4,
		spread: true,
		children: [{
			title: "三级1-2-1",
			id: 9,
		},
		{
			title: "三级1-2-2",
			id: 10,
		}]
	},
	{
		title: "二级1-3",
		id: 20,
		field: "",
		children: [{
			title: "三级1-3-1",
			id: 21,
			field: ""
		},
		{
			title: "三级1-3-2",
			id: 22,
			field: ""
		}]
	}]
},
{
	title: "一级2",
	id: 2,
	children: [{
		title: "二级2-1",
		id: 5,
		spread: true,
		children: [{
			title: "三级2-1-1",
			id: 11,
		},
		{
			title: "三级2-1-2",
			id: 12,
		}]
	},
	{
		title: "二级2-2",
		id: 6,
		children: [{
			title: "三级2-2-1",
			id: 13,
		},
		{
			title: "三级2-2-2",
			id: 14,
		}]
	}]
},
{
	title: "一级3",
	id: 16,
	field: "",
	children: [{
		title: "二级3-1",
		id: 17,
		field: "",
		fixed: true,
		children: [{
			title: "三级3-1-1",
			id: 18,
			field: ""
		},
		{
			title: "三级3-1-2",
			id: 19,
			field: ""
		}]
	},
	{
		title: "二级3-2",
		id: 27,
		field: "",
		children: [{
			title: "三级3-2-1",
			id: 28,
			field: ""
		},
		{
			title: "三级3-2-2",
			id: 29,
			field: ""
		}]
	}]
}]);
</script>

:::

::: title 懒加载子节点
:::

::: demo 异步加载子节点

<template>
  <lay-tree-select
    v-model="value1"
    :data="data10"
    lazy
    :load="handleLoad"
  ></lay-tree-select>
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

const value1 = ref(1)

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

::: title cacheData
:::

::: demo 支持在 `输入框` 中渲染未加载的数据

<template>
  <lay-tree-select
    v-model="value11"
		multiple
    :data="data11"
		:cacheData="cacheData1"
    lazy
    :load="handleLoad"
  ></lay-tree-select>
</template>

<script setup>
import { ref } from 'vue';

const value11 = ref([1, 11])

const data11 = ref([
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

const cacheData1 = [
	{
    title: "一级1-1",
    id: 11,
  },
]


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

::: title Title 插槽
:::

::: demo 通过 `change` 属性开启清空操作。

<template>
  <lay-tree-select v-model="value6" :data="data6" placeholder="请选择" @change="change" :multiple="true">
    <template #title="{data}">
        <div>
            <lay-icon type="layui-icon-addition"/>
            {{ data.title }}
        </div>
    </template>
  </lay-tree-select>
</template>

<script setup>
import { ref } from "vue";

const value6 = ref([]);

const change = (value) => {
	console.log(value);
};

const data6 = ref([{
	title: "一级1",
	id: 1,
	field: "name1",
	children: [{
		title: "二级1-1 可允许跳转",
		id: 3,
		field: "name11",
		href: "https://www.layui.com/",
		children: [{
			title: "三级1-1-3",
			id: 23,
			field: "",
			children: [{
				title: "四级1-1-3-1",
				id: 24,
				field: "",
				children: [{
					title: "五级1-1-3-1-1",
					id: 30,
				},
				{
					title: "五级1-1-3-1-2",
					id: 31,
				}]
			}]
		},
		{
			title: "三级1-1-1",
			id: 7,
			field: "",
			children: [{
				title: "四级1-1-1-1 可允许跳转",
				id: 15,
				href: "https://www.layui.com/doc/"
			}]
		},
		{
			title: "三级1-1-2",
			id: 8,
			field: "",
			children: [{
				title: "四级1-1-2-1",
				id: 32,
			}]
		}]
	},
	{
		title: "二级1-2",
		id: 4,
		spread: true,
		children: [{
			title: "三级1-2-1",
			id: 9,
		},
		{
			title: "三级1-2-2",
			id: 10,
		}]
	},
	{
		title: "二级1-3",
		id: 20,
		field: "",
		children: [{
			title: "三级1-3-1",
			id: 21,
			field: ""
		},
		{
			title: "三级1-3-2",
			id: 22,
			field: ""
		}]
	}]
},
{
	title: "一级2",
	id: 2,
	children: [{
		title: "二级2-1",
		id: 5,
		spread: true,
		children: [{
			title: "三级2-1-1",
			id: 11,
		},
		{
			title: "三级2-1-2",
			id: 12,
		}]
	},
	{
		title: "二级2-2",
		id: 6,
		children: [{
			title: "三级2-2-1",
			id: 13,
		},
		{
			title: "三级2-2-2",
			id: 14,
		}]
	}]
},
{
	title: "一级3",
	id: 16,
	field: "",
	children: [{
		title: "二级3-1",
		id: 17,
		field: "",
		fixed: true,
		children: [{
			title: "三级3-1-1",
			id: 18,
			field: ""
		},
		{
			title: "三级3-1-2",
			id: 19,
			field: ""
		}]
	},
	{
		title: "二级3-2",
		id: 27,
		field: "",
		children: [{
			title: "三级3-2-1",
			id: 28,
			field: ""
		},
		{
			title: "三级3-2-2",
			id: 29,
			field: ""
		}]
	}]
}]);
</script>

:::

::: title tree 自定义字段
:::

::: demo tree 组件 使用 `replaceFields` 替换 `data` 中的字段名

<template>
  <lay-tree-select v-model="value1" :data="data7" :replaceFields="replaceFields"></lay-tree-select>
</template>

<script setup>
import {ref} from "vue";

const value1 = ref(1);
const replaceFields = ref({
	id: 'key',
	title: 'name',
	children: 'child'
})

const data7 = ref([{
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

::: title Tree Select 属性
:::

::: table

| 属性                  | 描述                                                             | 类型                                                                                     | 可选值                          | 默认值              | 版本                                                    |
| --------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------- | ------------------- | ------------------------------------------------------- |
| v-model               | 选中值                                                           | `string` `number` `array`                                                                | --                              | --                  |                                                         |
| data                  | 树数据                                                           | `Array<{}>`                                                                              | --                              | --                  |                                                         |
| size                  | 尺寸大小                                                         | `string`                                                                                 | `lg` `md` `sm` `xs`             | `md`                |                                                         |
| multiple              | 开启多选                                                         | `boolean`                                                                                | --                              | `false`             |                                                         |
| allow-clear           | 允许清空                                                         | `boolean`                                                                                | --                              | `false`             |                                                         |
| disabled              | 禁用选择                                                         | `boolean`                                                                                | --                              | `false`             |                                                         |
| placeholder           | 输入提示                                                         | `string`                                                                                 | --                              | --                  |                                                         |
| check-strictly        | 禁用级联复选                                                     | `boolean`                                                                                | --                              | `true`              |                                                         |
| collapse-tags-tooltip | 折叠提示                                                         | `boolean`                                                                                | --                              | `true`              |                                                         |
| min-collapsed-num     | 超过指定标签后开启折叠                                           | `number`                                                                                 | --                              | `3`                 |                                                         |
| search                | 是否开启搜索                                                     | `boolean`                                                                                | --                              | `false`             |                                                         |
| search-node-method    | 对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏 | `Fcuntion(node, value)`                                                                  | --                              | --                  |                                                         |
| lazy                  | 是否懒加载子节点，需与 `load` 方法结合使用                       | `boolean`                                                                                | --                              | `false`             |
| load                  | 加载子树数据的方法，仅当 `lazy` 属性为 `true` 时生效             | `function(node, resolve)`，node 为当前点击的节点，resolve 为数据加载完成的回调(必须调用) | --                              | --                  |
| replace-fields        | 替换 data 中`id` `title` `children` 字段名                       | --                                         | --                              | `{id: "id", title: "title", children: "children"}`                  |
| default-expand-all    | 是否展开所有 `tree` 节点                                         | `boolean`                                                                                | --                              | `false`             |
| cacheData    | 预渲染懒加载数据                  | `Array<OriginalTreeData>`           | --                              | --             | `2.22.0`            |
| teleport-props        | 继承至 dropdown 组件，下拉面板 `传递` 属性                       | `object`                                                                                 | `{to: 'body', disabled: false}` | `vue teleport` 组件 | `2.19.0` |

:::

::: title Tree Select 事件
:::

::: table

| 名称   | 描述           | 参数 |
| ------ | -------------- | ---- |
| change | 选中值变化事件 | --   |

:::

::: previousNext transition
:::
