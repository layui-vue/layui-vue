<script lang="ts">
export default {
  name: "LayBadge",
};
</script>

<script setup lang="ts">
import { computed, StyleValue } from "vue";
import "./index.less";

export interface BadgeProps {
  theme?: string;
  color?: string;
  ripple?: boolean;
  type?: "dot" | "rim";
}

const props = defineProps<BadgeProps>();

const classes = computed(() => {
  return [
    {
      "layui-badge": !props.type,
      "layui-badge-rim": props.type == "rim",
      "layui-badge-dot": props.type == "dot",
      "layui-badge-dot-ripple": props.ripple,
    },
    `layui-bg-${props.theme}`,
  ];
});

const styles = computed<StyleValue>(() => {
  return [props.color ? `background-color: ${props.color}` : ""];
});
</script>

<template>
  <span :class="classes" :style="styles">
    <span
      v-if="type === 'dot'"
      :class="props.theme ? `layui-bg-${props.theme}` : ``"
      :style="
        props.color
          ? `background-color: ${props.color}`
          : 'background-color: #ff5722;'
      "
    >
    </span>
    <slot v-if="type != 'dot'"></slot>
  </span>
</template>
