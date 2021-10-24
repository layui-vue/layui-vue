::: field 基础使用
:::

::: demo

<template>
  <lay-switch v-model="active1"></lay-switch>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active1 = ref(true);

    return {
        active1
    }
  }
}
</script>

:::

::: field 事件回调
:::

::: demo

<template>
  <lay-switch v-model="active2" @change="change"></lay-switch>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active2 = ref(true);

    const change = function( val ) {
        console.log("当前值:" + val)
    }

    return {
        active2,
        change
    }
  }
}
</script>

:::

::: field 禁用状态
:::

::: demo

<template>
  <lay-switch v-model="active3" :disabled="disabled"></lay-switch>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active3 = ref(true);
    const disabled = ref(true)

    return {
        active3
    }
  }
}
</script>

:::

::: field 修改描述
:::

::: demo

<template>
  <lay-switch v-model="active4" active-text="白天"  inactive-text="夜间"></lay-switch>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active4 = ref(true)

    return {
        active4
    }
  }
}
</script>

:::

::: field switch 属性
:::

| Name          | Description    | Accepted Values  |
| ------------- | -------------- | ---------------- |
| name          | 原生 name 属性 | --               |
| v-model       | 是否启用       | `true` `false`   |
| disabled      | 禁用           | `true` `false`   |
| change        | 切换事件       | current : 当前值 | inactiveText |
| active-text   | 启用描述       | `启动`           |
| inactive-text | 禁用描述       | `禁用`           |
