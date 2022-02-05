<script lang="ts">
export default {
  name: "LaySplitPanelItem"
}
</script>

<script setup lang="ts">
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
  space?: number;
}

const props = withDefaults(defineProps<LayStepItemProps>(), {
  space: 0,
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
  parents.moveChange(event, true);
};

const mouseup = (event: any) => {
  moveStatus.value = false;
};

const stepsCount = computed(() => {
  return parents.steps.value.length;
});

const isVertical = computed(() => {
  return parents.props.vertical;
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
  width: [],
});

parents.steps.value = [...parents.steps.value, stepItemState];

onMounted(() => {});

onBeforeUnmount(() => {
  parents.steps.value = parents.steps.value.filter(
    (instance: { itemId: any }) => instance.itemId !== currentInstance.uid
  );
});
</script>

<template>
  <div
    v-if="!isStart"
    :class="[!isStart ? 'lay-split-panel-line' : '']"
    ref="el"
    v-on="{ mousedown: mousedown, mouseup: mouseup }"
  ></div>
  <div
    v-if="isVertical"
    :class="['lay-split-panel-item']"
    :style="{ height: `${space ? space : (100 + space) / stepsCount}%` }"
  >
    <slot></slot>
  </div>
  <div
    v-else
    :class="['lay-split-panel-item']"
    :style="{ width: `${space ? space : (100 + space) / stepsCount}%` }"
  >
    <slot></slot>
  </div>
</template>