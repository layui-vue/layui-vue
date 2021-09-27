<template>
    <input type="text" class="layui-input" />
</template>

<script setup name="LayInput" lang="ts">
import { defineProps } from '@vue/runtime-core'

const props =
  defineProps<{
    type?: string
  }>()
</script>
