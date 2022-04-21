<script lang="ts">
export default {
  name: "LayTimelineItem",
};
</script>

<script setup lang="ts">
import { useSlots } from "vue";

export interface LayTimelineItemProps {
  title: string;
  simple?: boolean;
}

const slot = useSlots();

const props = defineProps<LayTimelineItemProps>();
</script>

<template>
  <li class="layui-timeline-item">
    <i class="layui-icon layui-timeline-axis" v-if="slot.dot">
      <slot name="dot"></slot>
    </i>
    <i class="layui-icon layui-timeline-axis" v-else></i>
    <div class="layui-timeline-content">
      <div v-if="simple" class="layui-timeline-title">
        {{ title }}
      </div>
      <h3 v-else class="layui-timeline-title">
        {{ title }}
      </h3>
      <slot></slot>
    </div>
  </li>
</template>
