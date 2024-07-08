<script setup lang="ts">
import "./index.less";
import type { InputSize, InputEmits } from "./interface";
import { LayIcon } from "@layui/icons-vue";
import { computed, ref, useSlots, watch, nextTick } from "vue";
import useProps from "./index.hooks";

export interface InputProps {
  name?: string;
  type?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  modelValue?: string | number | string[] | undefined | null;
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

defineOptions({
  name: "LayInput",
});

const props = withDefaults(defineProps<InputProps>(), {
  disabled: false,
  readonly: false,
  allowClear: false,
  autofocus: false,
  password: false,
  modelValue: "",
});

const { size } = useProps(props);

const emit = defineEmits<InputEmits>();

const slots = useSlots();
const type = ref(props.type);
const inputRef = ref<HTMLElement | undefined>();
const currentValue = ref<string>(
  String(props.modelValue == null ? "" : props.modelValue)
);
const hasContent = computed(() =>
  type.value == "number"
    ? (props.modelValue as number) > (props.min || 0)
    : (props.modelValue as string)?.length > 0
);
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
  if (composing.value) return;
  emit("update:modelValue", value);
  nextTick(() => {
    emit("input", value);
  });
};

const onClear = () => {
  if (props.type === "number") {
    emit("update:modelValue", props.min ? String(props.min) : "0");
  } else {
    emit("update:modelValue", "");
  }
  emit("clear");
};

const onFocus = (eventParam: FocusEvent) => {
  emit("focus", eventParam);
};

const onChange = (eventParam: Event) => {
  const inputElement = eventParam.target as HTMLInputElement;
  const value = inputElement.value;
  emit("change", value);
};

const onBlur = (eventParam: FocusEvent) => {
  if (props.type === "number") {
    onNumberBlur(eventParam);
  }
  emit("blur", eventParam);
};

const onNumberBlur = (eventParam: FocusEvent) => {
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
    "layui-input-has-prefix": slots.prefix || props.prefixIcon,
  };
});

const wrapperClasses = computed(() => {
  return {
    "layui-input-disabled": props.disabled,
  };
});

const showPassword = () => {
  if (isPassword.value) {
    type.value = "text";
  } else {
    type.value = "password";
  }
};

const focus = () => {
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const blur = () => {
  nextTick(() => {
    inputRef.value?.blur();
  });
};

defineExpose({ focus, blur });
</script>

<template>
  <div class="layui-input" :class="classes" :size="size">
    <div class="layui-input-prepend" v-if="slots.prepend">
      <slot name="prepend" :disabled="disabled"></slot>
    </div>
    <div class="layui-input-wrapper" :class="wrapperClasses">
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
        @blur="onBlur"
        @input="onInput"
        @focus="onFocus"
        @change="onChange"
        @compositionstart="onCompositionstart"
        @compositionend="onCompositionend"
        ref="inputRef"
      />
      <span
        class="layui-input-password"
        @click="showPassword"
        v-if="password && hasContent"
      >
        <lay-icon type="layui-icon-show" v-if="isPassword"></lay-icon>
        <lay-icon type="layui-icon-hide" v-else></lay-icon>
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
      <slot name="append" :disabled="disabled"></slot>
    </div>
  </div>
</template>
