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
</template>
