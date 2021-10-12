<template>
  <div class="layui-tab-item" :class="[active === id ? 'layui-show' : '']">
    <slot />
  </div>
</template>

<script setup name="LayTabItem" lang="ts">
import { defineProps, inject, useSlots } from 'vue'

const props = defineProps<{
  id?: string
}>()

const active = inject('active')
</script>
