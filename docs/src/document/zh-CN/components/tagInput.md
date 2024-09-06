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

::: demo 使用 `max` 控制最大标签数量。如果当前标签的数量超过 `max` 则会触发 `exceed` 事件。

<template>
  <div>modelValue: {{ data2 }}</div>
  <br>
  <lay-tag-input v-model="data2" v-model:inputValue="inputValue2" :max="3" collapseTagsTooltip placeholder="最多输入3个" style="width:320px" @exceed="handleExceed"></lay-tag-input>
</template>

<script>
import { ref,watch } from 'vue';
import { layer } from "@layui/layui-vue";

export default {
  setup() {
    const data2 = ref(["1", "2", "3", "4"]);
    const inputValue2 = ref("");
    const handleExceed = (value, event) => {
      layer.msg(`最多输入3个`);
      console.log(event);
    }

    return {
      data2,
      inputValue2,
      handleExceed,
    }
  }
}
</script>

:::

::: title 根据条件创建标签
:::

::: demo 你可以使用 `checkInputValue` 方法来控制输入的标签是否合法，如果合法则创建标签，否则不创建。如果校验失败，你还可以通过 `checkInputValueFail` 事件捕获。

<template>
  <lay-tag-input 
    v-model="data10" 
    placeholder="请输入" 
    style="width:320px"
    :checkInputValue="checkInputValue"
    @checkInputValueFail="handleFailed"
    >
  </lay-tag-input>
</template>

<script>
import { ref,watch } from 'vue';
import { layer } from "@layui/layui-vue";

export default {
  setup() {
    const data10 = ref(['标签1','标签2']);
    const checkInputValue = (value) => {
      return value.search(/^标签/g) > -1;
    }
    const handleFailed = (value, event) => {
      layer.msg(`${value}不是合法值`);
      console.log(event);
    }
    return {
      data10,
      checkInputValue
    }
  }
}
</script>

:::

::: title 折叠标签
:::

::: demo 通过 `minCollapsedNum` 设置最小折叠数，超过这个数的标签会被折叠，0 表示不折叠， `collapseTagsTooltip`启用鼠标悬停显示具体折叠标签。

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

| 属性                  | 描述                 | 类型                              | 默认值                    | 可选值              | 版本     |
| --------------------- | -------------------- | --------------------------------- | ------------------------- | ------------------- | -------- |
| _modelValue_          | 绑定值               | `string[]` `number[]` `TagData[]` | -                         | -                   |          |
| _size_                | 输入框大小           | `string`                          | `md`                      | `lg` `md` `sm` `xs` |          |
| _inputValue_          | 输入框的值           | `string`                          | -                         | -                   |          |
| _placeholder_         | 占位符               | `string`                          | -                         | -                   |          |
| _readonly_            | 是否可只读           | `boolean`                         | `false`                   | `true` `false`      |          |
| _allowClear_          | 允许清空             | `boolean`                         | `false`                   | `true` `false`      |          |
| _disabled_            | 是否禁用             | `boolean`                         | `false`                   | `true` `false`      |          |
| _max_                 | 最大输入标签数量     | `number`                          | -                         | -                   |          |
| _minCollapsedNum_     | 最小折叠数量         | `number`                          | -                         | -                   |          |
| _collapseTagsTooltip_ | 是否悬浮显示折叠标签 | `boolean`                         | `false`                   | `true` `false`      |          |
| _tagProps_            | tag 属性             | `LayTagProps`                     | -                         | -                   |          |
| _disabledInput_       | 是否禁用内部输入框   | `boolean`                         | `false`                   | `true` `false`      |          |
| _checkInputValue_     | 输入框值校验函数     | `(value: string) => boolean`      | `(value: string) => true` | -                   | `2.19.0` |

:::

:::title TagInput 事件
:::

:::table

| 名称                  | 描述                                         | 参数                                      | 版本     |
| --------------------- | -------------------------------------------- | ----------------------------------------- | -------- |
| _change_              | 值改变时触发                                 | `(value: (string \| number \|TagData)[])` |          |
| _inputValueChange_    | 输入框值改变时触发                           | `(inputValue: string)`                    |          |
| _remove_              | 删除标签时触发                               | `(value: string \| number, e: Event)`     |          |
| _clear_               | 点击清除按钮时触发                           | `(e: Event)`                              |          |
| _focus_               | 获得焦点时触发                               | `(e: Event)`                              |          |
| _blur_                | 失去焦点时触发                               | `(e: Event)`                              |          |
| _pressEnter_          | 按下 Enter 键时触发                          | `(inputValue: string, e: Event)`          |          |
| _exceed_              | 按下 Enter 键但标签数量达到 `max` 限制时触发 | `(inputValue: string, e: Event)`          | `2.19.0` |
| _checkInputValueFail_ | 输入框值校验失败时触发                       | `(inputValue: string, e: Event)`          | `2.19.0` |

:::

:::title TagInput 方法
:::

:::table

| 名称    | 描述     | 参数 |
| ------- | -------- | ---- |
| _focus_ | 获取焦点 | -    |
| _blur_  | 失去焦点 | -    |

:::

:::title TagInput 插槽
:::

:::table

| 插槽      | 描述       | 参数 |
| --------- | ---------- | ---- |
| _prefix_  | 前置插槽   | -    |
| _suffix_  | 后置插槽   | -    |
| _prepend_ | 自定义前缀 | -    |
| _append_  | 自定义后缀 | -    |

:::

::: previousNext tagInput
:::
