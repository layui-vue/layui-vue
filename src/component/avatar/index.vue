<script lang="ts">
export default {
  name: "LayAvatar",
};
</script>

<script setup lang="ts">
import "./index.less";

export interface LayAvatarProps {
  src?: String;
  size?: string;
  radius?: boolean;
}

const props = withDefaults(defineProps<LayAvatarProps>(), {
  
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