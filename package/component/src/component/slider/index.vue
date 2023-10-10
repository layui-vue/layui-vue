<!--
 * @Author: baobaobao
 * @Date: 2023-09-30 16:51:14
 * @LastEditTime: 2023-10-10 21:10:35
 * @LastEditors: baobaobao
-->
<template>
  <div
    :class="[
      'layui-slider',
      vertical ? 'layui-slider-vertical' : '',
      disabled ? 'is-disabled' : '',
    ]"
    ref="slider"
    @click="handClick"
  >
    <div class="layui-slider-bar" :style="barStyle"></div>
    <lay-slider-bar ref="laySliderBar1" v-model="firstVal">
      <template #thumb v-if="slot.thumb">
        <slot name="thumb"></slot>
      </template>
      <template #custom="value"  v-if="slot.custom">
        <slot name="custom" v-bind="value"></slot>
      </template>
    </lay-slider-bar>
    <lay-slider-bar ref="laySliderBar2" v-model="secondVal" v-if="range">
      <template #thumb v-if="slot.thumb">
        <slot name="thumb"></slot>
      </template>
      <template #custom="value"  v-if="slot.custom">
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
        <template  #mark="{mark}" v-if="slot.mark" >
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

import { computed, provide, toRefs, useSlots } from "vue";
import { LAYUI_SLIDER_KEY, useSlider } from "./useSlider";
import { useSliderMark } from "./components/use-slider-mark";
import { Mark } from './types/sliderType'
export interface SliderProps {
  vertical?: boolean;
  modelValue: number | Array<number>;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  range?: boolean;
  showDots?: boolean;
  isDark?: boolean;
  isCanHide?: boolean;
  isTips?: boolean;
  marks?: Record<number, any>;
  placement?: string;
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
  isDark: true,
  range: false,
  isTips: false,
  placement: 'top',
  isCanHide: true,
});
const emit = defineEmits(["update:modelValue"]);

const slot = useSlots();
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
} = useSlider(props, emit);
const { marksList } = useSliderMark(props);
provide(LAYUI_SLIDER_KEY, {
  ...toRefs(props),
  firstVal,
  secondVal,
  updateDragging,
  getCalcPos
});
const getDotOrMark = computed(() => {
  if (props.marks) {
    return marksList.value.reduce((init: number[], el: Mark) => {
      init.push(el.pos)
      return init
    }, [])
  }
  if (props.showDots) {
    return getStop.value;
  }
});
</script>
