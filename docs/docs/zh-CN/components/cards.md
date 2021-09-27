::: demo

<template>
  <lay-card>
      <template v-slot:header>
      标题
      </template>
      <template v-slot:body>
      内容
      </template>
  </lay-card>
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