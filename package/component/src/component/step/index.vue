<script lang="ts">
export default {
  name: "LayStep",
};
</script>

<script setup lang="ts">
import { ref, watch, provide, withDefaults } from "vue";
import "./index.less";

export interface StepProps {
  active?: number;
  center?: boolean;
  direction?: string;
  space?: string;
  currentStatus?: string;
  composition?: string;
  simple?: boolean;
}

const props = withDefaults(defineProps<StepProps>(), {
  active: 0,
  center: false,
  direction: "horizontal",
  space: "auto",
  currentStatus: "success",
  composition: "default",
  simple: false,
});

const steps = ref([]);

const emits = defineEmits(["onChange"]);

const change = (index: any) => {
  emits("onChange", index - 1);
};

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
  change,
});
</script>

<template>
  <div :class="['lay-step', direction !== 'vertical' ? '' : 'lay-step-column']">
    <slot></slot>
  </div>
</template>
