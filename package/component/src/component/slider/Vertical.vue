<script lang="ts">
export default {
  name: "Vertical",
};
</script>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { on, off } from "evtd";
import LayTooltip from "../tooltip/index.vue";
import { makeDots } from "./utils";

export interface VerticalProps {
  val?: number | Array<number>;
  disabled?: boolean;
  step?: number;
  min?: number;
  max?: number;
  showDots: boolean;
}

const props = withDefaults(defineProps<VerticalProps>(), {
  disabled: true,
  val: 0,
  step: 0,
  min: 0,
  max: 100,
  showDots: false,
});

function handle_mouseup() {
  off("selectstart", document, handle_select);
  off("mouseup", window, handle_mouseup);
  off("mousemove", window, verticalMove);
  tooptipHide.value = true;
}
function handle_select(e: Event): void {
  e.preventDefault();
}

function handle_mousedown() {
  on("selectstart", window, handle_select, { once: true });
  on("mouseup", window, handle_mouseup);
  on("mousemove", window, verticalMove);
}

const tracker = ref<HTMLElement | null>(null);
let vertical_style: Ref<number> = ref<number>(props.val as number);
const emit = defineEmits(["link-val-hook"]);
const tooptipHide = ref<boolean>(true);

function verticalMove(e: MouseEvent) {
  tooptipHide.value = false;
  if (!tracker.value) {
    return;
  }
  let tracker_rect = tracker.value.getBoundingClientRect();
  let origin_bottom = tracker_rect.bottom;
  let point_bottom = e.clientY;
  let distance = (point_bottom - origin_bottom) * -1;
  if (distance < 0) {
    vertical_style.value = props.min;
  } else {
    let rate =
      props.min + (distance / tracker_rect.height) * (props.max - props.min);
    calcWithStep(rate, vertical_style);
    if (vertical_style.value > props.max) {
      vertical_style.value = props.max;
    }
  }
  emit("link-val-hook", vertical_style.value);
}

function calcWithStep(
  rate: number | undefined,
  val: Ref<number> | Ref<number[]>
) {
  if (typeof rate === "undefined") return false;

  if (typeof val.value === "number") {
    let r = rate - val.value;
    if (Math.abs(r) < props.step) {
      return false;
    }

    if (props.step === 0) val.value = Math.floor(rate);

    if (r < 0 && props.step !== 0) {
      val.value -= props.step;
    } else {
      val.value += props.step;
    }
  }
}

const dots = makeDots(props);

const focusDot = (val: number) => {
  emit("link-val-hook", val);
};
</script>

<template>
  <div class="layui-slider-vertical">
    <div
      @mousedown.stop="handle_mousedown"
      ref="tracker"
      :class="[disabled ? 'layui-slider-disabled' : '']"
      class="layui-slider-vertical-track"
    >
      <lay-tooltip :content="'' + val" :is-can-hide="tooptipHide">
        <div
          :style="{ bottom: ((val as number - props.min) / (props.max - props.min)) * 100 + '%' }"
          :class="[props.disabled ? 'layui-slider-disabled disable-btn' : '']"
          class="layui-slider-vertical-btn"
        ></div>
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
