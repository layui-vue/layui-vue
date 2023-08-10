<template>
  <a href="javascript:void(0);" v-bind="$attrs">
    <slot>{{ title }}</slot>
  </a>
  <span lay-separator>
    <template v-if="separatorIcon">
      <i :class="['layui-icon', separatorIcon]"></i>
    </template>
    <template v-else>
      {{ separator }}
    </template>
  </span>
</template>

<script lang="ts">
export default {
  name: "LayBreadcrumbItem",
};
</script>

<script setup lang="ts">
import { inject } from "vue";

export interface BreadcrumbItemProps {
  title?: string;
}

const props = defineProps<BreadcrumbItemProps>();

const separator = inject("separator");
const separatorIcon = inject("separatorIcon");
</script>
