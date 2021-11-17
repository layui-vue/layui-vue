<template>
  <li class="layui-timeline-item">
    <i class="layui-icon layui-timeline-axis"></i>
    <div class="layui-timeline-content layui-text">
      <div v-if="simple" class="layui-timeline-title">
        {{ title }}
      </div>
      <h3 v-else class="layui-timeline-title">
        {{ title }}
      </h3>
      <slot />
    </div>
  </li>
</template>

<script lang="ts">
export default {
  name: "LayTimelineItem",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";

export interface LayTimelineItemProps {
  title: string;
  simple?: boolean;
}

const props = defineProps<LayTimelineItemProps>();
</script>
