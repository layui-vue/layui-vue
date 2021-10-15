<template>
  <i :class="[prefix, type]" :style="{ color: color , fontSize: size}"/>
</template>

<script setup name="LayIcon" lang="ts">
import { defineProps } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: string
    prefix?: string
    color?: string
    size?: string
  }>(),
  {
    prefix: 'layui-icon',
  }
)
</script>
