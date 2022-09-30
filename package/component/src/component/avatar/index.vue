<script lang="ts">
import { computed, useSlots } from "vue";
import { LayIcon } from "@layui/icons-vue";
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
  icon?: string;
  alt?: string;
}

const props = withDefaults(defineProps<LayAvatarProps>(), {
  size: "md",
  radius: false,
  icon: "layui-icon-username",
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
  <span :class="classes" v-if="slot.default">
    <slot></slot>
  </span>
  <span v-else-if="src" :class="classes">
    <img :alt="alt" :src="src" />
  </span>
  <span v-else :class="classes">
    <lay-icon :type="icon"></lay-icon>
  </span>
</template>
