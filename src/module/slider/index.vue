<template>
  <div class="layui-slider layui-slider-vertical" style="height: 200px" v-if="vertical">
    <div class="layui-slider-tips"></div>
    <div
      class="layui-slider-bar"
      style="background: #009688; height: 0%; bottom: 0"
    ></div>
    <div class="layui-slider-wrap" style="bottom: 0%">
      <div
        class="layui-slider-wrap-btn"
        style="border: 2px solid #009688"
      ></div>
    </div>
  </div>

  <div class="layui-slider" v-else>
    <div class="layui-slider-tips"></div>
    <div
      class="layui-slider-bar"
      style="background: #009688; width: 0%; left: 0"
    ></div>
    <div class="layui-slider-wrap" style="left: 0%">
      <div
        class="layui-slider-wrap-btn"
        style="border: 2px solid #009688"
      ></div>
    </div>
  </div>
</template>

<script setup name="LaySlider" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    vertical?: boolean
  }>()
</script>