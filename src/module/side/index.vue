<template>
  <div class="layui-side" :class="black?'layui-bg-black':''">
    <div class="layui-side-scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script setup name="LaySide" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    black?: boolean
  }>()
</script>
