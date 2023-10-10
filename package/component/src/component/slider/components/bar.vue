<!--
 * @Author: baobaobao
 * @Date: 2023-10-06 13:36:55
 * @LastEditTime: 2023-10-10 21:11:44
 * @LastEditors: baobaobao
-->
<template>
  <div
    class="layui-slider-handle"
    @mousedown="handleDown"
    :style="wrapperStyle"
  >
    <lay-tooltip
      :isDark="isDark"
      :disabled="isTips"
      :position="placement"
      ref="tooltip"
      :is-can-hide="isCanHide"
    >
      <div class="layui-slider-handle-thumb" v-if="slot.thumb">
        <slot name="thumb"></slot>
      </div>
      <div class="layui-slider-handle-button" v-else></div>
      <template #content>
        <slot v-if="slot.custom" :value="formatValue" name="custom"></slot>
        <slot v-else>
          {{ formatValue }}
        </slot>
      </template>
    </lay-tooltip>
  </div>
</template>
<script lang="ts">
export default {
  name: "LaySliderBar",
};
</script>
<script lang="ts" setup>
import {
  useSlots,
} from "vue";
import LayTooltip from "../../tooltip/index.vue";
import { useSliderProvide } from "../useSlider";
import { useSliderBar } from "./use-slider-bar";
export interface SliderBarProps {
  modelValue: number;
}
const emit = defineEmits(["update:modelValue"]);
const slot = useSlots();
const props = withDefaults(defineProps<SliderBarProps>(), {
  modelValue: 0,
});
const { isDark, placement, isTips, isCanHide } = useSliderProvide();
const {
  wrapperStyle,
  formatValue,
  tooltip,
  setUpDatePos,
  handleDown
} = useSliderBar(props, emit);
defineExpose({
  setUpDatePos,
});
</script>
