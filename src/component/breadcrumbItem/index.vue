<template>
  <a href="javascript:void(0);">
    <template v-if="slot.default">
      <slot></slot>
    </template>
    <template v-else>
      {{ title }}
    </template>
  </a>
  <span lay-separator>{{ separator }}</span>
</template>

<script lang="ts">
export default {
  name: "LayBreadcrumbItem"
}
</script>

<script setup lang="ts">
import { inject, useSlots } from "vue";

const slot = useSlots();

const props = defineProps<{
  title?: string;
}>();

const separator = inject("separator");
</script>
