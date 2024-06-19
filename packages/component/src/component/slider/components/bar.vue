<!--
 * @Author: baobaobao
 * @Date: 2023-10-06 13:36:55
 * @LastEditTime: 2023-10-20 21:20:29
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
      :disabled="disabled"
      :position="placement"
      ref="tooltip"
    >
      <div class="layui-slider-handle-thumb" v-if="slot.thumb">
        <slot name="thumb"></slot>
      </div>
      <div class="layui-slider-handle-button" v-else></div>
      <template #content>
        <slot v-if="slot.custom" :value="formatValue" name="custom"> </slot>
        <slot v-else>
          {{ formatValue }}
        </slot>
      </template>
    </lay-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, toRefs, watch } from "vue";
import LayTooltip from "../../tooltip/index.vue";
import { useSliderProvide } from "../use-slider";
import { useSliderBar } from "./use-slider-bar";
export interface SliderBarProps {
  modelValue: number;
}

defineOptions({
  name: "LaySliderBar",
});
const emit = defineEmits(["update:modelValue"]);
const slot = useSlots();
const props = withDefaults(defineProps<SliderBarProps>(), {
  modelValue: 0,
});
const { tooltipProp, alwayShowTooltip } = useSliderProvide();
const { isDark, placement, disabled } = toRefs(tooltipProp);
const {
  dragging,
  wrapperStyle,
  formatValue,
  tooltip,
  setUpDatePos,
  handleDown,
} = useSliderBar(props, emit);

watch(
  () => [dragging, alwayShowTooltip, tooltip],
  () => {
    if (dragging.value) {
      tooltip.value?.show();
    } else {
      tooltip.value?.hide();
    }

    if (alwayShowTooltip!.value && tooltip) {
      tooltip.value?.show();
    }
  },
  { immediate: true, deep: true }
);

defineExpose({
  setUpDatePos,
});
</script>
