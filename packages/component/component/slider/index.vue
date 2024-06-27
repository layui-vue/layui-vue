<!--
 * @Author: baobaobao
 * @Date: 2023-09-30 16:51:14
 * @LastEditTime: 2023-10-23 09:23:25
 * @LastEditors: baobaobao
-->
<template>
  <div
    :class="[
      'layui-slider',
      {
        'layui-slider-horizontal': !vertical,
        'layui-slider-vertical': vertical,
        'is-disabled': disabled,
        'is-reverse': reverse,
      },
    ]"
    ref="slider"
    @click="handClick"
  >
    <div class="layui-slider-bar" :style="barStyle"></div>
    <lay-slider-bar ref="laySliderBar1" v-model="firstVal">
      <template #thumb v-if="slot.thumb">
        <slot name="thumb"></slot>
      </template>
      <template #custom="value" v-if="slot.custom">
        <slot name="custom" v-bind="value"></slot>
      </template>
    </lay-slider-bar>
    <lay-slider-bar ref="laySliderBar2" v-model="secondVal" v-if="range">
      <template #thumb v-if="slot.thumb">
        <slot name="thumb"></slot>
      </template>
      <template #custom="value" v-if="slot.custom">
        <slot name="custom" v-bind="value"></slot>
      </template>
    </lay-slider-bar>
    <div class="layui-slider-stops" v-if="showDots || marksList.length > 0">
      <div
        class="layui-slider-stop"
        v-for="dot of getDotOrMark"
        :key="dot"
        :style="dotStyle(dot)"
      ></div>
    </div>
    <div class="layui-slider-mark" v-if="marksList && marksList.length > 0">
      <lay-slider-mark
        :mark="marks.mark"
        :style="dotStyle(marks.pos)"
        v-for="marks of marksList"
        :key="marks.pos"
      >
        <template #mark="{ mark }" v-if="slot.mark">
          <slot name="mark" v-bind="mark"></slot>
        </template>
      </lay-slider-mark>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "./index.less";

import type { SliderProps as _SliderProps } from "./types/sliderType";

import laySliderBar from "./components/bar.vue";
import LaySliderMark from "./components/mark.vue";

import { computed, provide, toRefs, useSlots } from "vue";
import { LAYUI_SLIDER_KEY, useSlider } from "./use-slider";
import { useSliderMark } from "./components/use-slider-mark";
import { Mark } from "./types/sliderType";

export type SliderProps = _SliderProps;

defineOptions({
  name: "LaySlider",
});

const props = withDefaults(defineProps<SliderProps>(), {
  vertical: false,
  modelValue: 0,
  disabled: false,
  step: 1,
  min: 0,
  max: 100,
  showDots: false,
  range: false,
  reverse: false,
  isFollowMark: true,
  rangeValue: () => [],
  tooltipProps: () => ({
    disabled: false,
    placement: "top",
    isDark: false,
  }),
  alwayShowTooltip: false,
});

const emit = defineEmits(["update:modelValue", "update:rangeValue", "change"]);

const slot = useSlots();
const { marksList, getSortMarks } = useSliderMark(props);
const {
  handClick,
  barStyle,
  firstVal,
  secondVal,
  slider,
  laySliderBar1,
  laySliderBar2,
  dotStyle,
  getStop,
  getCalcPos,
  updateDragging,
  tooltipProp,
} = useSlider(props, emit, getSortMarks);

provide(LAYUI_SLIDER_KEY, {
  ...toRefs(props),
  tooltipProp,
  firstVal,
  secondVal,
  updateDragging,
  getCalcPos,
});
const getDotOrMark = computed(() => {
  if (props.marks) {
    return marksList.value.reduce((init: number[], el: Mark) => {
      init.push(el.pos);
      return init;
    }, []);
  }
  if (props.showDots) {
    return getStop.value;
  }
  return [];
});
</script>
