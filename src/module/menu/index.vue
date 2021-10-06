<template>
   <ul class="layui-nav" :class="[tree ? 'layui-nav-tree':'']">
       <slot></slot>
   </ul>
</template>

<script setup name="LayMenu" lang="ts">
import { defineProps, provide, ref } from 'vue'

const props =
  defineProps<{
    tree?: boolean
    selectedKeys?: string[]
  }>()

const isTree = ref(props.tree)
const selectKeys = ref(props.selectedKeys)

provide("isTree",isTree);
provide("selectKeys",selectKeys)
</script>
