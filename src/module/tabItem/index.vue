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
import { defineProps, inject, defineEmits, Ref } from 'vue'

const props = defineProps<{
  id?: string
}>()

const active = inject('active')
const slotsChange: Ref<boolean> = inject('slotsChange') as Ref<boolean>
slotsChange.value = !slotsChange.value
</script>
