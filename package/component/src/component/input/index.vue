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

export interface LayInputProps {
  name?: string;
  type?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  modelValue?: string;
  allowClear?: boolean;
  autocomplete?: string;
  placeholder?: string;
  autofocus?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}

const props = withDefaults(defineProps<LayInputProps>(), {
  disabled: false,
  readonly: false,
  allowClear: false,
  autofocus: false,
  modelValue: "",
});

interface InputEmits {
  (e: "blur", event: Event): void;
  (e: "input", event: Event): void;
  (e: "update:modelValue", value: string): void;
  (e: "change", event: Event): void;
  (e: "focus", event: Event): void;
  (e: "clear"): void;
}

const emit = defineEmits<InputEmits>();

const { t } = useI18n();
const slots = useSlots();
const currentValue = ref<string>(
  String(props.modelValue == null ? "" : props.modelValue)
);
const hasContent = computed(() => (props.modelValue as string)?.length > 0);

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
  emit("update:modelValue", value);
  emit("input", event);
};

const onClear = () => {
  emit("update:modelValue", "");
  emit("clear");
};

const onFocus = (event: Event) => {
  emit("focus", event);
};

const onChange = (event: Event) => {
  emit("change", event);
};

const onBlur = (event: Event) => {
  emit("blur", event);
};

const classes = computed(() => {
  return { "layui-disabled": props.disabled };
});
</script>

<template>
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
      :readonly="readonly"
      :class="classes"
      class="layui-input"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
    />
    <span class="layui-input-suffix" v-if="slots.suffix || props.suffixIcon">
      <slot name="suffix" v-if="slots.suffix"></slot>
      <lay-icon
        v-else
        :type="props.suffixIcon"
        class="layui-input-suffix-icon"
      ></lay-icon>
    </span>
    <span class="layui-input-clear" v-if="allowClear && hasContent">
      <lay-icon type="layui-icon-close-fill" @click="onClear"></lay-icon>
    </span>
  </div>
</template>
