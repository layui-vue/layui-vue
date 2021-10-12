<template>
  <span class="layui-breadcrumb" style="visibility: visible">
    <slot />
  </span>
</template>

<script setup name="LayBreadcrumb" lang="ts">
import { defineProps, provide, withDefaults, useSlots } from 'vue'

const slot = useSlots()
const slots = slot.default && slot.default()

const props = withDefaults(
  defineProps<{
    separator?: string
  }>(),
  {
    separator: '/',
  }
)

provide('separator', props.separator)
</script>
