<template>
   <ul class="layui-nav" :class="[tree ? 'layui-nav-tree':'']">
       <slot></slot>
   </ul>
</template>

<script setup name="LayMenu" lang="ts">
import { defineProps, provide, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    selectedKey?: string
    tree?: boolean
  }>(),
  {
    selectedKey: "",
    tree: false,
  }
)

const isTree = ref(props.tree)
const selectKey = ref(props.selectedKey)

provide("isTree",isTree);
provide("selectKey",selectKey)
</script>
