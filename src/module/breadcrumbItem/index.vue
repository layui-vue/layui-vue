<template>
    <a href="">{{title}}</a>
    <span lay-separator="">/</span>
</template>

<script setup name="LayBreadcrumbItem" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    title: string
  }>()


</script>
