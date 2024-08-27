<script setup lang="ts">
import {
  ref,
  inject,
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  reactive,
} from "vue";

import type { ComputedRef } from "vue";
import type { SplitPanelStepsType } from "../splitPanel/interface";

export interface StepItemProps {
  space?: string | number;
}

defineOptions({
  name: "LaySplitPanelItem",
});

const props = withDefaults(defineProps<StepItemProps>(), {
  space: "",
});

const laySplitPanelItem = ref<HTMLDivElement | null>(null);
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

const mouseup = (event: MouseEvent) => {
  moveStatus.value = false;
};

const mousedown = (event: MouseEvent) => {
  moveStatus.value = true;
  parents.moveChange(event, true, isVertical.value);
};

const isVertical = computed(() => {
  return parents.props.vertical;
});

const isStart: ComputedRef<boolean> = computed(() => {
  return parents.steps.value[0]?.itemId === currentInstance.uid;
});

const stepItemState = reactive<SplitPanelStepsType>({
  itemId: computed(() => currentInstance?.uid),
  setIndex,
  space: space,
  itemEl: laySplitPanelItem,
});
parents.steps.value = [...parents.steps.value, stepItemState];

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
  >
    <slot></slot>
  </div>
  <div v-else ref="laySplitPanelItem" :class="['lay-split-panel-item']">
    <slot></slot>
  </div>
</template>
