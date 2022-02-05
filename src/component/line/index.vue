<script lang="ts">
export default {
  name: "LayLine"
}
</script>

<script setup lang="ts">
export interface LayLineProps {
  theme?: string; 
}

const props = defineProps<LayLineProps>();
</script>

<template>
  <hr :class="['layui-border-' + theme]" />
</template>