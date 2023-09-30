<script lang="ts">
export default {
  name: "LaySlider",
};
</script>

<script setup lang="ts">
import "./index.less";
import { Ref, toRef, useSlots } from "vue";
import StandardVue from "./Standard.vue";
import StandardRange from "./StandardRange.vue";
import Vertical from "./Vertical.vue";
import VerticalRange from "./VerticalRange.vue";
import { useSlider } from "./useSlider";
export interface SliderProps {
  vertical?: boolean;
  modelValue?: number | Array<number>;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  range?: boolean;
  rangeValue?: number[];
  showDots?: boolean;
  isDark?: boolean;
  formatTooltip?: Function | null;
}

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<SliderProps>(), {
  vertical: false,
  modelValue: 0,
  disabled: false,
  step: 0,
  min: 0,
  max: 100,
  showDots: false,
  isDark: false,
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
          :step="step"
          @linkValHook="valHook"
          :disabled="disabled"
          :rangeValue="rangeValues"
          :min="min"
          :max="max"
          :vertical="vertical"
          :isDark="isDark"
          :showDots="showDots"
          :formatTooltip="formatTooltip"
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
          :vertical="vertical"
          :showDots="showDots"
          :isDark="isDark"
          :formatTooltip="formatTooltip"
        />
      </div>
    </div>
    <div v-else>
      <div v-if="range">
        <!-- 横向区间 -->
        <StandardRange
          :step="step"
          @linkValHook="valHook"
          :disabled="disabled"
          :rangeValue="rangeValues"
          :min="min"
          :max="max"
          :vertical="vertical"
          :showDots="showDots"
          :isDark="isDark"
          :formatTooltip="formatTooltip"
        />
      </div>
      <div v-else>
        <!-- 横向 -->
        <StandardVue
          :vertical="vertical"
          :val="modelValue"
          @linkValHook="valHook"
          :disabled="disabled"
          :step="step"
          :min="min"
          :max="max"
          :showDots="showDots"
          :isDark="isDark"
          :formatTooltip="formatTooltip"
        >
      </StandardVue>
      </div>
    </div>
  </div>
</template>
