<script lang="ts">
export default {
  name: "LayTimelineItem",
};
</script>

<script setup lang="ts">
import { useSlots } from "vue";

export interface TimelineItemProps {
  title?: string;
  simple?: boolean;
}

const slot = useSlots();

const props = defineProps<TimelineItemProps>();
</script>

<template>
  <li class="layui-timeline-item">
    <i class="layui-icon layui-timeline-axis"><slot name="dot"></slot></i>
    <div class="layui-timeline-content layui-text">
      <div v-if="simple" class="layui-timeline-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <h3 v-else class="layui-timeline-title">
        <slot name="title">{{ title }}</slot>
      </h3>
      <slot></slot>
    </div>
  </li>
</template>
