<script lang="ts">
export default {
  name: "LayBadge",
};
</script>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import "./index.less";

export interface LayBadgeProps {
  type?: "dot" | "rim";
  theme?: string;
  color?: string;
}
const props = defineProps<LayBadgeProps>();

const classes = computed(() => {
  return [
    {
      "layui-badge": !props.type,
      "layui-badge-dot": props.type == "dot",
      "layui-badge-rim": props.type == "rim",
    },
    `layui-bg-${props.theme}`,
  ];
});

const styles = computed(() => {
  props.color ? `background-color: ${props.color}` : "";
});
</script>

<template>
  <span :class="classes" :style="styles">
    <slot v-if="type != 'dot'"></slot>
  </span>
</template>
