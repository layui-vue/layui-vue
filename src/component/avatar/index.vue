<script lang="ts">
export default {
  name: "LayAvatar",
};
</script>

<script setup lang="ts">
import "./index.less";

export interface LayAvatarProps {
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  radius?: boolean;
}

const props = withDefaults(defineProps<LayAvatarProps>(), {
  size: 'md',
  radius: false
});
</script>

<template>
  <img
    :src="src"
    class="layui-avatar"
    :class="[
      radius ? 'layui-avatar-radius' : '',
      size ? 'layui-avatar-' + size : '',
    ]"
  />
</template>
