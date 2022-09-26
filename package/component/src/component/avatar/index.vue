<script lang="ts">
import { computed, useSlots } from "vue";
export default {
  name: "LayAvatar",
};
</script>

<script setup lang="ts">
import "./index.less";
export interface LayAvatarProps {
  src?: string;
  size?: "xs" | "sm" | "md" | "lg";
  radius?: boolean;
  alt?: string;
}

const props = withDefaults(defineProps<LayAvatarProps>(), {
  size: "md",
  radius: false,
});

const classes = computed(() => {
  return [
    "layui-avatar",
    props.radius ? "layui-avatar-radius" : "",
    props.size ? `layui-avatar-${props.size}` : "",
  ];
});
const slot = useSlots();
</script>

<template>
  <span v-if="!slot.default" :class="classes">
    <img :alt="alt" :src="src"   />
  </span>
  <span :class="classes" v-else >
    <slot></slot>
  </span>
</template>
