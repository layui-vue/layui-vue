<template>
  <div
    :class="[
      'lay-step-item',
      isLast && !isCenter ? 'lay-step-item-last' : '',
      isCenter ? 'is-item-center' : '',
      isVertical ? 'is-vertical' : '',
    ]"
    :style="{ flexBasis: space, flexGrow: space === 'auto' ? 1 : 0 }"
  >
    <div
      :class="[
        !isLast
          ? isLineActive
            ? `lay-step-item-line lay-step-item-line-${status || 'active'}`
            : 'lay-step-item-line'
          : '',
        isCenter ? 'is-line-center' : '',
      ]"
    >
      <div
        :class="[
          'lay-step-item-pace',
          isActive ? `lay-step-item-active` : '',
          isCurrent === index ? `lay-step-item--${currentStatus}` : '',
          status ? `lay-step-item-${status}` : '',
          isWait ? 'lay-step-item-wait' : '',
          isCenter ? 'is-center' : '',
        ]"
      >
        <slot name="pace">
          <template v-if="icon">
            <lay-icon :type="icon"></lay-icon>
          </template>
          <template v-else>
            <span v-if="!isActive">{{ index + 1 }}</span>
            <lay-icon
              v-else
              :type="status === 'fail' ? 'layui-icon-close' : 'layui-icon-ok'"
            ></lay-icon>
          </template>
        </slot>
      </div>
    </div>
    <slot>
      <div
        :class="[
          'lay-step-item-content',
          isActive ? `lay-step-item-content-active` : '',
          isCurrent === index ? `lay-step-item-content--${currentStatus}` : '',
          status ? `lay-step-item-content-${status}` : '',
          isWait ? 'lay-step-item-content-wait' : '',
        ]"
      >
        <div class="lay-step-item-content-title">{{ title }}</div>
        <p>{{ content }}</p>
      </div>
    </slot>
  </div>
</template>

<script setup name="LayStepItem" lang="ts">
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
const parents: any = inject("LayStep");
const currentInstance: any = getCurrentInstance();
const setIndex = (val: number) => {
  index.value = val;
};

const stepsCount = computed(() => {
  return parents.steps.value.length;
});

const currentStatus = computed(() => {
  return parents.props.currentStatus;
});
const isCurrent = computed(() => {
  return parents.props.active;
});
console.log(isCurrent);
const space = computed(() => {
  return parents.props.space;
});

const isVertical = computed(() => {
  return parents.props.direction === "vertical";
});

const isCenter = computed(() => {
  return parents.props.center;
});

const isLineActive: ComputedRef<boolean> = computed(() => {
  return index.value <= parents.props.active - 1;
});

const isWait: ComputedRef<boolean> = computed(() => {
  return index.value === parents.props.active + 1;
});

const isActive: ComputedRef<boolean> = computed(() => {
  return index.value <= parents.props.active;
});
const isLast: ComputedRef<boolean> = computed(() => {
  return (
    parents.steps.value[stepsCount.value - 1]?.itemId === currentInstance.uid
  );
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
