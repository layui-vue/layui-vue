<script lang="ts">
import { computed, useSlots } from "vue";
import { LayIcon } from "@layui/icons-vue";
export default {
  name: "LayAvatar",
};
</script>

<script setup lang="ts">
import "./index.less";

export interface AvatarProps {
  src?: string;
  size?: "xs" | "sm" | "md" | "lg";
  radius?: boolean;
  icon?: string;
  alt?: string;
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: "md",
  radius: false,
  icon: "layui-icon-username",
});

const slot = useSlots();

const classes = computed(() => {
  return [
    "layui-avatar",
    props.radius ? "layui-avatar-radius" : "",
    props.size ? `layui-avatar-${props.size}` : "",
  ];
});
</script>

<template>
  <span :class="classes" v-if="slot.default">
    <slot></slot>
  </span>
  <span v-else :class="classes">
    <img v-if="src" :src="src" :alt="alt" />
    <lay-icon v-else :type="icon" />
  </span>
</template>
