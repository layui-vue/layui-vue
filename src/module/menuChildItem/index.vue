<template>
  <dd>
    <a href="">{{ title }}</a>
  </dd>
</template>

<script setup name="LayMenuChildItem" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    title: string
  }>()
</script>
