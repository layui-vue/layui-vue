<template>
  <a href="javascript:void(0);">
    <template v-if="slot.default">
      <slot></slot>
    </template>
    <template v-else>
      {{ title }}
    </template>
  </a>
  <span lay-separator>{{ separator }}</span>
</template>

<script setup name="LayBreadcrumbItem" lang="ts">
import { defineProps, inject, useSlots } from 'vue'

const slot = useSlots()

const props = defineProps<{
  title?: string
}>()

const separator = inject('separator')
</script>
