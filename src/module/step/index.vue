<template>
  <div :class="['lay-step', direction !== 'vertical' ? '' : 'lay-step-column']">
    <slot></slot>
  </div>
</template>

<script setup name="layStep" lang="ts">
import { ref, watch, provide, defineProps, withDefaults } from "vue";
import "./index.less";

export interface LayStepProps {
  active?: number;
  center?: boolean;
  direction?: string;
  space?: string;
  currentStatus?: string;
}

const props = withDefaults(defineProps<LayStepProps>(), {
  active: 0,
  center: false,
  direction: "horizontal",
  space: "auto",
  currentStatus: "primary",
});

const steps = ref([]);

watch(steps, () => {
  steps.value.forEach(
    (instance: { setIndex: (arg0: any) => void }, index: any) => {
      instance.setIndex(index);
    }
  );
});

provide("LayStep", {
  props,
  steps,
});
</script>

<style scoped></style>
