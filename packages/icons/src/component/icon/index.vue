<script lang="ts">
export default {
  name: "LayIcon",
};
</script>

<script setup lang="ts">
import { computed } from "vue";

export interface LayIconProps {
  size?: string;
  type?: string;
  color?: string;
  prefix?: string;
}

const props = withDefaults(defineProps<LayIconProps>(), {
  prefix: "layui-icon",
});

const styles = computed(() => {
  return {
    color: props.color,
    fontSize: props.size,
  };
});

const classes = computed(() => {
  return {
    type: props.type,
    prefix: props.prefix,
  };
});
</script>

<template>
  <i :class="[prefix, type]" :style="styles" />
</template>
