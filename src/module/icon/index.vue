<script lang="ts">
export default {
  name: "LayIcon",
};
</script>

<script setup lang="ts">
import { computed, defineProps } from "vue";

export interface LayIconProps {
  prefix?: string;
  color?: string;
  size?: string;
  type?: string;
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
</script>

<template>
  <i :class="[prefix, type]" :style="styles" />
</template>