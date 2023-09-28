<script lang="ts">
export default {
  name: "StandardVue",
};
</script>

<script setup lang="ts">
import {useSlots} from 'vue'
import LayTooltip from "../tooltip/index.vue";
import { useSlider } from "./useSlider";
export interface StandardProps {
  val?: number | Array<number>;
  disabled?: boolean;
  step?: number;
  min?: number;
  max?: number;
  showDots?: boolean;
  isDark?: boolean;
  formatTooltip?: Function | null;
}

const props = withDefaults(defineProps<StandardProps>(), {
  disabled: false,
  val: 0,
  step: 0,
  min: 0,
  max: 100,
  showDots: false,
  isDark: false,
});
const slot = useSlots()
const emit = defineEmits(["link-val-hook"]);
const {
  sliderClick,
  focusDot,
  isDark,
  handle_mousedown,
  dots,
  tooltipRefEl,
  tooptipHide,
  tracker,
  formatValue,
} = useSlider(props, emit);
</script>

<template>
  <div
    ref="tracker"
    @mousedown="sliderClick"
    @touchstart="sliderClick"
    class="layui-slider-track-v"
    :class="[disabled ? 'layui-slider-disabled' : '']"
  >
    <lay-tooltip :isDark="isDark" ref="tooltipRefEl" :is-can-hide="tooptipHide">
      <div
        :style="{ left: ((val as number - props.min) / (props.max - props.min)) * 100 + '%' }"
        class="layui-slider-btn-v"
        @mousedown="handle_mousedown"
        :class="[disabled ? 'layui-slider-disabled disable-btn' : '']"
      ></div>
      <template #content>
        {{ formatValue }}
      </template>
    </lay-tooltip>

    <div
      :style="{ width: ((val as number - props.min) / (props.max - props.min)) * 100 + '%' }"
      class="layui-slider-rate-v"
      :class="[disabled ? 'layui-slider-disabled disable-line' : '']"
    ></div>
    <div class="layui-slider-line-v"></div>
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
