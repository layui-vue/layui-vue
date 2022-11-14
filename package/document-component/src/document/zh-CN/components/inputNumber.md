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
  <lay-input-number v-model="data1" :step="0.11"></lay-input-number>
  <lay-input-number v-model="data2"  position="right"></lay-input-number>
</template>

<script>
  import { ref } from 'vue';
  const data1 = ref(0);
  const data2 = ref(0);
  export default {
    setup() {
      return {
        data1,
        data2,
      }
    }
  }
</script>

:::

::: title 尺寸
:::

::: demo 通过 `size` 属性定义尺寸, 默认为 `md`, 可选值为 `lg` `md` `sm` `xs`。

<template>
  <div>
    <div>
      <lay-input-number v-model="data3" size="lg"></lay-input-number>
      <lay-input-number v-model="data4" size="md"></lay-input-number>
      <lay-input-number v-model="data5" size="sm"></lay-input-number>
      <lay-input-number v-model="data6" size="xs"></lay-input-number>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue';
  const data3 = ref(0);
  const data4 = ref(0);
  const data5 = ref(0);
  const data6 = ref(0);
  export default {
    setup() {
      return {
        data3,
        data4,
        data5,
        data6,
      }
    }
  }
</script>

:::

::: title 限制数字大小
:::

::: demo 通过 `min` 与 `max` 属性, 限制输入数字的大小。

<template>
  <lay-input-number v-model="data7" :min="0" :max="10"></lay-input-number>
</template>

<script>
  import { ref } from 'vue';
  const data7 = ref(0);
  export default {
    setup() {
      return {
        data7,
      }
    }
  }
</script>

:::

::: title 数字步数
:::

::: demo 通过 `step` 属性, 设置 加 与 减 的步长。

<template>
  <lay-input-number v-model="data8" :step="10"></lay-input-number>
</template>

<script>
  import { ref } from 'vue';
  const data8 = ref(0);
  export default {
    setup() {
      return {
        data8,
      }
    }
  }
</script>

:::

::: title 禁用
:::

::: demo 通过 `disabled-input` 与 `disabled` 属性, 禁用输入或操作。

<template>
  <lay-space>
      <p>禁用输入</p>
      <lay-input-number v-model="data9" disabled-input></lay-input-number>
      <p>全部禁用</p>
      <lay-input-number v-model="data10" disabled></lay-input-number>
  </lay-space>
</template>

<script>
  import { ref } from 'vue';
  const data9 = ref(10);
  const data10 = ref(25);
  export default {
    setup() {
      return {
        data9,
        data10
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