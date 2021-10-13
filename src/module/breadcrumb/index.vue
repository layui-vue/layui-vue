<template>
  <span class="layui-breadcrumb" style="visibility: visible">
    <slot></slot>
  </span>
</template>

<script setup name="LayBreadcrumb" lang="ts">
import { defineProps, provide, withDefaults, useSlots, ref, Ref } from 'vue'

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
