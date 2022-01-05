<template>
  <div class="layui-slider-vertical" v-if="vertical">
    <div
      ref="rangetracker2"
      @mousedown.stop="handle_mousedown"
      class="layui-slider-vrange"
      v-if="range"
    >
      <div
        :style="{ bottom: verticalRangeValue[1] + '%' }"
        class="layui-slider-vertical-btn"
      ></div>
      <div
        :style="{ bottom: verticalRangeValue[0] + '%' }"
        class="layui-slider-vertical-btn"
      ></div>
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
      <lay-tooltip :content="modelValue + ''">
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
      <lay-tooltip :content="rangeValue[0] + ''">
        <div
          :style="{ left: rangeValue[0] + '%' }"
          class="layui-slider-btn-v"
        ></div>
      </lay-tooltip>
      <lay-tooltip :content="rangeValue[1]">
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
      <lay-tooltip :content="modelValue + ''">
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
import { defineProps, reactive, Ref, ref, toRef } from "vue";
import { on, off } from "evtd";
import "./index.less";

const emit = defineEmits(["update:modelValue"]);

interface LaySliderProps {
  vertical?: boolean;
  modelValue?: number | Array<number>;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  range?: boolean;
  verticalrange?: number[];
}

const props = withDefaults(defineProps<LaySliderProps>(), {
  vertical: false,
  modelValue: 0,
  disabled: false,
});

let rangeValue: Ref<number[]> = ref([0, 0]);
if (Array.isArray(props.modelValue)) {
  // eslint-disable-next-line vue/no-setup-props-destructure
  rangeValue.value = props.modelValue;
}

let verticalRangeValue: any = toRef(props, "verticalrange");

const standardtracker = ref<HTMLElement | null>(null);
const verticaltracker = ref<HTMLElement | null>(null);
const rangetracker1 = ref<HTMLElement | null>(null);
const rangetracker2 = ref<HTMLElement | null>(null);

const standard_style = reactive({
  left: props.modelValue,
  width: props.modelValue,
});

const vertical_style = reactive({
  bottom: props.modelValue,
  height: props.modelValue,
});

function handle_mousedown() {
  on("selectstart", window, handle_select, { once: true });
  on("mouseup", window, handle_mouseup);
  on("mousemove", window, handle_mousemove);
}

function handle_mousemove(e: MouseEvent) {
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

function handle_mouseup() {
  // off('selectstart', document, handle_select)
  off("mouseup", window, handle_mouseup);
  off("mousemove", window, handle_mousemove);
}

function handle_select(e: Event): void {
  e.preventDefault();
}

const standardMove = (e: MouseEvent) => {
  if (!standardtracker.value) {
    return;
  }
  let tracker_rect = standardtracker.value.getBoundingClientRect();
  let origin_left = tracker_rect.left;
  let point_left = e.clientX;
  let distance = point_left - origin_left;
  if (distance < 0) {
    standard_style.left = 0;
    standard_style.width = 0;
  } else {
    let rate = (distance / tracker_rect.width) * 100;
    standard_style.left = Math.floor(rate);
    standard_style.width = Math.floor(rate);
    if (standard_style.left > 100) {
      standard_style.left = 100;
      standard_style.width = 100;
    }
  }
  emit("update:modelValue", standard_style.left);
};
const verticalMove = (e: MouseEvent) => {
  if (!verticaltracker.value) {
    return;
  }
  let tracker_rect = verticaltracker.value.getBoundingClientRect();
  let origin_bottom = tracker_rect.bottom;
  let point_bottom = e.clientY;
  let distance = (point_bottom - origin_bottom) * -1;
  if (distance < 0) {
    vertical_style.bottom = 0;
    vertical_style.height = 0;
  } else {
    let rate = (distance / tracker_rect.height) * 100;
    vertical_style.bottom = Math.floor(rate);
    vertical_style.height = Math.floor(rate);
    if (vertical_style.bottom > 100) {
      vertical_style.bottom = 100;
      vertical_style.height = 100;
    }
  }
  emit("update:modelValue", vertical_style.bottom);
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
    let idx = moveNeighbors(Math.floor(rate), rangeValue);
    rangeValue.value[idx] = Math.floor(rate);
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
    rangeValue.value[0] = 0;
  } else {
    let rate = (distance / tracker_rect.height) * 100;
    let idx = moveNeighbors(Math.floor(rate), verticalRangeValue);
    verticalRangeValue.value[idx] = Math.floor(rate);
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
</script>
