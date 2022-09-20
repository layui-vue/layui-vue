<template>
  <a href="javascript:void(0);" v-bind="$attrs">
    <slot>{{ title }}</slot>
  </a>
  <span lay-separator>{{ separator }}</span>
</template>

<script lang="ts">
export default {
  name: "LayBreadcrumbItem",
};
</script>

<script setup lang="ts">
import { inject, useSlots } from "vue";

export interface LayBreadcrumbItemProps {
  title?: string;
}

const slot = useSlots();

const props = defineProps<LayBreadcrumbItemProps>();

const separator = inject("separator");
</script>
