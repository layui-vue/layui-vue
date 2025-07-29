<script setup lang="ts">
import type { AvatarProps } from "./interface";
import { AVATAR_LIST_CONTEXT } from "@layui/component/component/avatarList/constant";
import { LayIcon } from "@layui/icons-vue";
import { computed, inject, nextTick, onUnmounted, ref, watch } from "vue";
import "./index.less";

export type { AvatarProps };

defineOptions({
  name: "LayAvatar",
});

const props = withDefaults(defineProps<AvatarProps>(), {
  size: "md",
  radius: false,
  icon: "layui-icon-username",
  autoFixSize: true,
});
const AvatarListContext = inject(AVATAR_LIST_CONTEXT, {});

const avatar = ref<HTMLElement | null>(null);
const avatarText = ref<HTMLElement | null>(null);
const styles = ref({});

const getSize = computed(() => {
  return AvatarListContext?.size ?? props.size;
});

const getRadius = computed(() => AvatarListContext?.radius ?? props.radius);

const getAutoFixSize = computed(
  () => AvatarListContext?.autoFixSize ?? props.autoFixSize,
);

const classes = computed(() => {
  return [
    "layui-avatar",
    getRadius.value ? "layui-avatar-radius" : "",
    getSize.value ? `layui-avatar-${getSize.value}` : "",
  ];
});

let resizeObserver: ResizeObserver | null;

watch(
  () => [getAutoFixSize.value, props.src],
  async ([autoFix, src]) => {
    if (autoFix && !src) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            const avatarWidth = (avatar.value as HTMLElement).offsetWidth;
            const ratio = Math.min(
              (avatarWidth / entry.contentBoxSize[0].inlineSize) * 0.9,
              1,
            );
            styles.value = { transform: `translate(-50%, -50%) scale(${ratio})` };
          }
        }
      });

      await nextTick();
      resizeObserver.observe(avatarText.value!);
    }
    else {
      resizeObserver && resizeObserver.disconnect();
      resizeObserver = null;
    }
  },
  {
    immediate: true,
  },
);

const isSrcFailed = ref(false);

function handleImgErr(e: Event) {
  if (props.fallback && !isSrcFailed.value) {
    const targetElement = e.target as HTMLImageElement;
    targetElement.src = props.fallback!;
  }
  isSrcFailed.value = true;
}

onUnmounted(() => {
  resizeObserver && resizeObserver.disconnect();
  resizeObserver = null;
});
</script>

<template>
  <span ref="avatar" :class="classes">
    <img v-if="src" :src="src" :alt="alt" @error="handleImgErr">
    <span v-else ref="avatarText" class="layui-avatar-text" :style="styles">
      <slot>
        <LayIcon :type="icon" />
      </slot>
    </span>
  </span>
</template>
