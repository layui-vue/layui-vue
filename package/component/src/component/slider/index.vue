<!--
 * @Author: baobaobao
 * @Date: 2023-09-30 16:51:14
 * @LastEditTime: 2023-10-13 15:37:10
 * @LastEditors: baobaobao
-->
<template>
  <div
    :class="[
      'layui-slider', {
        'layui-slider-vertical': vertical,
        'is-disabled':disabled,
        'is-reverse': reverse
      }
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
<script lang="ts">
export default {
  name: "LaySlider",
};
</script>
<script lang="ts" setup>
import "./index.less";
import laySliderBar from "./components/bar.vue";
import LaySliderMark from "./components/mark.vue";

import { computed, provide, reactive, Ref, ref, toRefs, useSlots, watch } from "vue";
import { LAYUI_SLIDER_KEY, useSlider } from "./useSlider";
import { useSliderMark } from "./components/use-slider-mark";
import { Mark } from "./types/sliderType";

export interface SliderProps {
  vertical?: boolean;
  modelValue?: number | Array<number>;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  range?: boolean;
  showDots?: boolean;
  isFollowMark?: boolean;
  reverse?: boolean;
  rangeValue?: number[];
  tooltipProps?: Record<string, boolean | string>;
  marks?: Record<number, any>;
  formatTooltip?: (val: number) => number | string;
}

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
    isCanHide: true,
    disabled: false,
    placement: "top",
    isDark: false,
  }),
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
  // calcRange
} = useSlider(props, emit, getSortMarks);
provide(LAYUI_SLIDER_KEY, {
  ...toRefs(props),
  // ...toRefs(calcRange),
  tooltipProp,
  firstVal,
  secondVal,
  updateDragging,
  getCalcPos
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
});
</script>
