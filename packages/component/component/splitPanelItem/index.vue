<script setup lang="ts">
import {
  ref,
  inject,
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  shallowRef,
  reactive,
  unref,
} from "vue";

import type { ComponentInternalInstance } from "vue";
import type { SplitPanelStepsType } from "../splitPanel/interface";
import { SPLITPANEL_INJECTION_KEY } from "../splitPanel/splitPanel";

export interface StepItemProps {
  space?: string | number;
}

defineOptions({
  name: "LaySplitPanelItem",
});

const props = withDefaults(defineProps<StepItemProps>(), {
  space: "",
});

const SplitPanelContext = inject(SPLITPANEL_INJECTION_KEY)!;

const laySplitPanelItem = shallowRef<HTMLDivElement | null>(null);
const index = ref(-1);
const currentInstance: ComponentInternalInstance = getCurrentInstance()!;
const moveStatus = ref(false);

const setIndex = (val: number) => {
  index.value = val;
};

const space = computed<string>(() => {
  return (
    /^\d+$/.test(props.space + "") ? props.space + "px" : props.space
  ) as string;
});

const mouseup = (event: MouseEvent) => {
  moveStatus.value = false;
};

const mousedown = (event: MouseEvent) => {
  moveStatus.value = true;
  SplitPanelContext.moveChange(event, true, isVertical.value);
};

const isVertical = computed(() => {
  return SplitPanelContext.props.vertical;
});

const isStart = computed(() => {
  return (
    unref(SplitPanelContext.steps.value[0]?.itemId) === currentInstance.uid
  );
});

const stepItemState = reactive<SplitPanelStepsType>({
  itemId: computed(() => currentInstance?.uid),
  setIndex,
  space: space,
  itemEl: laySplitPanelItem,
}) as unknown as SplitPanelStepsType;

SplitPanelContext.steps.value = [
  ...SplitPanelContext.steps.value,
  stepItemState,
];

onBeforeUnmount(() => {
  SplitPanelContext.steps.value = SplitPanelContext.steps.value.filter(
    (step) => step.itemId.value !== currentInstance.uid
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
