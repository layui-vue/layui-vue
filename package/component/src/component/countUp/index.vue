<script lang="ts">
export default {
  name: "LayCountUp",
};
</script>

<script setup lang="ts">
import { computed, onMounted, Ref, ref, watch } from "vue";
import { TransitionPresets, useTransition } from "@vueuse/core";

export interface CountUpProps {
  startVal?: number; // 起始值
  endVal?: number; //显示的值
  decimal?: string; // 小数点
  decimalPlaces?: number; // 小数位数
  useGrouping?: boolean; // 是否使用千位分隔符
  separator?: string; // 千位分隔符
  autoplay?: boolean; //是否自动播放
  useEasing?: boolean; // 使用动画
  easingFn?: any; //动画类型
  duration?: number; // 动画持续时间
  prefix?: string; // 前缀
  suffix?: string; // 后缀
}

const props = withDefaults(defineProps<CountUpProps>(), {
  startVal: 0,
  endVal: 0,
  decimal: ".",
  decimalPlaces: 0,
  useGrouping: true,
  separator: ",",
  autoplay: true,
  useEasing: true,
  easingFn: TransitionPresets.easeInOutCubic,
  duration: 2000,
  prefix: "",
  suffix: "",
});

let localStartVal: Ref<number> = ref(props.startVal);
const isNumber = (val: string) => !isNaN(parseFloat(val));

/**
 * from: https://github.com/PanJiaChen/vue-countTo/blob/master/src/vue-countTo.vue
 * */
const formatNumber = (num: number | string): string => {
  if (typeof num != "number") return "0";
  num = num.toFixed(props.decimalPlaces);
  num += "";
  const x = num.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? props.decimal + x[1] : "";
  const rgx = /(\d+)(\d{3})/;
  if (props.useGrouping && props.separator && !isNumber(props.separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + props.separator + "$2");
    }
  }
  return props.prefix + x1 + x2 + props.suffix;
};

const printVal = useTransition(localStartVal, {
  delay: 0,
  duration: props.duration,
  disabled: !props.useEasing,
  transition:
    typeof props.easingFn === "string"
      ? // @ts-ignore
        TransitionPresets[props.easingFn]
      : props.easingFn,
});

const displayValue = computed(() => formatNumber(printVal.value));

const start = function () {
  localStartVal.value = props.endVal;
};

watch(
  () => props.endVal,
  () => {
    if (props.autoplay) {
      localStartVal.value = props.endVal;
    }
  }
);

onMounted(() => {
  if (props.autoplay) {
    start();
  }
});

defineExpose({
  start,
});
</script>

<template>
  <slot name="prefix"></slot>
  <span>{{ displayValue }}</span>
  <slot name="suffix"></slot>
</template>
