<script lang="ts">
export default {
  name: "LayLine"
}
</script>

<script setup lang="ts">
const props = defineProps<{
  theme?: string;
}>();
</script>

<template>
  <hr :class="['layui-border-' + theme]" />
</template>