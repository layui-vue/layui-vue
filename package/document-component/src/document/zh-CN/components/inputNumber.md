::: anchor
:::

::: title 基本介绍
:::

::: describe 通过鼠标或键盘，输入范围内的数值。
:::

::: title 基础使用
:::

::: demo 使用 `lay-input-number` 标签, 创建数字输入框

<template>
  <lay-input-number v-model="data"></lay-input-number>
  <lay-input-number v-model="data2"  position="right"></lay-input-number>
</template>

<script>
  import { ref } from 'vue';
  const data = ref(0);
  const data2 = ref(0);
  export default {
    setup() {
      return {
        data,
        data2,
      }
    }
  }
</script>

:::

::: title 尺寸
:::

::: demo

<template>
  <div>
    <div>
      <lay-input-number size="lg"></lay-input-number>
      <lay-input-number size="md"></lay-input-number>
      <lay-input-number size="sm"></lay-input-number>
      <lay-input-number size="xs"></lay-input-number>
    </div>
  </div>
</template>

<script>
</script>

:::

::: title 限制数字大小
:::

::: demo

<template>
  <lay-input-number :min="0" :max="10"></lay-input-number>
</template>

<script>
</script>

:::

::: title 数字步数
:::

::: demo

<template>
  <lay-input-number :step="10"></lay-input-number>
</template>

<script>
</script>

:::

::: title 禁用
:::

::: demo

<template>
  <p>禁用输入</p>
  <lay-input-number v-model="data" disabled-input></lay-input-number>
  <p>全部禁用</p>
  <lay-input-number v-model="data2" disabled></lay-input-number>
</template>

<script>
  import { ref } from 'vue';
  const data = ref(10);
  const data2 = ref(25);
  export default {
    setup() {
      return {
        data,
        data2
      }
    }
  }
</script>

:::


::: title Input Number 属性
:::

::: table

| 属性     | 描述           | 类型 | 默认值 |
| -------- | ------------- | ------ | ------ |
| v-model  | 值            | `number` | 0     |
| name     | 原生属性`name` | `number` | 5     |
| disabledInput | 禁用输入框输入 | `boolean` | false     |
| disabled | 禁用操作 | `boolean` | false     |
| step     | 数字增减的步数 | `number` | 1     |
| position     | 控制按钮显示位置, 目前除了默认值，只有`right`可填 | `string` | --     |
| min     | 最小可输入的数 | `number` | --     |
| max     | 最大可输入的数 | `number` | --     |
| size     | 尺寸, 可选值`md` / `sm` / `xs`| `string` | 默认为最大尺寸   |

:::

::: title Input Number 事件
:::

::: table

| 属性     | 描述      | 回调参数 |
| -------- | -------- | ------ |
| change  | 值更改触发事件   | (value: number) |

:::

::: contributor inputNumber
:::  

::: previousNext inputNumber
:::