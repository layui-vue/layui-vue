<template>
  <hr :class="['layui-border-' + theme]" />
</template>

<script setup name="LayLine" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    theme?: string
  }>()
</script>
