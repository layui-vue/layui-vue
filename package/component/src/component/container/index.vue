<script lang="ts">
export default {
  name: "LayContainer",
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import "./index.less";

export interface LayContainerProps {
  fluid?: boolean  | string;
}

const props = withDefaults(defineProps<LayContainerProps>(), {
  fluid: false,
});

const classes = computed(() =>
  props.fluid ? "layui-fluid" : "layui-container"
);
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
