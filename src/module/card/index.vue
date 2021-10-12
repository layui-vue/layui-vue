<template>
  <div class="layui-card">
    <div class="layui-card-header" v-if="slot.header || title">
      <slot name="header" v-if="slot.header" />
      <span v-else>{{ title }}</span>
    </div>
    <div class="layui-card-body">
      <slot name="body" v-if="slot.body" />
      <slot v-else></slot>
    </div>
  </div>
</template>

<script setup name="LayCard" lang="ts">
import { useSlots } from 'vue'

const slot = useSlots()

const props =
  defineProps<{
    title?: string
  }>()
</script>
