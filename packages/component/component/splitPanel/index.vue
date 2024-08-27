<script setup lang="ts">
import { ref, watch, provide } from "vue";
import "./index.less";

import type { StepProps as _StepProps, SplitPanelStepsType } from "./interface";

import { useMousePressed } from "@vueuse/core";

export type StepProps = _StepProps;

defineOptions({
  name: "LaySplitPanel",
});

const props = withDefaults(defineProps<StepProps>(), {
  vertical: false,
  minSize: 50,
});

// line el width
const LINE_WIDTH = 3;

const target = ref();
const { pressed } = useMousePressed({ target: target });

let domEvent = ref();
let domStatus = ref(pressed);
let parentVertical = ref();

const handleMousemove = (event: MouseEvent) => {
  const boxWidth = target.value.offsetWidth;
  const boxHeight = target.value.offsetHeight;
  const { left: boxLeft, top: boxTop } = target.value.getBoundingClientRect();

  if (window.getSelection != undefined) {
    window.getSelection()?.removeAllRanges();
  }
  if (domStatus.value && domEvent.value) {
    const prevDom = domEvent.value.target.previousElementSibling;
    const nextDom = domEvent.value.target.nextElementSibling;
    if (!props.vertical) {
      const _x = event.clientX - boxLeft;

      const prevDomLeft =
        domEvent.value.target.previousElementSibling.offsetLeft;
      const prevDomWidth =
        domEvent.value.target.previousElementSibling.offsetWidth;
      const nextDomWidth = domEvent.value.target.nextElementSibling.offsetWidth;
      const otherWidth = boxWidth - (prevDomWidth + nextDomWidth + LINE_WIDTH);
      const otherWidthPercentage =
        ((prevDomWidth + nextDomWidth + LINE_WIDTH) / boxWidth) * 100;
      if (
        _x - prevDomLeft < props.minSize ||
        boxWidth - (_x - prevDomLeft) - otherWidth < props.minSize
      ) {
        return false;
      }
      prevDom.style.flexBasis =
        ((_x - prevDomLeft) / (prevDomWidth + nextDomWidth + LINE_WIDTH)) *
          otherWidthPercentage +
        "%";
      nextDom.style.flexBasis =
        ((boxWidth - (_x - prevDomLeft) - otherWidth) /
          (prevDomWidth + nextDomWidth + LINE_WIDTH)) *
          otherWidthPercentage +
        "%";
    } else {
      const _y = event.clientY - boxTop;

      const prevDomTop = domEvent.value.target.previousElementSibling.offsetTop;
      const prevDomHeight =
        domEvent.value.target.previousElementSibling.offsetHeight;
      const nextDomHeight =
        domEvent.value.target.nextElementSibling.offsetHeight;
      const otherHeight =
        boxHeight - (prevDomHeight + nextDomHeight + LINE_WIDTH);
      const otherHeightPercentage =
        ((prevDomHeight + nextDomHeight + 5) / boxHeight) * 100;
      if (
        _y - prevDomTop < props.minSize ||
        boxHeight - (_y - prevDomTop) - otherHeight < props.minSize
      ) {
        return false;
      }

      prevDom.style.flexBasis =
        ((_y - prevDomTop) / (prevDomHeight + nextDomHeight + LINE_WIDTH)) *
          otherHeightPercentage +
        "%";
      nextDom.style.flexBasis =
        ((boxHeight - (_y - prevDomTop) - otherHeight) /
          (prevDomHeight + nextDomHeight + 5)) *
          otherHeightPercentage +
        "%";
    }
  }
};

const moveChange = (event: any, status: boolean, isVertical: boolean) => {
  domEvent.value = event;
  domStatus.value = status;
  parentVertical.value = isVertical;
  target.value.addEventListener("mousemove", handleMousemove);
};

const mouseup = () => {
  domStatus.value = false;
  domEvent.value = null;
  parentVertical.value = false;
  target.value.removeEventListener("mousemove", handleMousemove);
};

// 定义初始化个数数组
const steps = ref<SplitPanelStepsType[]>([]);

// 监听有几个lay-split-panel-item
watch(
  () => steps.value,
  (newVal) => {
    // 所有设置了space props的总数
    const spaces = newVal
      .filter((step) => step.space)
      .map((step) => step.space);

    const spaceLength = spaces.join(" - ") || "0px";
    const other = newVal.length - spaces.length;

    newVal.forEach((step, index) => {
      step.setIndex(index);

      if (step.space) {
        step.itemEl!.style.flexBasis = `calc(${step.space} - ${LINE_WIDTH}px)`;
      } else {
        // 没有设置space 计算逻辑
        // ((总宽度 - 总spaces) / 没有设置space数量) = 剩下位置平分
        step.itemEl!.style.flexBasis = `calc(((100% - ${spaceLength}) / ${other}) - ${LINE_WIDTH}px)`;
      }
    });
  },
  { flush: "post" }
);

// 向lay-split-panel-item传递参数
provide("laySplitPanel", {
  props,
  steps,
  target,
  moveChange,
});
</script>

<template>
  <div
    ref="target"
    :class="['lay-split-panel', vertical ? 'lay-split-panel-vertical' : '']"
    :style="{
      cursor: domStatus ? (!vertical ? 'col-resize' : 'row-resize') : '',
    }"
    v-on="{ mouseup: mouseup }"
  >
    <slot></slot>
  </div>
</template>
