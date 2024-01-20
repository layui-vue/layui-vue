<script setup lang="ts">
import "./index.less";
import { provide } from "vue";

export interface BreadcrumbProps {
  separator?: string;
  separatorIcon?: string;
}

defineOptions({
  name: "LayBreadcrumb",
});

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: "/",
});

provide("separator", props.separator);
provide("separatorIcon", props.separatorIcon);
</script>

<template>
  <span class="layui-breadcrumb">
    <slot></slot>
  </span>
</template>
