<script lang="ts">
import { computed, CSSProperties, useSlots, useAttrs } from "vue";
export default {
  name: "LayAvatarList",
};
</script>

<script setup lang="ts">
const slot = useSlots();
</script>

<template>
  <div class="layui-avatar-list">
    <slot></slot>
  </div>
</template>
