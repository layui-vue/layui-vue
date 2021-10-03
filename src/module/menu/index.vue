<template>
   <ul class="layui-nav" :class="[tree ? 'layui-nav-tree':'']">
       <slot></slot>
   </ul>
</template>

<script setup name="LayMenu" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    tree?: boolean
  }>()
</script>
