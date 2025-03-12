<script setup lang="ts">
import {
  type ComponentInternalInstance,
  ref,
  inject,
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  shallowRef,
  reactive,
} from "vue";

import {
  type SplitPanelStepsType,
  SPLITPANEL_INJECTION_KEY,
} from "../splitPanel/interface";

interface StepItemProps {
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

const setIndex = (val: number) => {
  index.value = val;
};

const space = computed<string>(() => {
  return (
    /^\d+$/.test(props.space + "") ? props.space + "px" : props.space
  ) as string;
});

const stepItemState = reactive<SplitPanelStepsType>({
  itemId: computed(() => currentInstance?.uid),
  setIndex,
  space: space,
  itemEl: laySplitPanelItem,
}) as unknown as SplitPanelStepsType;

SplitPanelContext.steps.value.push(stepItemState);

onBeforeUnmount(() => {
  SplitPanelContext.steps.value = SplitPanelContext.steps.value.filter(
    (step) => step.itemId.value !== currentInstance.uid
  );
});
</script>

<template>
  <div ref="laySplitPanelItem" :class="['lay-split-panel-item']">
    <slot></slot>
  </div>
</template>
