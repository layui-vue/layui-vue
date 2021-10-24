<template>
  <div class="layui-side" :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'LaySide',
}
</script>

<script setup lang="ts">
import { computed, CSSProperties, defineProps } from 'vue'

const props = withDefaults(
  defineProps<{
    width?: string
  }>(),
  {
    width: '200',
  }
)

const style = computed<CSSProperties>(() => {
  return {
    width: `${props.width}px`,
  }
})
</script>

<style>
.layui-side {
  overflow: auto;
  box-sizing: border-box;
  min-height: 300px;
}
</style>
