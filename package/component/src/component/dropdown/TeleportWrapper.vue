<script lang="ts">
export default {
  name: "TeleportWrapper",
};
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

export interface TeleportWrapperProps {
  to?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<TeleportWrapperProps>(), {
  to: '',
  disabled: false,
})

const target = ref<Element | null>(null)

onMounted(() => {
  if (!props.to) return;
  const el = document.querySelector(props.to)
  if (el) {
    target.value = el
  }
})
</script>
<template>
  <Teleport :to="target" :disabled="!target || disabled">
    <slot></slot>
  </Teleport>
</template>