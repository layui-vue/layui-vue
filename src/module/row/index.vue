<template>
  <div class="layui-row" :class="[space?'layui-col-space'+space:'']">
      <slot></slot>
  </div>
</template>

<script setup name="LayRow" lang="ts">
import { defineProps } from '@vue/runtime-core'

const props =
  defineProps<{
    space?: string
  }>()
</script>
