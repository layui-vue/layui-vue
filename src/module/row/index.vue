<template>
  <div class="layui-row" :class="[space ? 'layui-col-space' + space : '']">
    <slot />
  </div>
</template>

<script setup name="LayRow" lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  space?: string
}>()
</script>
