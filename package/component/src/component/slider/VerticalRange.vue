<script lang="ts">
export default {
  name: "VerticalRange",
};
</script>

<script setup lang="ts">
import { ref, toRef, Ref } from "vue";
import { on, off } from "evtd";
import LayTooltip from "../tooltip/index.vue";
import { throttle, makeDots } from "./utils/index";

export interface VerticalRangeProps {
  rangeValue: Array<number>;
  disabled?: boolean;
  step?: number;
  min?: number;
  max?: number;
  showDots?: boolean;
}

const props = withDefaults(defineProps<VerticalRangeProps>(), {
  step: 0,
  min: 0,
  max: 100,
  disabled: false,
  showDots: false,
});

let rv = toRef(props, "rangeValue");

const moveAction = throttle(rangeMove);
let currbtn = -1;
function handle_mousedown() {
  currbtn = -1;
  tooptipHide.value = false;
  on("selectstart", window, handle_select, { once: true });
  on("mouseup", window, handle_mouseup);
  on("mousemove", window, moveAction);
}

function handle_mouseup() {
  tooptipHide.value = true;
  off("selectstart", document, handle_select);
  off("mouseup", window, handle_mouseup);
  off("mousemove", window, moveAction);
}
function handle_select(e: Event): void {
  e.preventDefault();
}

const tracker = ref<HTMLElement | null>(null);
const emit = defineEmits(["link-val-hook"]);

const tooptipHide = ref<boolean>(true);

function rangeMove(e: MouseEvent) {
  // tooptipHide.value = false;
  if (!tracker.value) {
    return;
  }
  let tracker_rect = tracker.value.getBoundingClientRect();
  let origin_bottom = tracker_rect.bottom;
  let point_bottom = e.clientY;
  let distance = (point_bottom - origin_bottom) * -1;
  if (distance < props.min) {
    rv.value[0] = props.min;
  } else {
    let rate = (distance / tracker_rect.height) * 100;
    let idx = -1;
    if (currbtn === -1) {
      currbtn = moveNeighbors(Math.floor(rate), rv);
      idx = currbtn;
    } else {
      idx = currbtn;
    }

    calcWithStep(rate, rv, idx);
    if (rv.value[1] > props.max) {
      rv.value[1] = props.max;
    }
    if (rv.value[0] < props.min) {
      rv.value[0] = props.min;
    }
  }
  emit("link-val-hook", rv.value);
}

function moveNeighbors(rate: number, rangeValues: any) {
  let d1 = Math.abs(rate - rangeValues.value[0]);
  let d2 = Math.abs(rate - rangeValues.value[1]);
  if (d1 > d2) {
    return 1;
  } else {
    return 0;
  }
}

function calcWithStep(
  rate: number | undefined,
  val: Ref<number> | Ref<number[]>,
  idx: number = -1
) {
  if (typeof rate === "undefined") return false;

  if (typeof val.value === "object") {
    let r = rate - val.value[idx];
    if (Math.abs(r) < props.step) {
      return false;
    }

    if (props.step === 0) val.value[idx] = Math.floor(rate);

    if (Array.isArray(val.value)) {
      if (r < 0 && props.step !== 0) {
        val.value[idx] -= props.step;
      } else {
        val.value[idx] += props.step;
      }
      cross(val);
    }
  }
}

function cross(val: any) {
  if (val.value[0] > val.value[1]) {
    let tmp = val.value[0];
    val.value[0] = val.value[1];
    val.value[1] = tmp;
    currbtn = currbtn === 0 ? 1 : 0;
  }
}
// 断点
const dots = makeDots(props);

const focusDot = (item: number) => {
  let currbtn = moveNeighbors(item, rv);
  rv.value[currbtn] = item;
  emit("link-val-hook", rv.value);
};
</script>

<template>
  <div class="layui-slider-vertical">
    <div
      ref="tracker"
      @mousedown.stop="handle_mousedown"
      class="layui-slider-vrange"
      :class="[disabled ? 'layui-slider-disabled' : '']"
    >
      <lay-tooltip :content="'' + rv[1]" :is-can-hide="tooptipHide">
        <div
          :style="{ bottom: rv[1] + '%' }"
          class="layui-slider-vertical-btn"
          :class="[props.disabled ? 'layui-slider-disabled disable-btn' : '']"
        ></div>
      </lay-tooltip>

      <lay-tooltip :content="'' + rv[0]" :is-can-hide="tooptipHide">
        <div
          :style="{ bottom: rv[0] + '%' }"
          class="layui-slider-vertical-btn"
          :class="[props.disabled ? 'layui-slider-disabled disable-btn' : '']"
        ></div>
      </lay-tooltip>

      <div class="layui-slider-vertical-line"></div>
      <div
        :style="{
          height: rv[1] - rv[0] + '%',
          bottom: rv[0] + '%',
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
        :style="{ bottom: item + '%' }"
      ></div>
    </div>
  </div>
</template>
