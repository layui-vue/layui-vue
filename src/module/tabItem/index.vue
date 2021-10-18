<template>
  <div class="layui-tab-item" :class="[active === id ? 'layui-show' : '']">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'LayTabItem',
}
</script>

<script setup name="LayTabItem" lang="ts">
import { defineProps, inject } from 'vue'

const props = defineProps<{
  id?: string
}>()

const active = inject('active')
</script>


