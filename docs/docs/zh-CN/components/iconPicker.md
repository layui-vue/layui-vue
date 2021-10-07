::: demo

<template>
  <lay-icon-picker v-model="icon" type="layui-icon-face-smile"></lay-icon-picker>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const icon = ref("layui-icon-home")

    return {
    }
  }
}
</script>

:::