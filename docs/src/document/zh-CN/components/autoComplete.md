::: anchor
:::

::: title 基本介绍
:::

::: describe 输入框自动完成功能。
:::

::: title 基础使用
:::

::: demo 使用 `lay-autocomplete` 标签, 创建自动完成组件。在输入时，将回调 fetchSuggestions 方法加载建议列表，参数 value 表示当前输入内容，返回值约定为 Promise，用于返回异步加载的结果。

<template>
  <lay-autocomplete v-model="value" :fetchSuggestions="fetchSuggestions" placeholder="输入内容，触发提示"></lay-autocomplete>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {

    const value = ref("");
    const fetchSuggestions = function(value) {
        return new Promise((resolve) => {
            resolve([
              {value: "稻香 - 周杰伦"},
              {value: "蒲公英的约定 - 周杰伦"},
              {value: "爱在西元前 - 周杰伦"},
              {value: "不能说的秘密 - 周杰伦"},
              {value: "七里香 - 周杰伦"},
              {value: "龙卷风 - 周杰伦"},
              {value: "稻香 - 周杰伦"},
              {value: "蒲公英的约定 - 周杰伦"},
              {value: "爱在西元前 - 周杰伦"},
              {value: "不能说的秘密 - 周杰伦"},
              {value: "七里香 - 周杰伦"},
              {value: "龙卷风 - 周杰伦"},
              {value: "稻香 - 周杰伦"},
              {value: "蒲公英的约定 - 周杰伦"},
              {value: "爱在西元前 - 周杰伦"},
              {value: "不能说的秘密 - 周杰伦"},
              {value: "七里香 - 周杰伦"},
              {value: "龙卷风 - 周杰伦"},
            ])
        });
    }

    return {
      value,
      fetchSuggestions
    }
  }
}
</script>

:::

::: title 控件禁用
:::

::: demo 通过 `disabled` 属性，设置 autocomplete 为禁用状态。

<template>
  <lay-autocomplete v-model="value1" :fetchSuggestions="fetchSuggestions1" :disabled="true" placeholder="请输入"></lay-autocomplete>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {

    const value1 = ref("");
    const fetchSuggestions1 = function(value) {
      if(value != "") {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {value: "稻香 - 周杰伦"},
              {value: "蒲公英的约定 - 周杰伦"},
              {value: "爱在西元前 - 周杰伦"},
              {value: "不能说的秘密 - 周杰伦"},
              {value: "七里香 - 周杰伦"},
              {value: "龙卷风 - 周杰伦"},
            ])
          }, 500)
        });
      }
    }

    return {
      value1,
      fetchSuggestions1
    }
  }
}
</script>

:::

::: title 启用清空
:::

::: demo 通过 `allow-clear` 属性，启用清空操作。

<template>
  <lay-autocomplete v-model="value2" :fetchSuggestions="fetchSuggestions2" :allow-clear="true" placeholder="请输入"></lay-autocomplete>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {

    const value2 = ref("");
    const fetchSuggestions2 = function(value) {
      if(value != "") {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {value: "稻香 - 周杰伦"},
              {value: "蒲公英的约定 - 周杰伦"},
              {value: "爱在西元前 - 周杰伦"},
              {value: "不能说的秘密 - 周杰伦"},
              {value: "七里香 - 周杰伦"},
              {value: "龙卷风 - 周杰伦"},
            ])
          }, 500)
        });
      }
    }

    return {
      value2,
      fetchSuggestions2
    }
  }
}
</script>

:::

::: title 使用插槽
:::

::: demo 使用 `default` 插槽，自定义建议列表，`option` 插槽参数为当前项。

<template>
  <lay-autocomplete v-model="value3" :fetchSuggestions="fetchSuggestions3" placeholder="请输入">
    <template #suffix>
      <lay-icon type="layui-icon-search"></lay-icon>
    </template>
    <template #default="{ option }">
      {{ option }}
    </template>
  </lay-autocomplete>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {

    const value3 = ref("");
    const fetchSuggestions3 = function(value) {
      if(value != "") {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {value: "稻香 - 周杰伦"},
              {value: "蒲公英的约定 - 周杰伦"},
              {value: "爱在西元前 - 周杰伦"},
              {value: "不能说的秘密 - 周杰伦"},
              {value: "七里香 - 周杰伦"},
              {value: "龙卷风 - 周杰伦"},
            ])
          }, 500)
        });
      }
    }

    return {
      value3,
      fetchSuggestions3
    }
  }
}
</script>

:::

::: title 事件处理
:::

::: demo 通过 `select` 事件，监听自动完成组件的手动选中与回车事件。

