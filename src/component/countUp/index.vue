<template>
  <slot name="prefix"></slot>
  <span ref="counterRef" style="font-family:sans-serif;" />
  <slot name="suffix"></slot>
</template>

<script lang="ts">
export default {
  name: "LayCountUp",
};
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { CountUp } from 'countup.js'
import type { CountUpOptions } from 'countup.js'

export interface LayCountupProps {
  endVal?: number; //显示的值
  decimalPlaces?: number; // 小数位数
  useGrouping?: boolean; // 是否使用千位分隔符
  separator?: string; // 千位分隔符
  useEasing?: boolean; // 使用动画
  duration?: number; // 动画持续时间
  prefix?: string; // 前缀
  suffix?: string; // 后缀
  option?: CountUpOptions; // 选项
}

const props = withDefaults(defineProps<LayCountupProps>(), {
  endVal: 0,
  option: () => {
    return {}
  }
});

const counterRef = ref<HTMLDivElement | null>(null);
const instance = ref<CountUp | null>(null);
const {decimalPlaces,useGrouping,separator,useEasing,duration,prefix,suffix} = props;
const defaultOptions: CountUpOptions = {
  startVal: 0, // 开始数字
  decimalPlaces: decimalPlaces ? decimalPlaces : 0, // 小数位数
  useEasing: useEasing ? useEasing : true,  // 使用缓动动画
  duration: duration ? duration : 2, // 动画持续时间
  useGrouping: useGrouping ? useGrouping : true, // 是否使用千位分隔符
  separator:separator ? separator : ",", // 千位分隔符
  decimal:".", // 小数点分隔符
  prefix: prefix ? prefix : "", // 前缀
  suffix: suffix ? suffix : "", // 后缀
}

watch(
  () => props.endVal,
  () => {
    update(props.endVal)
  }
);

onMounted(() => {
  createCounter()
})

const createCounter = () => {
  if (!counterRef.value) return
  const opts: CountUpOptions = Object.assign(defaultOptions, props.option)
  instance.value = new CountUp(counterRef?.value, props.endVal, opts);
  start();
}

const start = () => {
  if (!instance.value) return
  instance?.value.start();
}

const update = (newEndVal: number) => {
  if (!instance.value) return
  instance?.value.update(newEndVal);
}

</script>
