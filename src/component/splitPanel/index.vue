<script lang="ts">
export default {
  name: "laySplitPanel",
};
</script>

<script setup lang="ts">
import { ref, watch, provide, withDefaults, onMounted } from "vue";
import "./index.less";

export interface LayStepProps {
  vertical?: boolean;
  minSize?: number;
}

const props = withDefaults(defineProps<LayStepProps>(), {
  vertical: false,
  minSize: 50,
});

let domEvent = ref();
let domStatus = ref(false);
const target = ref();

onMounted(() => {
  const boxWidth = target.value.offsetWidth;
  const boxHeight = target.value.offsetHeight;
  window.addEventListener("scroll", (event) => {
    console.log(event);
  });
  target.value.addEventListener(
    "mousemove",
    (event: { layerX: any; layerY: any }) => {
      if (domStatus.value) {
        const prevDom = domEvent.value.target.previousElementSibling;
        const nextDom = domEvent.value.target.nextElementSibling;
        if (!props.vertical) {
          const prevDomLeft =
            domEvent.value.target.previousElementSibling.offsetLeft;
          const prevDomWidth =
            domEvent.value.target.previousElementSibling.offsetWidth;
          const nextDomWidth =
            domEvent.value.target.nextElementSibling.offsetWidth;
          const otherWidth = boxWidth - (prevDomWidth + nextDomWidth + 5);
          const otherWidthPercentage =
            ((prevDomWidth + nextDomWidth + 5) / boxWidth) * 100;
          if (
            event.layerX - prevDomLeft < props.minSize ||
            boxWidth - (event.layerX - prevDomLeft) - otherWidth < props.minSize
          ) {
            return false;
          }
          prevDom.style.width =
            ((event.layerX - prevDomLeft) / (prevDomWidth + nextDomWidth + 5)) *
              otherWidthPercentage +
            "%";
          nextDom.style.width =
            ((boxWidth - (event.layerX - prevDomLeft) - otherWidth) /
              (prevDomWidth + nextDomWidth + 5)) *
              otherWidthPercentage +
            "%";
        } else {
          const prevDomTop =
            domEvent.value.target.previousElementSibling.offsetTop;
          const prevDomHeight =
            domEvent.value.target.previousElementSibling.offsetHeight;
          const nextDomHeight =
            domEvent.value.target.nextElementSibling.offsetHeight;
          const otherHeight = boxHeight - (prevDomHeight + nextDomHeight + 5);
          const otherHeightPercentage =
            ((prevDomHeight + nextDomHeight + 5) / boxHeight) * 100;
          if (
            event.layerY - prevDomTop < props.minSize ||
            boxHeight - (event.layerY - prevDomTop) - otherHeight <
              props.minSize
          ) {
            return false;
          }
          prevDom.style.height =
            ((event.layerY - prevDomTop) /
              (prevDomHeight + nextDomHeight + 5)) *
              otherHeightPercentage +
            "%";
          nextDom.style.height =
            ((boxHeight - (event.layerY - prevDomTop) - otherHeight) /
              (prevDomHeight + nextDomHeight + 5)) *
              otherHeightPercentage +
            "%";
        }
      }
    }
  );
});

const moveChange = (event: any, status: boolean) => {
  domEvent.value = event;
  domStatus.value = status;
};

const mouseup = () => {
  domStatus.value = false;
};

// 定义初始化个数数组
const steps = ref([]);
// 监听有几个lay-split-panel-item
watch(steps, () => {
  steps.value.forEach(
    (instance: { setIndex: (arg0: any) => void }, index: any) => {
      instance.setIndex(index);
    }
  );
});

// 向lay-split-panel-item传递参数
provide("laySplitPanel", {
  props,
  steps,
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
