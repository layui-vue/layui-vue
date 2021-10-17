::: demo

<template>
  <lay-carousel v-model="active">
    <lay-carousel-item id="1">条目一</lay-carousel-item>
    <lay-carousel-item id="2">条目二</lay-carousel-item>
    <lay-carousel-item id="3">条目三</lay-carousel-item>
    <lay-carousel-item id="4">条目四</lay-carousel-item>
  </lay-carousel>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {

    const active = ref("1")

    return {
      active
    }
  }
}
</script>

:::
