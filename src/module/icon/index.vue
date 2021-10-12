<template>
  <i class="layui-icon" :class="[type]" />
</template>

<script setup name="LayIcon" lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  type?: string
}>()
</script>
