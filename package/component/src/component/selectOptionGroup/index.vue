<script setup lang="ts">
import "./index.less";

export interface SelectOptionGroupProps {
  label?: string;
}

defineOptions({
  name: "LaySelectOptionGroup",
});

const props = withDefaults(defineProps<SelectOptionGroupProps>(), {
  label: "Group Name",
});
</script>

<template>
  <div class="layui-select-option-group">
    <dt class="layui-select-option-group-label">{{ label }}</dt>
    <slot></slot>
  </div>
</template>
