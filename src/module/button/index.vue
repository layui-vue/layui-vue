<template>
  <button
    class="layui-btn"
    :class="[
      type ? 'layui-btn-' + type : '',
      size ? 'layui-btn-' + size : '',
      fluid ? 'layui-btn-fluid' : '',
      radius ? 'layui-btn-radius' : '',
      border ? 'layui-border-' + border : '',
      disabled ? 'layui-btn-disabled' : '',
    ]"
    :type="nativeType"
  >
    <i
      v-if="loading"
      class="
        layui-icon
        layui-icon-loading-1
        layui-anim
        layui-anim-rotate
        layui-anim-loop
      "
    ></i>
    <slot v-else />
  </button>
</template>

<script lang="ts">
export default {
  name: 'LayButton',
}
</script>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  type?: string
  size?: string
  fluid?: boolean
  radius?: boolean
  border?: string
  disabled?: boolean
  loading?: boolean
  nativeType?: string
}>()
</script>
