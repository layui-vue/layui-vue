<script lang="ts">
export default {
  name: "LayStepItem",
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
import { LayIcon } from "@layui/icons-vue";
import type { ComputedRef } from "vue";

export interface StepItemProps {
  title?: string;
  content?: string;
  icon?: string;
  status?: string;
}

const props = withDefaults(defineProps<StepItemProps>(), {
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

const onChange = (index: any) => {
  parents.change(index);
};

const stepsCount = computed(() => {
  return parents.steps.value.length;
});

const currentStatus = computed(() => {
  return parents.props.currentStatus;
});

const simple = computed(() => {
  return parents.props.simple;
});

const composition = computed(() => {
  return parents.props.composition;
});
const isCurrent = computed(() => {
  return parents.props.active;
});

const isCurrentBorder = computed(() => {
  return parents.props.active + 1;
});
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

const isSimpleActive: ComputedRef<boolean> = computed(() => {
  return index.value - 1 <= parents.props.active;
});

const isActive: ComputedRef<boolean> = computed(() => {
  return index.value <= parents.props.active;
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

<template>
  <div
    v-if="!simple"
    :class="[
      'lay-step-item',
      isLast && !isCenter && composition !== 'row' ? 'lay-step-item-last' : '',
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
        @click="onChange(index + 1)"
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
    <div
      :class="[
        'lay-step-item-content',
        composition === 'row' ? 'lay-step-item-content-row' : '',
        isActive ? `lay-step-item-content-active` : '',
        isCurrent === index ? `lay-step-item-content--${currentStatus}` : '',
        status ? `lay-step-item-content-${status}` : '',
        isWait ? 'lay-step-item-content-wait' : '',
      ]"
      @click="onChange(index + 1)"
    >
      <slot>
        <div class="lay-step-item-content-title">{{ title }}</div>
        <p>{{ content }}</p>
      </slot>
    </div>
  </div>
  <div
    v-else
    :class="[
      'lay-step-item',
      'lay-step-simple',
      !isStart ? 'lay-step-item-simple' : '',
      'lay-step-item-simple-border',
      isActive ? 'lay-step-item-simple-active' : '',
      isCurrent === index ? `lay-step-item-simple-${currentStatus}` : '',
      isCurrentBorder === index
        ? `lay-step-item-simple-${currentStatus}-border`
        : '',
      isSimpleActive ? 'lay-step-item-simple-active-border' : '',
    ]"
    @click="onChange(index + 1)"
  >
    <slot>{{ index + 1 }}.{{ title }}</slot>
  </div>
</template>
