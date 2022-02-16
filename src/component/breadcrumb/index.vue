<script lang="ts">
export default {
  name: "LayBreadcrumb",
};
</script>

<script setup lang="ts">
import { provide, withDefaults } from "vue";

export interface LayBreadcrumbProps {
  separator?: string;
}

const props = withDefaults(defineProps<LayBreadcrumbProps>(), {
  separator: "/",
});

provide("separator", props.separator);
</script>

<template>
  <span class="layui-breadcrumb" style="visibility: visible">
    <slot></slot>
  </span>
</template>
