<template>
  <div class="layui-slider-vertical" v-if="vertical">
    <div
      ref="rangetracker2"
      @mousedown.stop="handle_mousedown"
      class="layui-slider-vrange"
      v-if="range"
    >
      <lay-tooltip
        :content="'' + verticalRangeValue[1]"
        :is-can-hide="tooptipHide"
      >
        <div
          :style="{ bottom: verticalRangeValue[1] + '%' }"
          class="layui-slider-vertical-btn"
        ></div>
      </lay-tooltip>
      <lay-tooltip
        :content="'' + verticalRangeValue[0]"
        :is-can-hide="tooptipHide"
      >
        <div
          :style="{ bottom: verticalRangeValue[0] + '%' }"
          class="layui-slider-vertical-btn"
        ></div>
      </lay-tooltip>

      <div class="layui-slider-vertical-line"></div>
      <div
        :style="{
          height: verticalRangeValue[1] - verticalRangeValue[0] + '%',
          bottom: verticalRangeValue[0] + '%',
        }"
        class="layui-slider-vertical-rate"
      ></div>
    </div>

    <div
      ref="verticaltracker"
      @mousedown.stop="handle_mousedown"
      class="layui-slider-vertical-track"
      :class="[props.disabled ? 'layui-slider-disabled' : '']"
      v-else
    >
      <lay-tooltip :content="modelValue + ''" :is-can-hide="tooptipHide">
        <div
          :style="{ bottom: modelValue + '%' }"
          class="layui-slider-vertical-btn"
          :class="[props.disabled ? 'layui-slider-disabled' : '']"
        ></div>
      </lay-tooltip>
      <div
        :style="{ height: modelValue + '%' }"
        class="layui-slider-vertical-rate"
        :class="[props.disabled ? 'layui-slider-disabled-rate' : '']"
      ></div>
      <div class="layui-slider-vertical-line"></div>
    </div>
  </div>

  <div class="layui-slider-v" v-else>
    <div
      @mousedown.stop="handle_mousedown"
      ref="rangetracker1"
      class="layui-slider-srange"
      v-if="range"
    >
      <lay-tooltip :content="rangeValue[0] + ''" :is-can-hide="tooptipHide">
        <div
          :style="{ left: rangeValue[0] + '%' }"
          class="layui-slider-btn-v"
        ></div>
      </lay-tooltip>
      <lay-tooltip :content="rangeValue[1] + ''" :is-can-hide="tooptipHide">
        <div
          :style="{ left: rangeValue[1] + '%' }"
          class="layui-slider-btn-v"
        ></div>
      </lay-tooltip>

      <div class="layui-slider-line-v"></div>
      <div
        :style="{
          width: rangeValue[1] - rangeValue[0] + '%',
          left: rangeValue[0] + '%',
        }"
        class="layui-slider-rate-v"
      ></div>
    </div>

    <div
      ref="standardtracker"
      @mousedown.stop="handle_mousedown"
      class="layui-slider-track-v"
      :class="[props.disabled ? 'layui-slider-disabled' : '']"
      v-else
    >
      <lay-tooltip :content="'' + modelValue" :is-can-hide="tooptipHide">
        <div
          :style="{ left: modelValue + '%' }"
          class="layui-slider-btn-v"
          :class="[props.disabled ? 'layui-slider-disabled' : '']"
        ></div>
      </lay-tooltip>
      <div
        :style="{ width: modelValue + '%' }"
        class="layui-slider-rate-v"
        :class="[props.disabled ? 'layui-slider-disabled-rate' : '']"
      ></div>
      <div class="layui-slider-line-v"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, toRef } from "vue";
import { on, off } from "evtd";
import "./index.less";

export interface LaySliderProps {
  vertical?: boolean;
  modelValue?: number | Array<number>;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  range?: boolean;
  verticalrange?: number[];
  standardrange?: number[];
}

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<LaySliderProps>(), {
  vertical: false,
  modelValue: 0,
  disabled: false,
  step: 0,
});

let rangeValue: Ref<number[]> | any = toRef(props, "standardrange");

let verticalRangeValue: Ref<number[]> | any = toRef(props, "verticalrange");

const rangetracker1 = ref<HTMLElement | null>(null);
const rangetracker2 = ref<HTMLElement | null>(null);

function throttle(func: Function) {
  let timer: any = null;
  return function (args: any) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func(args);
      }, 20);
    }
  };
}
const moveAction = throttle(handle_mousemove);

