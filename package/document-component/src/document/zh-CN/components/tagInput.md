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
  <lay-tag-input v-model="data1" v-model:inputValue="inputValue1"></lay-tag-input>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const data1 = ref(['Vue', 'React']);
    const inputValue1 = ref("");

    return {
      data1,
      inputValue1
    }
  }
}
</script>

:::

::: title 只读状态
:::

::: demo 使用 `lay-tag-input` 标签, 创建标签输入框。  

<template>
  <lay-tag-input v-model="data3" v-model:inputValue="inputValue3" :readonly="true"></lay-tag-input>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const data3 = ref(['Vue', 'React']);
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

::: demo 使用 `lay-tag-input` 标签, 创建标签输入框。  

<template>
  <lay-tag-input v-model="data4" v-model:inputValue="inputValue4" :disabled="true"></lay-tag-input>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const data4 = ref(['Vue', 'React']);
    const inputValue4 = ref("");

    return {
      data4,
      inputValue4
    }
  }
}
</script>

:::

::: title 禁用状态
:::

::: demo 使用 `lay-tag-input` 标签, 创建标签输入框。  

<template>
  <lay-tag-input v-model="data5" v-model:inputValue="inputValue5" :allow-clear="true"></lay-tag-input>
</template>

<script>
import { ref,watch } from 'vue'

export default {
  setup() {
    const data5 = ref(['Vue', 'React']);
    const inputValue5 = ref("");

    return {
      data5,
      inputValue5
    }
  }
}
</script>

:::