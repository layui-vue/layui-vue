::: anchor
:::

::: title 基础使用
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
    <div v-show="visible" style="width:300px;background: #79C48C;border-radius: 4px;padding:20px;">
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
    </div>
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