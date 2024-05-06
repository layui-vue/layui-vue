<script setup lang="ts">
import "./index.less";
import layInput from "../input/index.vue";
import { LayIcon } from "@layui/icons-vue";
import layButton from "../button/index.vue";
import { watch, computed, Ref, ref } from "vue";
import { InputNumberSize } from "./interface";
import useProps from "./index.hooks";
import { vRepeatClick } from "../../directives";
import { isUndefined, isNumber } from "../../utils";

export interface InputNumberProps {
  modelValue?: number;
  name?: string;
  disabled?: boolean;
  disabledInput?: boolean;
  size?: InputNumberSize;
  step?: number;
  stepStrictly?: boolean;
  precision?: number;
  position?: "right";
  min?: number;
  max?: number;
  indicator?: string;
}

defineOptions({
  name: "LayInputNumber",
});

const props = withDefaults(defineProps<InputNumberProps>(), {
  disabled: false,
  disabledInput: false,
  modelValue: 0,
  step: 1,
  stepStrictly: false,
  min: -Infinity,
  max: Infinity,
  indicator: "",
});

const { size } = useProps(props);
const isBlur = ref(true);

const emit = defineEmits([
  "update:modelValue",
  "change",
  "input",
  "focus",
  "blur",
]);
let num: Ref<number | null | undefined> = ref(props.modelValue);
let userInput: Ref<string | null | undefined> = ref(null);

const formatModelValue = (value: number | string | null | undefined) => {
  const { max, min, step, stepStrictly, precision } = props;

  if (min > max) {
    throw new Error("input-number: props.max应大于props.min");
  }

  let newValue = Number(value);
  if (value === null || value === undefined || Number.isNaN(newValue)) {
    return null;
  }

  if (stepStrictly) {
    newValue = toPrecision(Math.round(newValue / step) * step, precision);
  }

  if (!isUndefined(precision)) {
    newValue = toPrecision(newValue, precision);
  }

  if (newValue > max || newValue < min) {
    newValue = newValue > max ? max : min;
    emit("update:modelValue", newValue);
  }
  return newValue;
};

/**
 * 对value进行精度处理
 * @param value value
 * @param pre 精度值
 */
const toPrecision = (value: number, pre?: number) => {
  if (!pre) pre = defaultPrecision.value;
  if (pre === 0) return Math.round(value);

  let StringValue = String(value);
  const pointPos = StringValue.indexOf(".");
  if (pointPos === -1) return value;
  const nums = StringValue.replace(".", "").split("");
  const datum = nums[pointPos + pre];
  if (!datum) return value;
  const length = StringValue.length;
  if (StringValue.charAt(length - 1) === "5") {
    StringValue = `${StringValue.slice(0, Math.max(0, length - 1))}6`;
  }
  return Number.parseFloat(Number(StringValue).toFixed(pre));
};

// 获取精度
const getPrecision = (value: number) => {
  if (!value) return 0;
  const valueString = value.toString();
  const dotPosition = valueString.indexOf(".");
  let precision = 0;
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1;
  }
  return precision;
};

const ensurePrecision = (val: number, coefficient: 1 | -1 = 1) => {
  if (!isNumber(val)) return num.value;
  // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
  return toPrecision(val + props.step * coefficient);
};

const defaultPrecision = computed(() => {
  // 获得step的precision
  const stepPrecision = getPrecision(props.step);

  if (!isUndefined(props.precision)) {
    if (stepPrecision > props.precision) {
      console.warn("input-number: props.precision不应小于props.step的小数位");
    }
    return props.precision;
  } else {
    return Math.max(getPrecision(props.modelValue), stepPrecision);
  }
});

const inputValue = computed(() => {
  // 处理用户输入值
  // 后续触发input-change fn 二次format精度
  if (userInput.value !== null) {
    return userInput.value;
  }
  let currentValue: number | string | undefined | null = num.value;
  if (currentValue == null) return "";
  if (isNumber(currentValue)) {
    if (Number.isNaN(currentValue)) return "";
    if (!isUndefined(props.precision)) {
      currentValue = currentValue.toFixed(props.precision);
    }
  }
  return currentValue;
});

watch(
  () => props.modelValue,
  (val) => {
    const newUserInput = formatModelValue(userInput.value);
    const newValue = formatModelValue(val);
    if (
      !isNumber(newUserInput) &&
      (!newUserInput || newUserInput !== newValue)
    ) {
      num.value = newValue;
      userInput.value = null;
    }
  },
  {
    immediate: true,
  }
);

const setNum = (
  value: number | string | null | undefined,
  emitChange = true
) => {
  const oldVal = num.value;
  const newVal = formatModelValue(value);

  if (!emitChange) {
    emit("update:modelValue", newVal!);
    return;
  }

  if (oldVal === newVal) return;
  userInput.value = null;
  emit("update:modelValue", newVal!);
  emit("change", newVal!, oldVal!);

  num.value = newVal;
};

const onInput = (value: string) => {
  userInput.value = value;
  const newVal = value === "" ? null : Number(value);
  setNum(newVal, false);
};

const onChange = (value: string) => {
  const newVal = value === "" ? null : Number(value);
  if ((isNumber(newVal) && !Number.isNaN(newVal)) || value === "") {
    setNum(newVal);
  }
  userInput.value = null;
};

const onBlur = (event: FocusEvent) => {
  emit("blur", event);
  isBlur.value = true;
};

const onFocus = (event: FocusEvent) => {
  emit("focus", event);
  isBlur.value = false;
};

const addition = () => {
  // maxDisabled 防止用户通过控制台清除disabled 属性
  if (props.disabledInput || maxDisabled.value) return;
  const value = Number(inputValue.value) || 0;
  const newVal = ensurePrecision(value);
  setNum(newVal);
};

const subtraction = () => {
  // minDisabled 防止用户通过控制台清除disabled 属性
  if (props.disabledInput || minDisabled.value) return;
  const value = Number(inputValue.value) || 0;
  const newVal = ensurePrecision(value, -1);
  setNum(newVal);
};

const minDisabled = computed(() => {
  if (props.disabled) {
    return true;
  }
  return (
    props.min !== -Infinity &&
    isNumber(props.modelValue) &&
    Number(props.min) >= props.modelValue
  );
});

const maxDisabled = computed(() => {
  if (props.disabled) {
    return true;
  }
  return (
    props.max !== Infinity &&
    isNumber(props.modelValue) &&
    Number(props.max) <= props.modelValue
  );
});
</script>

<template>
  <div class="layui-input-number" :position="position" :size="size">
    <lay-button
      size="lg"
      v-repeat-click="subtraction"
      :disabled="minDisabled"
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
        :title="`${inputValue}${indicator}`"
        :max="max"
        :min="min"
        :name="name"
        :modelValue="inputValue"
        :readonly="disabledInput || disabled"
        :disabled="disabledInput || disabled"
        @input="onInput"
        @change="onChange"
        @blur="onBlur"
        @focus="onFocus"
        type="number"
      />
      <div class="layui-input-number-indicator" v-if="isBlur && !!indicator">
        {{ `${inputValue}${indicator}` }}
      </div>
    </div>
    <lay-button
      size="lg"
      v-repeat-click="addition"
      :disabled="maxDisabled"
      class="layui-control-btn layui-addition-btn"
    >
      <lay-icon
        :type="position === 'right' ? 'layui-icon-up' : 'layui-icon-addition'"
      />
    </lay-button>
  </div>
</template>
