<template>
  <blockquote class="layui-elem-quote" :class="[nm ? 'layui-quote-nm' : '']">
    <slot />
  </blockquote>
</template>

<script setup name="LayBlock" lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  nm?: boolean
}>()
</script>
