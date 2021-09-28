::: demo

<template>
  <lay-input v-model="data"></lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const data = ref("内容");

    return {
      data
    }
  }
}
</script>

:::

::: demo

<template>
  <lay-input placeholder="请输入密码"></lay-input>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    return {

    }
  }
}
</script>

:::