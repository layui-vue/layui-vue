<!--
 * @Author: baobaobao
 * @Date: 2023-09-23 21:45:37
 * @LastEditTime: 2023-09-28 17:15:05
 * @LastEditors: baobaobao
-->
<script lang="ts">
export default {
  name: "Vertical",
};
</script>

<script setup lang="ts">
import LayTooltip from "../tooltip/index.vue";
import { useSlider } from "./useSlider";

export interface VerticalProps {
  val?: number | Array<number>;
  disabled?: boolean;
  step?: number;
  min?: number;
  max?: number;
  showDots: boolean;
  isDark?: boolean;
  formatTooltip?: Function | null;
}

const props = withDefaults(defineProps<VerticalProps>(), {
  disabled: true,
  val: 0,
  step: 0,
  min: 0,
  max: 100,
  showDots: false,
  isDark: false,
});
const emit = defineEmits(["link-val-hook"]);
const {
  sliderClick,
  isDark,
  focusDot,
  handle_mousedown,
  dots,
  tooltipRefEl,
  tooptipHide,
  tracker,
  formatValue,
} = useSlider(props, emit);
</script>

<template>
  <div class="layui-slider-vertical">
    <div
      @mousedown="sliderClick"
      @touchstart="sliderClick"
      ref="tracker"
      :class="[disabled ? 'layui-slider-disabled' : '']"
      class="layui-slider-vertical-track"
    >
      <lay-tooltip
        :isDark="isDark"
        ref="tooltipRefEl"
        :is-can-hide="tooptipHide"
      >
        <div
          @mousedown="handle_mousedown"
          :style="{ bottom: ((val as number - props.min) / (props.max - props.min)) * 100 + '%' }"
          :class="[props.disabled ? 'layui-slider-disabled disable-btn' : '']"
          class="layui-slider-vertical-btn"
        ></div>
        <template #content>
          {{ formatValue }}
        </template>
      </lay-tooltip>
      <div
        :style="{ height: ((val as number - props.min) / (props.max - props.min)) * 100 + '%' }"
        :class="[props.disabled ? 'layui-slider-disabled disable-line' : '']"
        class="layui-slider-vertical-rate"
      ></div>
      <div class="layui-slider-vertical-line"></div>
      <div
        v-show="showDots"
        @click="focusDot(item)"
        class="layui-slider-vertical-dots"
        v-for="(item, index) in dots"
        :key="index"
        :style="{
          bottom: ((item - props.min) / (props.max - props.min)) * 100 + '%',
        }"
      ></div>
    </div>
  </div>
</template>
