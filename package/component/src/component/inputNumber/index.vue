<script lang="ts">
export default {
  name: "LayInputNumber",
};
</script>

<script setup lang="ts">
import "./index.less";
import layInput from "../input/index.vue";
import { LayIcon } from "@layui/icons-vue";
import layButton from "../button/index.vue";
import { ref, watch, withDefaults, computed, Ref } from "vue";
import { InputNumberSize } from "./interface";
import { add, sub } from "./math";

export interface InputNumberProps {
  modelValue?: number;
  name?: string;
  disabled?: boolean;
  disabledInput?: boolean;
  size?: InputNumberSize;
  step?: number;
  position?: "right";
  min?: number;
  max?: number;
}

const props = withDefaults(defineProps<InputNumberProps>(), {
  disabled: false,
  disabledInput: false,
  modelValue: 0,
  step: 1,
  min: -Infinity,
  max: Infinity,
  size: "md",
});

const emit = defineEmits(["update:modelValue", "change"]);
let num: Ref<number> = ref(props.modelValue);

watch(num, (val) => {
  if (props.max !== Infinity && val > props.max) {
    num.value = props.max;
    return;
  }
  if (props.min !== -Infinity && val < props.min) {
    num.value = props.min;
    return;
  }
  if (isNumber(num.value)) {
    tempValue.value = Number(num.value);
    emit("update:modelValue", tempValue.value);
    emit("change", tempValue.value);
  }
});

watch(
  () => props.modelValue,
  (val) => {
    if (val !== num.value) {
      num.value = props.modelValue;
    }
  }
);

let timer: any = 0;
const tempValue: Ref<number> = ref(0);

const minControl = computed(() => {
  if (props.disabled) {
    return true;
  }
  if (props.min !== -Infinity) {
    return Number(props.min) >= num.value;
  }
});

const maxControl = computed(() => {
  if (props.disabled) {
    return true;
  }
  if (props.max !== Infinity) {
    return Number(props.max) <= num.value;
  }
});

const addition = function () {
  num.value = add(num.value, props.step);
};

const subtraction = function () {
  num.value = sub(num.value, props.step);
};

const longDown = function (fn: Function) {
  cancelLongDown();
  if (props.disabled) {
    return;
  }
  timer = setInterval(() => fn.call(timer), 150);
  fn.call(timer);
};

const cancelLongDown = function () {
  clearInterval(timer);
};

const inputChange = function () {
  if (isNumber(num.value)) {
    tempValue.value = Number(num.value);
    return;
  }
  num.value = tempValue.value;
};

const isNumber = function (num: any) {
  return !isNaN(num);
};
</script>

<template>
  <div class="layui-input-number" :position="position" :size="size">
    <lay-button
      size="lg"
      @mouseup="cancelLongDown"
      @mousedown="longDown(subtraction)"
      @blur="cancelLongDown"
      :disabled="minControl"
      class="layui-control-btn layui-subtraction-btn"
    >
      <lay-icon
        :type="
          position === 'right' ? 'layui-icon-down' : 'layui-icon-subtraction'
        "
      />
    </lay-button>
    <div class="layui-input-number-input">
      <lay-input
        :max="max"
        :min="min"
        :name="name"
        v-model="num"
        :readonly="disabledInput || disabled"
        :disabled="disabledInput || disabled"
        @input="inputChange"
        type="number"
      />
    </div>
    <lay-button
      size="lg"
      @mouseup="cancelLongDown"
      @mousedown="longDown(addition)"
      @blur="cancelLongDown"
      :disabled="maxControl"
      class="layui-control-btn layui-addition-btn"
    >
      <lay-icon
        :type="position === 'right' ? 'layui-icon-up' : 'layui-icon-addition'"
      />
    </lay-button>
  </div>
</template>
