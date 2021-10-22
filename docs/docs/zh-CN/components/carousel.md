::: demo

<template>
  <lay-carousel v-model="active">
    <lay-carousel-item id="1">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目一</div>
    </lay-carousel-item>
    <lay-carousel-item id="2">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目二</div>
    </lay-carousel-item>
    <lay-carousel-item id="3">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目三</div>
    </lay-carousel-item>
    <lay-carousel-item id="4">
      <div style="color: white;text-align: center;width:100%;height:300px;line-height:300px;background-color:#79C48C;">条目四</div>
    </lay-carousel-item>
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
