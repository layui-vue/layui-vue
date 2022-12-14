<script lang="ts">
export default {
  name: "LaySplitPanelItem",
};
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
  withDefaults,
} from "vue";

import type { ComputedRef } from "vue";

export interface StepItemProps {
  space?: string | number;
}

const props = withDefaults(defineProps<StepItemProps>(), {
  space: "",
});

const index = ref(-1);
const parents: any = inject("laySplitPanel");
const currentInstance: any = getCurrentInstance();
const moveStatus = ref(false);
const setIndex = (val: number) => {
  index.value = val;
};
const space = computed(() => {
  return /^\d+$/.test(props.space + "") ? props.space + "px" : props.space;
});

const mouseup = (event: any) => {
  moveStatus.value = false;
};

const stepsCount = computed(() => {
  return parents.steps.value.length;
});

const initSpace = (parentSpace: any, key: string) => {
  const childList = Array.from(parentElement.value.children);
  childList.forEach((item: any, index: number) => {
    if (index === 0 || index % 2 === 0) {
      item.style.flexBasis = (item[key] / parentSpace) * 100 + "%";
      item.style.flexGrow = 0;
    }
  });
};

const mousedown = (event: any) => {
  let parentSpace = 0;
  if (!isVertical.value) {
    parentSpace = parentElement.value.offsetWidth;
    initSpace(parentSpace, "offsetWidth");
  } else {
    parentSpace = parentElement.value.offsetHeight;
    initSpace(parentSpace, "offsetHeight");
  }

  moveStatus.value = true;
  parents.moveChange(event, true, isVertical.value);
};

const parentElement = computed(() => {
  return parents.target.value;
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
  space: space,
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
    ref="laySplitPanelItem"
    v-if="isVertical"
    :class="['lay-split-panel-item']"
    :style="{ flexBasis: space, flexGrow: space ? 0 : 1 }"
  >
    <slot></slot>
  </div>
  <div
    v-else
    :class="['lay-split-panel-item']"
    :style="{ flexBasis: space, flexGrow: space ? 0 : 1 }"
  >
    <slot></slot>
  </div>
</template>
