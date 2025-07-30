<script setup lang="ts">
import type { AvatarListProps } from "./interface";
import { provide, reactive, toRefs } from "vue";
import { AVATAR_LIST_CONTEXT } from "./constant";

export type { AvatarListProps };

defineOptions({
  name: "LayAvatarList",
});

const props = withDefaults(defineProps<AvatarListProps>(), {
  size: "md",
  radius: false,
  autoFixSize: true,
});

provide(AVATAR_LIST_CONTEXT, reactive({
  ...toRefs(props),
}));
</script>

<template>
  <div class="layui-avatar-list">
    <slot />
  </div>
</template>
