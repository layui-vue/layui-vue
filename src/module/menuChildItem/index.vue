<template>
  <dd>
    <a href="javascript:void(0)">{{ title }}</a>
  </dd>
</template>

<script setup name="LayMenuChildItem" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    title: string
  }>()
</script>
