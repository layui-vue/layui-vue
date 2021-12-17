<template>
  <div class="layui-slider-vertical" v-if="vertical">
    <div
      ref="verticaltracker"
      @mousedown.stop="handle_mousedown"
      class="layui-slider-vertical-track"
    >
      <div
        :style="{ bottom: modelValue + '%' }"
        class="layui-slider-vertical-btn"
      ></div>
      <div :style="{ height: modelValue + '%' }" class="layui-slider-vertical-rate"></div>
      <div class="layui-slider-vertical-line"></div>
    </div>
  </div>

  <div class="layui-slider-v" v-else>
    <div
      ref="standardtracker"
      @mousedown.stop="handle_mousedown"
      class="layui-slider-track-v"
    >
      <lay-tooltip :content="modelValue + ''">
        <div
          :style="{ left: modelValue + '%' }"
          class="layui-slider-btn-v"
        ></div>
      </lay-tooltip>
      <div
        :style="{ width: modelValue + '%' }"
        class="layui-slider-rate-v"
      ></div>
      <div class="layui-slider-line-v"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, reactive, ref } from "vue";
import { on, off } from "evtd";
import "./index.less";

const emit = defineEmits(["update:modelValue"]);

interface LaySliderProps {
  vertical?: boolean;
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

const props = withDefaults(defineProps<LaySliderProps>(), {
  vertical: false,
  modelValue: 0,
});

const standardtracker = ref<HTMLElement | null>(null);
const verticaltracker = ref<HTMLElement | null>(null);
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
  if (props.vertical === false) {
    standardMove(e);
  } else {
    verticalMove(e);
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
      // props.modelValue = 100;
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
  let distance = (point_bottom - origin_bottom) * -1
  if (distance < 0) {
    vertical_style.bottom = 0;
    vertical_style.height = 0;
  } else {
    let rate = (distance / tracker_rect.height) * 100;
    console.log(rate)
    vertical_style.bottom = Math.floor(rate);
    vertical_style.height = Math.floor(rate);
    if (vertical_style.bottom > 100) {
      vertical_style.bottom = 100;
      vertical_style.height = 100;
      // props.modelValue = 100;
    }
  }
  emit("update:modelValue", vertical_style.bottom);
};
</script>
