::: anchor
:::

::: title 基本介绍
:::

::: describe 过渡效果的使用将大幅提升用户的使用体验。
:::

::: title 基础使用
:::

::: demo 使用 `lay-transition` 标签, 为元素提供过渡动画

<template>
  <lay-button @click="changeVisible">开始</lay-button>
  <br/>
  <br/>
  <lay-transition>
      <lay-card title="标题" v-if="visible">内容</lay-card>
  </lay-transition>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const visible = ref(true);

    const changeVisible = () => {
        visible.value = !visible.value;
    }

    return {
        changeVisible
    }
  }
}
</script>

:::

::: title 基础使用
:::

::: demo 使用 `lay-transition` 标签, 为元素提供过渡动画

<template>
  <lay-button @click="changeVisible1">开始</lay-button>
  <br/>
  <br/>
  <lay-transition type="fade">
      <lay-card title="标题" v-if="visible1">内容</lay-card>
  </lay-transition>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const visible1 = ref(true);

    const changeVisible1 = () => {
        visible1.value = !visible1.value;
    }

    return {
        changeVisible1
    }
  }
}
</script>

:::