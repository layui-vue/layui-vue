<script setup lang="ts">
import "./index.less";
import { computed } from "vue";
import { BooleanOrString } from "../../types";

export interface ContainerProps {
  fluid?: BooleanOrString;
}

defineOptions({
  name: "LayContainer",
});

const props = withDefaults(defineProps<ContainerProps>(), {
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
