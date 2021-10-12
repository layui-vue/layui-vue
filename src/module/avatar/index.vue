<template>
  <img
    :src="href"
    class="layui-avatar"
    :class="[
      radius ? 'layui-avatar-radius' : '',
      size ? 'layui-avatar-' + size : '',
    ]"
  />
</template>

<script setup name="LayAvatar" lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  href?: String
  radius?: boolean
  size?: string
}>()
</script>
