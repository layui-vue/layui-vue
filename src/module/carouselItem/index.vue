<template>
  <li :class="[active === id ? 'layui-this' : '']">
    <slot></slot>
  </li>
</template>
<script setup name="LayCarouselItem" lang="ts">
import { defineProps, inject } from 'vue'

const props = defineProps<{
  id: string
}>()

const active = inject('active')
</script>
