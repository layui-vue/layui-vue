<!--
 * @Author: baobaobao
 * @Date: 2023-10-28 23:47:09
 * @LastEditTime: 2023-10-31 21:23:52
 * @LastEditors: baobaobao
-->
<script lang="ts">
export default {
  name: "LayAvatar",
};
</script>

<script setup lang="ts">
import { computed, ref, useSlots, onMounted, onUnmounted, toRefs } from "vue";
import "./index.less";
import { useAvatarProvide } from "../avatarList/use-avatar-list";
import { LayIcon } from "@layui/icons-vue";

export interface AvatarProps {
  src?: string;
  size?: "xs" | "sm" | "md" | "lg";
  radius?: boolean;
  icon?: string;
  alt?: string;
  autoFixSize?: boolean;
  fallback?: string;
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: "md",
  radius: false,
  icon: "layui-icon-username",
  autoFixSize: true,
});

const slot = useSlots();
const avatar = ref<HTMLElement | null>(null);
const avatarText = ref<HTMLElement | null>(null);
const styles = ref({});
const resizeObserver = ref<ResizeObserver>();
const { size, radius, autoFixSize } = toRefs(props);
const classes = computed(() => {
  return [
    "layui-avatar",
    getRadius.value ? "layui-avatar-radius" : "",
    getSize.value ? `layui-avatar-${getSize.value}` : "",
  ];
});
const getParentList = useAvatarProvide();
const getSize = computed(() => getParentList?.size ?? size.value);
const getRadius = computed(() => getParentList?.radius ?? radius.value);
const getAutoFixSize = computed(
  () => getParentList?.autoFixSize ?? autoFixSize.value
);
onMounted(() => {
  if (getAutoFixSize.value && avatarText.value) {
    resizeObserver.value = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const avatarWidth = (avatar.value as HTMLElement).offsetWidth;
          const ratio = Math.min(
            (avatarWidth / entry.contentBoxSize[0].inlineSize) * 0.9,
            1
          );
          styles.value = { transform: `translate(-50%, -50%) scale(${ratio})` };
        }
      }
    });
    resizeObserver.value.observe(avatarText.value);
  }
});
const handleImgErr = (e: Event) => {
  if (props.fallback) {
    const targetElement = e.target as HTMLImageElement;
    targetElement.src = props.fallback!;
  }
};

onUnmounted(() => {
  resizeObserver.value?.disconnect();
});
</script>

<template>
  <span ref="avatar" :class="classes">
    <img v-if="src" :src="src" :alt="alt" @error="handleImgErr" />
    <span ref="avatarText" class="lay-avatar-text" :style="styles" v-else>
      <lay-icon v-if="!slot.default" :type="icon" />
      <slot></slot>
    </span>
  </span>
</template>