const tooptipHide = ref<Boolean>(true);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handle_mousedown() {
  on("selectstart", window, handle_select, { once: true });
  on("mouseup", window, handle_mouseup);
  on("mousemove", window, moveAction);
}

function handle_mousemove(e: MouseEvent) {
  tooptipHide.value = false;
  if (props.disabled === true) {
    return false;
  }
  if (props.vertical === false && props.range === false) {
    standardMove(e);
  }

  if (props.vertical === true && props.range === false) {
    verticalMove(e);
  }

  if (props.vertical === false && props.range === true) {
    starndardRangeMove(e);
  }

  if (props.vertical === true && props.range === true) {
    verticalRangeMove(e);
  }
}

let currbtn = -1;

function handle_mouseup() {
  // off('selectstart', document, handle_select)
  off("mouseup", window, handle_mouseup);
  off("mousemove", window, moveAction);
  tooptipHide.value = true;
  currbtn = -1;
}

function handle_select(e: Event): void {
  e.preventDefault();
}
const standardtracker = ref<HTMLElement | null>(null);
let standard_style: Ref<number> = ref<number>(props.modelValue as number);

const standardMove = (e: MouseEvent) => {
  if (!standardtracker.value) {
    return;
  }
  let tracker_rect = standardtracker.value.getBoundingClientRect();
  let origin_left = tracker_rect.left;
  let point_left = e.clientX;
  let distance = point_left - origin_left;
  if (distance < 0) {
    standard_style.value = 0;
  } else {
    let rate = (distance / tracker_rect.width) * 100;
    calcWithStep(rate, standard_style);
    if (standard_style.value > 100) {
      standard_style.value = 100;
    }
  }
  emit("update:modelValue", standard_style.value);
};

const verticaltracker = ref<HTMLElement | null>(null);
let vertical_style: Ref<number> = ref<number>(props.modelValue as number);

const verticalMove = (e: MouseEvent) => {
  if (!verticaltracker.value) {
    return;
  }
  let tracker_rect = verticaltracker.value.getBoundingClientRect();
  let origin_bottom = tracker_rect.bottom;
  let point_bottom = e.clientY;
  let distance = (point_bottom - origin_bottom) * -1;
  if (distance < 0) {
    vertical_style.value = 0;
  } else {
    let rate = (distance / tracker_rect.height) * 100;
    calcWithStep(rate, vertical_style);
    if (vertical_style.value > 100) {
      vertical_style.value = 100;
    }
  }
  emit("update:modelValue", vertical_style.value);
};

const starndardRangeMove = (e: MouseEvent) => {
  if (!rangetracker1.value) {
    return;
  }
  let tracker_rect = rangetracker1.value.getBoundingClientRect();
  let origin_left = tracker_rect.left;
  let point_left = e.clientX;
  let distance = point_left - origin_left;
  if (distance < 0) {
    rangeValue.value[0] = 0;
  } else {
    let rate = (distance / tracker_rect.width) * 100;
    let idx = -1;
    if (currbtn === -1) {
      currbtn = moveNeighbors(Math.floor(rate), rangeValue);
      idx = currbtn;
    } else {
      idx = currbtn;
    }

    calcWithStep(rate, rangeValue, idx);
    if (rangeValue.value[1] > 100) {
      rangeValue.value[1] = 100;
    }
    if (rangeValue.value[0] < 0) {
      rangeValue.value[0] = 0;
    }
  }
  emit("update:modelValue", rangeValue.value);
};

const verticalRangeMove = (e: MouseEvent) => {
  if (!rangetracker2.value) {
    return;
  }
  let tracker_rect = rangetracker2.value.getBoundingClientRect();
  let origin_bottom = tracker_rect.bottom;
  let point_bottom = e.clientY;
  let distance = (point_bottom - origin_bottom) * -1;
  if (distance < 0) {
    verticalRangeValue.value[0] = 0;
  } else {
    let rate = (distance / tracker_rect.height) * 100;
    let idx = -1;
    if (currbtn === -1) {
      currbtn = moveNeighbors(Math.floor(rate), verticalRangeValue);
      idx = currbtn;
    } else {
      idx = currbtn;
    }
    calcWithStep(rate, verticalRangeValue, idx);
    if (verticalRangeValue.value[1] > 100) {
      verticalRangeValue.value[1] = 100;
    }
    if (verticalRangeValue.value[0] < 0) {
      verticalRangeValue.value[0] = 0;
    }
  }
  emit("update:modelValue", verticalRangeValue.value);
};

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
</script>
