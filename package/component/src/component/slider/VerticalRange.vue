<script lang="ts">
export default {
  name: "VerticalRange",
};
</script>

<script setup lang="ts">
import LayTooltip from "../tooltip/index.vue";
import { useSlider } from "./useSlider";

export interface VerticalRangeProps {
  rangeValue: Array<number>;
  disabled?: boolean;
  step?: number;
  min?: number;
  max?: number;
  showDots?: boolean;
  isDark?: boolean;
  formatTooltip?: Function | null;
}

const props = withDefaults(defineProps<VerticalRangeProps>(), {
  step: 0,
  min: 0,
  max: 100,
  disabled: false,
  showDots: false,
  isDark: false,
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
  tooptipHide,
  tracker,
  formatRangeValue,
} = useSlider(props, emit);
</script>

<template>
  <div class="layui-slider-vertical">
    <div
      ref="tracker"
      @mousedown="sliderClick"
      @touchstart="sliderClick"
      class="layui-slider-vrange"
      :class="[disabled ? 'layui-slider-disabled' : '']"
    >
      <lay-tooltip
        :isDark="!isDark"
        ref="tooltipRefEl"
        :is-can-hide="tooptipHide"
      >
        <div
          :style="{
            bottom: ((rv[1] - props.min) / (props.max - props.min)) * 100 + '%',
          }"
          @mousedown="handle_mousedown"
          class="layui-slider-vertical-btn"
          :class="[props.disabled ? 'layui-slider-disabled disable-btn' : '']"
        ></div>
        <template #content>
          {{ formatRangeValue(rv[1]) }}
        </template>
      </lay-tooltip>

      <lay-tooltip
        :isDark="!isDark"
        ref="tooltipRefEl"
        :is-can-hide="tooptipHide"
      >
        <div
          :style="{
            bottom: ((rv[0] - props.min) / (props.max - props.min)) * 100 + '%',
          }"
          @mousedown="handle_mousedown"
          class="layui-slider-vertical-btn"
          :class="[props.disabled ? 'layui-slider-disabled disable-btn' : '']"
        ></div>
        <template #content>
          {{ formatRangeValue(rv[0]) }}
        </template>
      </lay-tooltip>

      <div class="layui-slider-vertical-line"></div>

      <div
        :style="{
          height: ((rv[1] - rv[0]) / (props.max - props.min)) * 100 + '%',
          bottom: ((rv[0] - props.min) / (props.max - props.min)) * 100 + '%',
        }"
        class="layui-slider-vertical-rate"
        :class="[props.disabled ? 'layui-slider-disabled disable-line' : '']"
      ></div>

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
