<template>
  <div
    v-if="!isStart"
    :class="[!isStart ? 'lay-split-panel-line' : '']"
    :style="{ cursor: 'col-resize' }"
    ref="el"
    v-on="{ mousedown: mousedown, mouseup: mouseup }"
  ></div>
  <div :class="['lay-split-panel-item']">
    <slot> {{ parents.elementX }}{{ pressed }}</slot>
  </div>
</template>

<script setup name="laySplitPanelItem" lang="ts">
import {
  ref,
  inject,
  onMounted,
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  reactive,
  defineProps,
  withDefaults,
  watch,
} from "vue";

import type { ComputedRef } from "vue";

export interface LayStepItemProps {
  title?: string;
  content?: string;
  icon?: string;
  status?: string;
}

const props = withDefaults(defineProps<LayStepItemProps>(), {
  title: "",
  content: "",
  icon: "",
  status: "",
});

const index = ref(-1);
const parents: any = inject("laySplitPanel");
const currentInstance: any = getCurrentInstance();
const moveStatus = ref(false);
const setIndex = (val: number) => {
  index.value = val;
};

const mousedown = (event: any) => {
  moveStatus.value = true;
  const prevDomWidth = event.target.previousElementSibling.offsetWidth;
  const lineOffsetLeft = event.target.offsetLeft;
  parents.moveChange(event, true);

  console.log(prevDomWidth);
  console.log(lineOffsetLeft);
};

const mouseup = (event: any, index: any) => {
  moveStatus.value = false;
};

const stepsCount = computed(() => {
  return parents.steps.value.length;
});

const isVertical = computed(() => {
  return parents.props.direction === "vertical";
});

const isLast: ComputedRef<boolean> = computed(() => {
  return (
    parents.steps.value[stepsCount.value - 1]?.itemId === currentInstance.uid
  );
});

const isStart: ComputedRef<boolean> = computed(() => {
  return parents.steps.value[0]?.itemId === currentInstance.uid;
});

const stepItemState = reactive({
  itemId: computed(() => currentInstance?.uid),
  setIndex,
});

parents.steps.value = [...parents.steps.value, stepItemState];

onMounted(() => {});

onBeforeUnmount(() => {
  parents.steps.value = parents.steps.value.filter(
    (instance: { itemId: any }) => instance.itemId !== currentInstance.uid
  );
});
</script>
