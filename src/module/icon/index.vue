<template>
  <i :class="[prefix, type]" />
</template>

<script setup name="LayIcon" lang="ts">
import { defineProps } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: string
    prefix?: string
  }>(),
  {
    prefix: 'layui-icon',
  }
)
</script>
