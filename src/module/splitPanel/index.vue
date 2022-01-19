<template>
  <div
    ref="target"
    class="lay-split-panel"
    :style="{ cursor: domStatus ? 'col-resize' : '' }"
    v-on="{ mouseup: mouseup }"
  >
    <slot></slot>
  </div>
</template>

<script setup name="laySplitPanel" lang="ts">
import {
  ref,
  watch,
  provide,
  defineProps,
  withDefaults,
  defineEmits,
  onMounted,
} from "vue";
import "./index.less";

// 属性接口定义
export interface LayStepProps {
  active?: number;
}
// props初始化数据定义
const props = withDefaults(defineProps<LayStepProps>(), {
  active: 0,
});
let domEvent = ref();
let domStatus = ref(false);
let otherDom = ref(0);
const target = ref();

const divSetInterval = (width, event) => {
  console.log(width);
  const boxLeft = target.value.offsetLeft;
  const boxWidth = target.value.offsetWidth;
  const prevDom = domEvent.value.target.previousElementSibling;
  const nextDom = domEvent.value.target.nextElementSibling;
  const timer = setInterval(() => {
    const prevDomLeft = domEvent.value.target.previousElementSibling.offsetLeft;
    const lineOffsetLeft = domEvent.value.target.offsetLeft;
    prevDom.style.width = ((event.layerX - prevDomLeft) / boxWidth) * 100 + "%";
    nextDom.style.width =
      ((boxWidth - boxLeft - event.layerX - 5) / boxWidth) * 100 + "%";
    console.log(event.layerX, prevDomLeft);
  }, 100);
  if (prevDom?.clientWidth === width) {
    clearInterval(timer);
  }
};

onMounted(() => {
  const boxLeft = target.value.offsetLeft;
  const boxWidth = target.value.offsetWidth;
  const prevDomLeft = domEvent.value.target.previousElementSibling.offsetLeft;
  target.value.addEventListener("mousemove", (event: { layerX: any }) => {
    if (domStatus.value) {
      divSetInterval(event.layerX - prevDomLeft, event);
      console.log(event.layerX, prevDomLeft);
    }
  });
});

const moveChange = (event: any, status: boolean) => {
  domEvent.value = event;
  domStatus.value = status;
};

const mouseup = () => {
  domStatus.value = false;
};

// 绑定事件
const emits = defineEmits(["onChange"]);

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
