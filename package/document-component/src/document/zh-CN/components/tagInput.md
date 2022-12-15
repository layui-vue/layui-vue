::: anchor
:::

::: title 基本介绍
:::

::: describe 通过鼠标或键盘，输入范围内的数值。
:::

::: title 基础使用
:::

::: demo 使用 `lay-tag-input` 标签, 创建标签输入框。  

<template>
  <lay-tag-input 
    v-model="data1" 
    v-model:inputValue="inputValue1" 
    allowClear
    placeholder="请输入" 
    style="width:320px"
    >
  </lay-tag-input>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const data1 = ref([{value:1,label:'Vue',closable: true}]);
    const inputValue1 = ref("");

    return {
      data1,
      inputValue1
    }
  }
}
</script>

:::

::: title 数量限制
:::

::: demo 使用 `max` 控制最大标签数量。  

<template>
  <lay-tag-input v-model="data2" v-model:inputValue="inputValue2" :max="3" placeholder="最多输入3个" style="width:320px"></lay-tag-input>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const data2 = ref([]);
    const inputValue2 = ref("");

    return {
      data2,
      inputValue2
    }
  }
}
</script>

:::

::: title 折叠标签
:::

::: demo 通过`minCollapsedNum` 设置最小折叠数，超过这个数的标签会被折叠，0表示不折叠， `collapseTagsTooltip`启用鼠标悬停显示具体折叠标签。  

<template>
<lay-space direction="vertical" size="md">
 minCollapsedNum = 3<lay-tag-input v-model="data3" v-model:inputValue="inputValue3" :minCollapsedNum="3" style="width:auto"></lay-tag-input>
 collapseTagsTooltip <lay-tag-input v-model="data3" v-model:inputValue="inputValue3" :minCollapsedNum="3" collapseTagsTooltip style="width:auto"></lay-tag-input>
</lay-space>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const data3 = ref(['标签1','标签2','标签3','标签4']);
    const inputValue3 = ref("");

    return {
      data3,
      inputValue3
    }
  }
}
</script>

:::

::: title 禁用状态
:::

::: demo  

<template>
  <lay-tag-input v-model="data4" v-model:inputValue="inputValue4" disabled style="width:320px"></lay-tag-input>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const data4 = ref(['标签1','标签2']);
    const inputValue4 = ref("");

    return {
      data4,
      inputValue4
    }
  }
}
</script>

:::

::: title 允许清空
:::

::: demo

<template>
  <lay-tag-input v-model="data5" v-model:inputValue="inputValue5" allow-clear style="width:320px"></lay-tag-input>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const data5 = ref(['标签1','标签2']);
    const inputValue5 = ref("");

    return {
      data5,
      inputValue5
    }
  }
}
</script>

:::

::: title 不同尺寸
:::

::: demo  

<template>
<div style="width:320px;display:flex;flex-direction: column;gap: 16px;">
  <lay-tag-input v-model="data6" v-model:inputValue="inputValue6" size="xs"></lay-tag-input>
  <lay-tag-input v-model="data6" v-model:inputValue="inputValue6" size="sm"></lay-tag-input>
  <lay-tag-input v-model="data6" v-model:inputValue="inputValue6" size="md"></lay-tag-input>
  <lay-tag-input v-model="data6" v-model:inputValue="inputValue6" size="lg"></lay-tag-input>
</div>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const data6 = ref(['标签1','标签2']);
    const inputValue6 = ref("");

    return {
      data6,
      inputValue6
    }
  }
}
</script>

:::

::: title 不同主题
:::

::: demo 使用 `tagProps` 控制标签属性。  

<template>
<lay-space direction="vertical" fill style="width:320px">
  <lay-tag-input v-model="data7" v-model:inputValue="inputValue7" :tagProps="{color:'#86909c',variant:'light', bordered:false}"></lay-tag-input>
  <lay-tag-input v-model="data7" v-model:inputValue="inputValue7" :tagProps="{color:'#ffb400',variant:'light'}"></lay-tag-input>
  <lay-tag-input v-model="data7" v-model:inputValue="inputValue7" :tagProps="{color:'#0fc6c2',variant:'light'}"></lay-tag-input>
  <lay-tag-input v-model="data7" v-model:inputValue="inputValue7" :tagProps="{color:'#409EFF',variant:'light'}"></lay-tag-input>
</lay-space>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const data7 = ref(['标签1','标签2']);
    const inputValue7 = ref("");

    return {
      data7,
      inputValue7
    }
  }
}
</script>

:::

::: title TagInput 属性
:::

::: table

| 属性        | 描述     | 类型    | 默认值    | 可选值                             |
| ----------- | -------- | ------ | ------ | ------ |
| modelValue  | 绑定值  | `string[]` `number[]` `TagData[]`| -| -|
| size | 输入框大小 |`string` | `md` | `lg` `md` `sm` `xs`|
| inputValue | 输入框的值 | `string` | -| - | 
| placeholder | 占位符 | `string` | - | - |
| readonly | 是否可只读 | `boolean` | `false` | `true` `false`|
| allowClear  | 允许清空  | `boolean` | `false` | `true` `false`|
| disabled | 是否禁用  | `boolean` | `false` | `true` `false`|
| max    | 最大输入标签数量  | `number` | -|-|
| minCollapsedNum | 最小折叠数量 | `number`| - | -|
| collapseTagsTooltip|是否悬浮显示折叠标签| `boolean` | `false` | `true` `false`|
| tagProps| tag 属性| `LayTagProps`|-|-|
| disabledInput|是否禁用内部输入框|`boolean` | `false` | `true` `false`|

:::

:::title TagInput 事件
:::

:::table

| 名称 | 描述 | 参数 |
|------ |----------|-----------|
| change | 值改变时触发 | (value: (string &#124; number &#124; TagData)[]) |
| inputValueChange |输入框值改变时触发  | (inputValue: string) |
| remove|删除标签时触发| (value: string &#124; number, e: Event) |
| clear | 点击清除按钮时触发| (e: Event) |
| focus | 获得焦点时触发| (e: Event) |
| blur | 失去焦点时触发| (e: Event) |
| pressEnter| 按下 Enter 键时触发|  (inputValue: string, e: Event) |

:::

:::title TagInput 方法
:::

:::table

| 名称 | 描述 | 参数 |
|------ |----------|-----------|
| focus | 获取焦点 | - |
| blur |失去焦点  | - |

:::

:::title TagInput 插槽
:::

:::table

| 插槽 | 描述 | 参数 |
|------ |----------|-----------|
| prefix | 前置插槽 | - |
| suffix | 后置插槽 | - |
| prepend | 自定义前缀 | - |
| append  |  自定义后缀 | - |

:::