<script lang="ts">
import { computed } from 'vue';
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
      'layui-avatar',
      props.radius ? 'layui-avatar-radius' : '',
      props.size ? `layui-avatar-${props.size}` : '',
  ]
})
</script>

<template>
  <img
    :alt="alt"
    :src="src"
    :class="classes"
  />
</template>
