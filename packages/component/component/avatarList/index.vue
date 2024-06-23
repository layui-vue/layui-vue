<!--
 * @Author: baobaobao
 * @Date: 2023-10-18 12:54:03
 * @LastEditTime: 2023-10-28 23:48:27
 * @LastEditors: baobaobao
-->

<script setup lang="ts">
import { provide } from "vue";
import { LAYUI_AVATAR_KEY } from "./use-avatar-list";

export interface AvatarListProps {
  size?: "xs" | "sm" | "md" | "lg";
  radius?: boolean;
  autoFixSize?: boolean;
}

defineOptions({
  name: "LayAvatarList",
});

const props = withDefaults(defineProps<AvatarListProps>(), {
  size: "md",
  radius: false,
  autoFixSize: true,
});
provide(LAYUI_AVATAR_KEY, {
  ...props,
});
</script>

<template>
  <div class="layui-avatar-list">
    <slot></slot>
  </div>
</template>
