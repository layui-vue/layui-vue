::: anchor
:::

::: title 基本介绍
:::

::: describe 用于代替原生的选择器，或者需要一个更优雅的多选器时。
:::

::: title 基础使用
:::

::: demo 使用 `lay-select` 标签, 创建下拉选择框。

<template>
  <lay-select v-model="value" placeholder="请选择">
    <lay-select-option :value="1" label="学习"></lay-select-option>
    <lay-select-option :value="2" label="编码"></lay-select-option>
    <lay-select-option :value="3" label="运动"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(null);
    return {
      value
    }
  }
}
</script>

:::

::: title 禁止选择
:::

::: demo 通过 `disabled` 属性, 禁用下拉选择。

<template>
  <lay-select v-model="value2" :disabled="true">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value2 = ref('1')

    return {
      value2
    }
  }
}
</script>

:::

::: title 开启检索
:::

::: demo 通过 show-search 属性开启内容检索, input 变为可输入状态。在 multiple 模式下, 检索框位于 dropdown 顶部, 同时你可以使用 search-method 属性自定义搜索逻辑。

<template>
  <lay-select v-model="value3" :show-search="true" :multiple="true">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value3 = ref(['1'])

    return {
      value3
    }
  }
}
</script>

:::

::: title 传入选项
:::

::: demo 传入 options 数据，如果设置则不需要手动构造 select-option 节点。

<template>
  <lay-select v-model="value4" :items="items4"></lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value4 = ref('1');

    const items4=ref([
      {label:'选项1', value:1},
      {label:'选项2', value:2},
      {label:'选项3', value:3, disabled:true},
    ])

    return {
      items4,
      value4,
    }
  }
}
</script>
:::


::: title 允许清空
:::

::: demo 通过 show-search 属性开启内容检索, input 变为可输入状态。在 multiple 模式下, 检索框位于 dropdown 顶部。

<template>
  <lay-select v-model="value5" disabled :allow-clear="true">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value5 = ref('1')

    return {
      value5
    }
  }
}
</script>

:::

::: title 开启多选
:::

::: demo 通过 `multiple` 属性, 开启多选模式。

<template>
  <lay-select v-model="value6" multiple allow-clear>
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码" disabled></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
    <lay-select-option value="4" label="唱歌"></lay-select-option>
    <lay-select-option value="5" label="跳舞"></lay-select-option>
    <lay-select-option value="6" label="打篮球"></lay-select-option>
    <lay-select-option value="7" label="rap"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const value6 = ref(['1','2']);

    return {
      value6
    }
  }
}
</script>
:::

::: title 使用插槽
:::

::: demo 通过 `default` 插槽, 实现选项的自定义渲染。

<template>
  <lay-select v-model="value">
    <lay-select-option :value="1" label="学习"></lay-select-option>
    <lay-select-option :value="2" label="编码"></lay-select-option>
    <lay-select-option :value="3" label="运动">运动</lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(null);
    return {
      value
    }
  }
}
</script>

:::

::: title Select 属性
:::

::: table

| 属性          |         描述          |             类型          |     可选值      |   默认值 |
| ------------ | --------------------- | ------------------------- | -------------- | -------- |
| v-model      | 选中值                | `string`/`number`/`Array`  |        -       |    -    |
| name         | 原生 name 属性        | `string`                   |        -       |    -    |
| placeholder  | 默认空提示语          | `string`                   |        -       | `请选择` |
| disabled     | 是否禁用              | `boolean`                  | `true` `false` | `false` |
| multiple     | 是否为多选            | `boolean`                  | `true` `false` | `false` |
| size         | 尺寸                  | `string`                  | `lg` `md` `sm` `xs`| `md` |
| showSearch        | 开启搜索     | `boolean` | -- | -- |
| searchMethod        | 自定义搜索逻辑 (text, optionProps)    | `Function` | -- | -- |
| searchPlaceholder | 搜索提示          | `string`                  | -- | -- |
| minCollapsedNum        | 多选模式最小折叠数量                  | `number`                  | -- | -- |
| collapseTagsTooltip    | 多选折叠后时候悬浮展示                  | `boolean`                  | -- | -- |
| contentStyle        | 内容自定义样式     | `StyleValue` | -- | -- |
| contentClass        | 内容自定义Class    | `string` `Array<string \| object>` `object` | -- | -- |

:::

::: title Select 事件
:::

::: table

| 属性    | 描述       |     接收值      |
| ------ | ---------- | --------------- |
| change | 切换事件    | value           |
| search | 关键词变化事件    | 用户输入的关键词 string           |

:::

::: title Select Option 属性
:::

::: table


::: table

| 属性          |         描述          |             类型          |     可选值      |   默认值 |
| ------------ | --------------------- | ------------------------- | -------------- | -------- |
| label        | 标签值(`必填`)         | `string`                  |        -       |    -    |
| value        | 值                    | `string` / `number`       |        -       |    -    |
| keyword      | 用于匹配关键词的数据，传入文本+拼音可以支持拼音搜索   | `string`        |        -       |    -    |
| disabled     | 是否禁用              | `boolean`                  | `true` `false` | `false` |

:::

::: title Select Option 插槽
:::

::: table

| 属性    |         描述       |     接收值      |
| ------- | ----------------- | --------------- |
| default | 默认(`label`)     |        -       |
| prepend | 自定义前缀         |        -       |
| append  | 自定义后缀         |        -       |

:::

::: contributor select
:::

::: previousNext select
:::