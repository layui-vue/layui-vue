<script lang="ts">
export default {
  name: "LayInput",
};
</script>

<script setup lang="ts">
import "./index.less";
import { LayIcon } from "@layui/icons-vue";
import { computed, ref, useSlots, watch } from "vue";
import PasswordIcon from "./svg/Password.vue";
import UnPasswordIcon from "./svg/unPassword.vue";
import { InputSize } from "./interface";

export interface InputProps {
  name?: string;
  type?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  modelValue?: string | number | string[] | undefined;
  allowClear?: boolean;
  autocomplete?: string;
  placeholder?: string;
  autofocus?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  password?: boolean;
  size?: InputSize;
  maxlength?: number;
  max?: number;
  min?: number;
}

const props = withDefaults(defineProps<InputProps>(), {
  disabled: false,
  readonly: false,
  allowClear: false,
  autofocus: false,
  password: false,
  modelValue: "",
  size: "md",
});

interface InputEmits {
  (e: "blur", eventParam: Event): void;
  (e: "input", value: string): void;
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "focus", eventParam: Event): void;
  (e: "clear"): void;
}

const emit = defineEmits<InputEmits>();

const slots = useSlots();
const type = ref(props.type);
const currentValue = ref<string>(
  String(props.modelValue == null ? "" : props.modelValue)
);
const hasContent = computed(() => (props.modelValue as string)?.length > 0);
const isPassword = computed(() => type.value == "password");
const composing = ref(false);

watch(
  () => props.type,
  () => {
    type.value = props.type;
  }
);

watch(
  () => props.modelValue,
  () => {
    currentValue.value = String(
      props.modelValue == null ? "" : props.modelValue
    );
  }
);

const onInput = function (eventParam: Event) {
  const inputElement = eventParam.target as HTMLInputElement;
  const value = inputElement.value;
  emit("input", value);
  if (composing.value) return;
  emit("update:modelValue", value);
};

const onClear = () => {
  emit("update:modelValue", "");
  emit("clear");
};

const onFocus = (eventParam: Event) => {
  emit("focus", eventParam);
};

const onChange = (eventParam: Event) => {
  const inputElement = eventParam.target as HTMLInputElement;
  const value = inputElement.value;
  emit("change", value);
};

const onBlur = (eventParam: Event) => {
  if (props.type === "number") {
    onNumberBlur(eventParam);
  }
  emit("blur", eventParam);
};

const onNumberBlur = (eventParam: Event) => {
  let value = (eventParam.target as HTMLInputElement).value;
  if (value === "") {
    value = props.min ? String(props.min) : "0";
  } else {
    if (props.max && props.max < Number(value)) value = props.max.toString();
    if (props.min && props.min > Number(value)) value = props.min.toString();
  }
  emit("update:modelValue", value);
};

const onCompositionstart = () => {
  composing.value = true;
};

const onCompositionend = (eventParam: Event) => {
  composing.value = false;
  onInput(eventParam);
};

const classes = computed(() => {
  return {
    "layui-input-disabled": props.disabled,
    "layui-input-has-prefix": slots.prefix || props.prefixIcon,
  };
});

const showPassword = () => {
  if (isPassword.value) {
    type.value = "text";
  } else {
    type.value = "password";
  }
};
</script>

<template>
  <div class="layui-input" :class="classes" :size="size">
    <div class="layui-input-prepend" v-if="slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <div class="layui-input-wrapper">
      <span class="layui-input-prefix" v-if="slots.prefix || props.prefixIcon">
        <slot name="prefix" v-if="slots.prefix"></slot>
        <lay-icon
          v-else
          :type="props.prefixIcon"
          class="layui-input-prefix-icon"
        ></lay-icon>
      </span>
      <input
        :type="type"
        :name="name"
        :disabled="disabled"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        :max="max"
        :min="min"
        :readonly="readonly"
        :value="currentValue"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @compositionstart="onCompositionstart"
        @compositionend="onCompositionend"
      />
      <span
        class="layui-input-password"
        @click="showPassword"
        v-if="password && hasContent"
      >
        <password-icon v-if="isPassword"></password-icon>
        <un-password-icon v-else></un-password-icon>
      </span>
      <span
        class="layui-input-clear"
        v-if="allowClear && hasContent && !disabled"
      >
        <lay-icon type="layui-icon-close-fill" @click.stop="onClear"></lay-icon>
      </span>
      <span class="layui-input-suffix" v-if="slots.suffix || props.suffixIcon">
        <slot name="suffix" v-if="slots.suffix"></slot>
        <lay-icon
          v-else
          :type="props.suffixIcon"
          class="layui-input-suffix-icon"
        ></lay-icon>
      </span>
    </div>
    <div class="layui-input-append" v-if="slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>
