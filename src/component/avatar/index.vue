<script lang="ts">
export default {
  name: "LayAvatar",
};
</script>

<script setup lang="ts">
import "./index.less";

const props = defineProps<{
  src?: String;
  size?: string;
  radius?: boolean;
}>();
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