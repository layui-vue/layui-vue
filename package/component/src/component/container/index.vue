<script lang="ts">
export default {
  name: "LayContainer",
};
</script>

<script setup lang="ts">
import "./index.less";
import { computed } from "vue";
import { BooleanOrString } from "../../types";

export interface LayContainerProps {
  fluid?: BooleanOrString;
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
