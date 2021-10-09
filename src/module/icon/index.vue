<template>
    <i class="layui-icon" :class="[type]"></i>
</template>

<script setup name="LayIcon" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    type?: string
  }>()
</script>
