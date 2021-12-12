<template>
  <div class="layui-input-number" :position="position" :size="size">
    <lay-button
      type="primary"
      size="gl"
      @mousedown="longDown(subtraction)"
      @mouseup="cancelLongDown"
      @blur="cancelLongDown"
      :disabled="minControl"
      class="layui-control-btn layui-subtraction-btn"
    >
      <lay-icon :type="position==='right' ? 'layui-icon-down' : 'layui-icon-subtraction'"></lay-icon>
    </lay-button>
    <div class="layui-input-number-input">
      <lay-input
        v-model="num"
        :readonly="disabledInput || disabled"
        type="number"
        :name="name"
        @change="inputChange"
      ></lay-input>
    </div>
    <lay-button
      type="primary"
      size="gl"
      @mousedown="longDown(addition)"
      @mouseup="cancelLongDown"
      @blur="cancelLongDown"
      :disabled="maxControl"
      class="layui-control-btn layui-addition-btn"
    >
      <lay-icon :type="position==='right' ? 'layui-icon-up' : 'layui-icon-addition'"></lay-icon>
    </lay-button>
  </div>
</template>

<script lang="ts">
  export default {
    name: "LayInputNumber",
  };
</script>

<script setup lang="ts">
import layButton from "../button/index";
import layIcon from "../icon/index";
import layInput from "../input/index";
import "./index.less";
import {
  defineProps,
  defineEmits,
  ref,
  watch,
  withDefaults,
  computed,
} from "vue";

export interface LayInputNumberProps {
  modelValue?: number;
  name?: string;
  disabled?: boolean;
  disabledInput?: boolean;
  step?: number;
  position?: "right";
  min?: number;
  max?: number;
  size?: "md" | "sm" | "xs";
}

const props = withDefaults(defineProps<LayInputNumberProps>(), {
  disabled: false,
  disabledInput: false,
  modelValue: 0,
  step: 1,
  min: -Infinity,
  max: Infinity,
});

const emit = defineEmits(["update:modelValue", "change"]);

let num = ref(props.modelValue);
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

watch(()=>props.modelValue, (val) => {
  if (val !== num.value) {
    num.value = props.modelValue;
  }
});
const tempValue = ref(0);
let timer: any = 0;

const minControl = computed(
  () => props.min !== -Infinity && Number(props.min) >= num.value
);
const maxControl = computed(
  () => props.max !== Infinity && Number(props.max) <= num.value
);

const addition = function () {
  num.value += Number(props.step);
};

const subtraction = function () {
  num.value -= Number(props.step);
};

const longDown = function (fn: Function) {
  cancelLongDown();
  if (props.disabled) {
    return;
  }
  timer = setInterval(() => fn.call(timer), 100);
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
  return /^\d+(\.\d+)?$/.test(num);
};
</script>
