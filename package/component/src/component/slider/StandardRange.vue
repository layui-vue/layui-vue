<script lang="ts">
export default {
  name: "StandardRange",
};
</script>

<script setup lang="ts">
import LayTooltip from "../tooltip/index.vue";
import { useSlider } from "./useSlider";

export interface StandardRangeProps {
  rangeValue: Array<number>;
  disabled?: boolean;
  step?: number;
  min?: number;
  max?: number;
  showDots?: boolean;
  isDark?: boolean;
  vertical?: boolean;
  formatTooltip?: Function | null;
}

const props = withDefaults(defineProps<StandardRangeProps>(), {
  step: 0,
  min: 0,
  max: 100,
  disabled: false,
  showDots: true,
  isDark: false,
  vertical: false
});

const emit = defineEmits(["link-val-hook"]);
const {
  sliderClick,
  rv,
  isDark,
  focusDot,
  handle_mousedown,
  dots,
  tooltipRefEl,
  tooltipRefEl2,
  tooptipHide,
  tracker,
  formatRangeValue,
} = useSlider(props, emit);
</script>

<template>
  <div
    ref="tracker"
    @mousedown="sliderClick"
    @touchstart="sliderClick"
    class="layui-slider-srange"
    :class="[disabled ? 'layui-slider-disabled' : '']"
  >
    <lay-tooltip
      :isDark="!isDark"
      ref="tooltipRefEl"
      :is-can-hide="tooptipHide"
    >
      <div
        :style="{
          left: ((rv[0] - props.min) / (props.max - props.min)) * 100 + '%',
        }"
        class="layui-slider-btn-v"
        @mousedown="handle_mousedown"
        :class="[props.disabled ? 'layui-slider-disabled disable-btn' : '']"
      ></div>
      <template #content>
        {{ formatRangeValue(rv[0]) }}
      </template>
    </lay-tooltip>

    <lay-tooltip
      :isDark="!isDark"
      ref="tooltipRefEl2"
      :is-can-hide="tooptipHide"
    >
      <div
        :style="{
          left: ((rv[1] - props.min) / (props.max - props.min)) * 100 + '%',
        }"
        class="layui-slider-btn-v"
        @mousedown="handle_mousedown"
        :class="[props.disabled ? 'layui-slider-disabled disable-btn' : '']"
      ></div>
      <template #content>
        {{ formatRangeValue(rv[1]) }}
      </template>
    </lay-tooltip>
    <div class="layui-slider-line-v"></div>
    <div
      :style="{
        width: ((rv[1] - rv[0]) / (props.max - props.min)) * 100 + '%',
        left: ((rv[0] - props.min) / (props.max - props.min)) * 100 + '%',
      }"
      class="layui-slider-rate-v"
      :class="[props.disabled ? 'layui-slider-disabled disable-line' : '']"
    ></div>
    <div
      v-show="showDots"
      @click="focusDot(item)"
      class="layui-slider-dots"
      v-for="(item, index) in dots"
      :key="index"
      :style="{
        left: ((item - props.min) / (props.max - props.min)) * 100 + '%',
      }"
    ></div>
  </div>
</template>
