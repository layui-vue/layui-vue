<template>
    <img :src="src" class="layui-avatar" :class="[radius ? 'layui-avatar-radius':'', size ? 'layui-avatar-' + size: '']"/>
</template>

<script setup name="LayAvatar" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    src?: boolean
    radius?: boolean
    size?: string
  }>()
</script>
