<script lang="ts">
export default {
  name: "StandardVue",
};
</script>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { on, off } from "evtd";
import LayTooltip from "../tooltip/index.vue";
import { throttle, handle_select, makeDots } from "./utils/index";

export interface StandardProps {
  val?: number | Array<number>;
  disabled?: boolean;
  step?: number;
  min?: number;
  max?: number;
  showDots?: boolean;
}

const props = withDefaults(defineProps<StandardProps>(), {
  disabled: false,
  val: 0,
  step: 0,
  min: 0,
  max: 100,
  showDots: false,
});

const moveAction = throttle(standardMove);

function handle_mouseup() {
  off("selectstart", document, handle_select);
  off("mouseup", window, handle_mouseup);
  off("mousemove", window, moveAction);
  tooptipHide.value = true;
}

function handle_mousedown() {
  on("selectstart", window, handle_select, { once: true });
  on("mouseup", window, handle_mouseup);
  on("mousemove", window, moveAction);
}

const tracker = ref<HTMLElement | null>(null);
let standard_style: Ref<number> = ref<number>(props.val as number);
const emit = defineEmits(["link-val-hook"]);
const tooptipHide = ref<boolean>(true);

function standardMove(e: MouseEvent) {
  tooptipHide.value = false;
  if (!tracker.value) {
    return;
  }
  let tracker_rect = tracker.value.getBoundingClientRect();
  let origin_left = tracker_rect.left;
  let point_left = e.clientX;
  let distance = point_left - origin_left;
  if (distance < props.min) {
    standard_style.value = props.min;
  } else {
    let rate = (distance / tracker_rect.width) * 100;
    calcWithStep(rate, standard_style);
    if (standard_style.value > props.max) {
      standard_style.value = props.max;
    }
  }
  emit("link-val-hook", standard_style.value);
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
// 断点
const dots = makeDots(props);
const focusDot = (val: number) => {
  emit("link-val-hook", val);
};
</script>

<template>
  <div
    ref="tracker"
    @mousedown.stop="handle_mousedown"
    class="layui-slider-track-v"
    :class="[disabled ? 'layui-slider-disabled' : '']"
  >
    <lay-tooltip :content="'' + val" :is-can-hide="tooptipHide">
      <div
        :style="{ left: val + '%' }"
        class="layui-slider-btn-v"
        :class="[disabled ? 'layui-slider-disabled disable-btn' : '']"
      ></div>
    </lay-tooltip>

    <div
      :style="{ width: val + '%' }"
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
      :style="{ left: item + '%' }"
    ></div>
  </div>
</template>
