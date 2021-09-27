<template>
  <div class="layui-col" :class="[md?'layui-col-md' + md : '', xs?'layui-col-xs':'', sm?'layui-col-sm':'']">
      <slot></slot>
  </div>
</template>

<script setup name="LayCol" lang="ts">
import { defineProps } from '@vue/runtime-core'

const props =
  defineProps<{
    md?: string
    xs?: string
    sm?: string
  }>()
</script>