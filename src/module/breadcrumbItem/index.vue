<template>
  <a href>{{ title }}</a>
  <span lay-separator>{{ separator }}</span>
</template>

<script setup name="LayBreadcrumbItem" lang="ts">
import { defineProps, inject } from 'vue'

const props = defineProps<{
  title: string
}>()

const separator = inject('separator')
</script>
