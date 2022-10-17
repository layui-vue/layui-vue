<script lang="ts">
export default {
  name: "LayPanel",
};
</script>

<script setup lang="ts">
import "./index.less";
import { computed } from "vue";
import { PanelShadow } from "./interface";

export interface PanelProps {
  shadow?: PanelShadow;
}

const props = withDefaults(defineProps<PanelProps>(), {
  shadow: "always",
});

const classes = computed(() => {
  return {
    shadow: props.shadow === "always",
    "is-hover-shadow": props.shadow === "hover",
  };
});
</script>

<template>
  <div class="layui-panel" :class="classes">
    <slot></slot>
  </div>
</template>
