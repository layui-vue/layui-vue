<script lang="ts">
export default {
  name: "LayTimeline",
};
</script>

<script setup lang="ts">
import "./index.less";
import { computed, withDefaults } from "vue";

export interface TimelineProps {
  direction?: "horizontal" | "vertical";
}

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
