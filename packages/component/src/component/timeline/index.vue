<script setup lang="ts">
import "./index.less";
import { computed } from "vue";

export interface TimelineProps {
  direction?: "horizontal" | "vertical";
}

defineOptions({
  name: "LayTimeline",
});

const props = withDefaults(defineProps<TimelineProps>(), {
  direction: "vertical",
});

const timeLineClass = computed(() => [
  "layui-timeline",
  props.direction === "horizontal" ? "layui-timeline-horizontal" : "",
]);
</script>

<template>
  <ul :class="timeLineClass">
    <slot></slot>
  </ul>
</template>
