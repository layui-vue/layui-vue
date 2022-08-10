<script lang="ts">
export default {
  name: "LayInput",
};
</script>

<script setup lang="ts">
import "./index.less";
import { LayIcon } from "@layui/icons-vue";
import { computed, ref, useSlots, watch } from "vue";
import { useI18n } from "../../language";
import PasswordIcon from "./svg/Password.vue";
import UnPasswordIcon from "./svg/unPassword.vue";

export interface LayInputProps {
  name?: string;
  type?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  modelValue?: string | number;
  allowClear?: boolean;
  autocomplete?: string;
  placeholder?: string;
  autofocus?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  password?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  maxlength?: number;
}

const props = withDefaults(defineProps<LayInputProps>(), {
  disabled: false,
  readonly: false,
  allowClear: false,
  autofocus: false,
  password: false,
  modelValue: "",
  size: "md",
});

interface InputEmits {
  (e: "blur", event: Event): void;
  (e: "input", value: string): void;
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "focus", event: Event): void;
  (e: "clear"): void;
}

const emit = defineEmits<InputEmits>();

const { t } = useI18n();
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

watch(
  () => currentValue,
  () => {
    emit("update:modelValue", currentValue.value);
  }
);

const onInput = function (event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value;
  emit("input", value);
  if (composing.value) {
    return;
  }
  emit("update:modelValue", value);
};

const onClear = () => {
  emit("update:modelValue", "");
  emit("clear");
};

const onFocus = (event: Event) => {
  emit("focus", event);
};

const onChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value;
  emit("change", value);
};

const onBlur = (event: Event) => {
  emit("blur", event);
};

const onCompositionstart = () => {
  composing.value = true;
}

const onCompositionend = (event: Event) => {
  composing.value = false;
  onInput(event)
}

const classes = computed(() => {
  return { "layui-disabled": props.disabled };
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
  <div class="layui-input" :size="size">
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
        :value="currentValue"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        :readonly="readonly"
        :class="classes"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @compositionstart="onCompositionstart"
        @compositionend="onCompositionend"
      />
      <span class="layui-input-suffix" v-if="slots.suffix || props.suffixIcon">
        <slot name="suffix" v-if="slots.suffix"></slot>
        <lay-icon
          v-else
          :type="props.suffixIcon"
          class="layui-input-suffix-icon"
        ></lay-icon>
      </span>
      <span
        class="layui-input-password"
        @click="showPassword"
        v-if="password && hasContent"
      >
        <password-icon v-if="isPassword"></password-icon>
        <un-password-icon v-else></un-password-icon>
      </span>
      <span class="layui-input-clear" v-if="allowClear && hasContent">
        <lay-icon type="layui-icon-close-fill" @click.stop="onClear"></lay-icon>
      </span>
    </div>
    <div class="layui-input-append" v-if="slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>