<template>
  <lay-autocomplete v-model="value4" :fetchSuggestions="fetchSuggestions4" placeholder="请输入" @select="select4"></lay-autocomplete>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {

    const value4 = ref("");
    const fetchSuggestions4 = function(value) {
      if(value != "") {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {value: "稻香 - 周杰伦"},
              {value: "蒲公英的约定 - 周杰伦"},
              {value: "爱在西元前 - 周杰伦"},
              {value: "不能说的秘密 - 周杰伦"},
              {value: "七里香 - 周杰伦"},
              {value: "龙卷风 - 周杰伦"},
            ])
          }, 500)
        });
      }
    };

    const select4 = function(option) {
      console.log("选中内容:" + JSON.stringify(option));
    }

    return {
      value4,
      fetchSuggestions4,
      select4
    }
  }
}
</script>

:::

::: title 设置尺寸
:::

::: demo 通过 `size` 属性，设置 autocomplete 组件尺寸`lg` `md` `sm` `xs`。

<template>
  <lay-autocomplete v-model="value5" :fetchSuggestions="fetchSuggestions5" placeholder="lg" size="lg"></lay-autocomplete>
  <lay-autocomplete v-model="value5" :fetchSuggestions="fetchSuggestions5" placeholder="md" size="md"></lay-autocomplete>
  <lay-autocomplete v-model="value5" :fetchSuggestions="fetchSuggestions5" placeholder="sm" size="sm"></lay-autocomplete>
  <lay-autocomplete v-model="value5" :fetchSuggestions="fetchSuggestions5" placeholder="xs" size="xs"></lay-autocomplete>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {

    const value5 = ref("");
    const fetchSuggestions5 = function(value) {
      if(value != "") {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {value: "稻香 - 周杰伦"},
              {value: "蒲公英的约定 - 周杰伦"},
              {value: "爱在西元前 - 周杰伦"},
              {value: "不能说的秘密 - 周杰伦"},
              {value: "七里香 - 周杰伦"},
              {value: "龙卷风 - 周杰伦"},
            ])
          }, 500)
        });
      }
    }

    return {
      value5,
      fetchSuggestions5
    }
  }
}
</script>

:::

::: title Autocomplete 属性
:::

::: table

| 属性                 | 描述                            | 类型                                        | 默认值  | 可选值              |版本        |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------- | ------------------- |--------- |
| name                 | 原始属性 name                                                                                                    | `string`                                    | --      | --                  |           |
| placeholder          | 提示信息                                                                                                         | `string`                                    | --      | --                  |           |
| disabled             | 禁用状态                                                                                                         | `boolean`                                   | `false` | `true` `false`      |           |
| v-model / modelValue | 值                                                                                                               | `string` `number`                           | --      | --                  |           |
| allow-clear          | 清空操作                                                                                                         | `boolean`                                   | `false` | `true` `false`      |           |
| fetchSuggestions     | 查询建议回调方法，用于加载建议列表 (value: string)，参数 value 为 input 输入内容，其返回值规定为 Promise 对象 。 | `Function`                                  | --      | --                  |           |
| contentStyle         | 继承至 dropdown 组件，用于设置下拉面板的 style 属性                                                              | `StyleValue`                                | --      | --                   |          |
| contentClass         | 继承至 dropdown 组件，用于设置下拉面板的 class 属性                                                              | `string` `Array<string \| object>` `object` | --      | --                  |           |
| autoFitWidth         | 继承至 dropdown 组件，用于设置下拉面板是否与输入框宽度相同                                                       | `boolean`                                   | `false` | `true` `false`      |           |
| size                 | 尺寸 (1.9.4 新增)          | `string`                                    | `md`    | `lg` `md` `sm` `xs` |           |
| teleportProps       | 继承至 dropdown 组件，下拉面板 `传递` 属性  | `object`             | `{to: 'body', disabled: false}`   |  `vue teleport` 组件  | `2.19.0` |

:::

::: title Autocomplete 事件
:::

::: table

| 名称   | 描述                         | 参数           |
| ------ | ---------------------------- | -------------- |
| select | 回车选中或手动点击选项时触发 | option: 选中项 |
| input | 输入框 input 事件     | (value : `string` `number`) |
| focus | 输入框 focus事件      | event : Event               |
| blur  | 输入框 blur 事件      | event : Event               |
| clear | 输入框 clear 事件 | -- |

:::

::: title Autocomplete 插槽
:::

::: table

| 名称    | 描述                  | 参数 |
| ------- | --------------------- | ---- |
| prefix  | 输入框前置内容        | --   |
| suffix  | 输入框后置内容        | --   |
| prepend | 输入框前置内容 (边框) | --   |
| append  | 输入框后置内容 (边框) | --   |

:::

::: previousNext autocomplete
:::
