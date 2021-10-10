<template>
  <button
    class="layui-btn"
    :class="[
      type ? 'layui-btn-' + type : '',
      size ? 'layui-btn-' + size : '',
      fluid ? 'layui-btn-fluid' : '',
      radius ? 'layui-btn-radius' : '',
      border ? 'layui-border-' + border : '',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup name="LayButton" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    type?: string
    size?: string
    fluid?: boolean
    radius?: boolean
    border?: string 
  }>()
</script>
