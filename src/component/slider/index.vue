<script setup lang="ts">
import { Ref, toRef } from "vue";
import "./index.less";
import StandardVue from "./Standard.vue";
import StandardRange from "./StandardRange.vue";
import Vertical from "./Vertical.vue";
import VerticalRange from "./VerticalRange.vue";

export interface LaySliderProps {
  vertical?: boolean;
  modelValue?: number | Array<number>;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  range?: boolean;
  // verticalrange?: number[];
  // standardrange?: number[];
  rangeValue?: number[];
}

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<LaySliderProps>(), {
  vertical: false,
  modelValue: 0,
  disabled: false,
  step: 0,
  min: 0,
  max: 100,
});

let rangeValues: Ref<number[]> | any = toRef(props, "rangeValue");

function valHook(val: any) {
  emit("update:modelValue", val);
}
</script>

<template>
  <div>
    <div v-if="vertical">
      <div v-if="range">
        <!-- 纵向区间 -->
        <VerticalRange
          :step="10"
          @linkValHook="valHook"
          :disabled="disabled"
          :rangeValue="rangeValues"
          :min="min"
          :max="max"
        />
      </div>
      <div v-else>
        <!-- 纵向 -->
        <Vertical
          :step="step"
          @linkValHook="valHook"
          :disabled="disabled"
          :val="modelValue"
          :min="min"
          :max="max"
        />
      </div>
    </div>
    <div v-else>
      <div v-if="range">
        <!-- 横向区间 -->
        <StandardRange
          :step="10"
          @linkValHook="valHook"
          :disabled="disabled"
          :rangeValue="rangeValues"
          :min="min"
          :max="max"
        />
      </div>
      <div v-else>
        <!-- 横向 -->
        <StandardVue
          :val="modelValue"
          @linkValHook="valHook"
          :disabled="disabled"
          :step="step"
          :min="min"
          :max="max"
        ></StandardVue>
      </div>
    </div>
  </div>
  <!-- <div class="layui-slider-vertical" v-if="vertical">
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
  </div> -->
</template>
