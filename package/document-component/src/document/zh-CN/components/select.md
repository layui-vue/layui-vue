::: anchor
:::

::: title 基本介绍
:::

::: describe 用于代替原生的选择器，或者需要一个更优雅的多选器时。支持关键词查询
:::

::: title 基础使用
:::

::: demo 使用 `lay-select` 标签, 创建下拉选择框

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

::: title 进阶使用
:::

::: demo 根据 v-model 的特性, 通过修改值更改 select 的下拉选项。

<template>
  <lay-space>
    <lay-select v-model="value2" placeholder="请选择">
      <lay-select-option :value="1" label="学习"></lay-select-option>
      <lay-select-option :value="2" label="编码"></lay-select-option>
      <lay-select-option :value="3" label="运动"></lay-select-option>
    </lay-select>
    <lay-button @click="change2"> change ：{{value2}} </lay-button>
  </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value2 = ref(null);
    var i = 1;
    function change2(){
      value2.value=i++%3+1
    }
    return {
      value2,
      change2
    }
  }
}
</script>

:::


::: title 禁止选择
:::

::: demo 通过 show-search 属性开启内容检索, input 变为可输入状态。在 multiple 模式下, 检索框位于 dropdown 顶部。

<template>
  <lay-space>
    <lay-select v-model="value3" :disabled="true" :allow-clear="true">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
    <lay-select v-model="value4" :disabled="true" :multiple="true" :allow-clear="true">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
  </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value3 = ref('1')
    const value4 = ref(['1'])
    return {
      value3,
      value4
    }
  }
}
</script>

:::

::: title 开启检索
:::

::: demo 通过 show-search 属性开启内容检索, input 变为可输入状态。在 multiple 模式下, 检索框位于 dropdown 顶部。

<template>
  <lay-space>
    <lay-select v-model="value3" :show-search="true">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
    <lay-select v-model="value4" :show-search="true" :multiple="true">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
  </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value3 = ref('1')
    const value4 = ref(['1'])
 
    return {
      value3,
      value4,
    }
  }
}
</script>

:::

::: title 传入选项
:::

::: demo 传入 options 数据，如果设置则不需要手动构造 selectOption 节点

<template>
  <lay-select v-model="value5" :items="items5"></lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const value5 = ref('1');
    const items5=ref([
      {label:'选项1', value:1},
      {label:'选项2', value:2},
      {label:'选项3', value:3, disabled:true},
    ])
    return {
      items5,
      value5,
    }
  }
}
</script>
:::


::: title 允许清空
:::

::: demo 通过 show-search 属性开启内容检索, input 变为可输入状态。在 multiple 模式下, 检索框位于 dropdown 顶部。

<template>
  <lay-space>
    <lay-select v-model="value3" :allow-clear="true">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
    <lay-select v-model="value4" :allow-clear="true" :multiple="true">
    <lay-select-option value="1" label="学习"></lay-select-option>
    <lay-select-option value="2" label="编码"></lay-select-option>
    <lay-select-option value="3" label="运动"></lay-select-option>
  </lay-select>
  </lay-space>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const value3 = ref('1')
    const value4 = ref(['1'])
    return {
      value3,
      value4
    }
  }
}
</script>

:::

::: title 海量数据 
:::

::: demo
<template>
  <lay-select v-model="selected2" :multiple="true">
    <lay-select-option v-for="index of count2" :value="index" :label="index"></lay-select-option>
  </lay-select>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const count2 = ref(0)
    const selected2 = ref([1])

    setTimeout(() => {
      count2.value = 100;
    }, 2000);

    return {
      count2,
      selected2
    }
  }
}
</script>
:::

::: title 多选使用
:::

::: demo
<template>
  <lay-button @click="mvalue=['1','5','7']">点击切换(当前值:{{mvalue.join()}})</lay-button>
  <br/>
  <br/>
  <lay-select v-model="mvalue" @change="change" multiple>
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
    const mvalue = ref(['1','2']);
    const change = function(val){
      console.log(val, mvalue.value)
    }
    return {
      mvalue,
      change
    }
  }
}
</script>
:::

::: title 定制选项
:::

::: demo 使用 `lay-select` 标签, 创建下拉选择框

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
| default | 默认(`label`)      |        -       |

:::

::: contributor select
:::

::: previousNext select
:::