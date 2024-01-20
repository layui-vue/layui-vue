<script setup lang="ts">
import { LayIcon } from "@layui/icons-vue";

export interface SkeletonProps {
  type?: string;
}

defineOptions({
  name: "LaySkeletonItem",
});

const props = withDefaults(defineProps<SkeletonProps>(), {
  type: "p",
});
</script>

<template>
  <div
    :class="['lay-skeleton-item', `lay-skeleton-type--${type}`]"
    v-bind="$attrs"
  >
    <div v-if="type === 'image'">
      <lay-icon type="layui-icon-picture"></lay-icon>
    </div>
  </div>
</template>
