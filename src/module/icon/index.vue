<template>
    <i class="layui-icon" :class="[type]"></i>
</template>

<script setup name="LayButton" lang="ts">
const props =
  defineProps<{
    type?: string
  }>()
</script>
