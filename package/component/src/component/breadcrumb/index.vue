<script lang="ts">
export default {
  name: "LayBreadcrumb",
};
</script>

<script setup lang="ts">
import "./index.less";
import { provide, withDefaults } from "vue";

export interface BreadcrumbProps {
  separator?: string;
  separatorIcon?: string;
}

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
