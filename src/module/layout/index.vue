<template>
  <section :class="classes">
    <slot />
  </section>
</template>
<script lang="ts">
export default {
  name: 'LayLayout',
}
</script>
<script setup lang="ts">
import { Component, computed, useSlots } from 'vue'
import Header from '../header/index.vue'

const props = withDefaults(
  defineProps<{
    isVertical?: boolean
  }>(),
  {
    isVertical: false,
  }
)

const slots = useSlots()

const isVertical = computed(() => {
  if (!slots.default) return false
  const vNodes = slots.default()
  return vNodes.some((vNode) => {
    const componentName = (vNode.type as Component).name
    if (!componentName) return false
    return [Header.name].includes(componentName)
  })
})

const classes = computed(() => {
  return ['layui-layout', { 'layui-layout-vertical': isVertical.value }]
})
</script>

<style>
.layui-layout {
  display: flex;
  flex: 1;
  flex-basis: auto;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.layui-layout-vertical {
  flex-direction: column;
}
</style>
