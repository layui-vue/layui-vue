<script lang="ts">
export default {
  name: "LayInput",
};
</script>

<script setup lang="ts">
import "./index.less";
import { LayIcon } from "@layui/icons-vue";
import { computed, useSlots } from "vue";
import { useI18n } from "../../language";

export interface LayInputProps {
  name?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  modelValue?: string | number;
  placeholder?: string;
  allowClear?: boolean;
  autofocus?: boolean;
  autocomplete?: string;
  prefixIcon?: string;
  suffixIcon?: string;
}

const props = withDefaults(defineProps<LayInputProps>(), {
  disabled: false,
  readonly: false,
  allowClear: false,
  autofocus: false,
  modelValue: "",
});

const emit = defineEmits([
  "update:modelValue",
  "change",
  "input",
  "focus",
  "clear",
  "blur",
]);

const { t } = useI18n();
const slots = useSlots();
const hasContent = computed(() => (props.modelValue as string)?.length > 0);

const onInput = function (event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value;
  emit("update:modelValue", value);
  emit("input", event);
};

const onClear = () => {
  emit("update:modelValue");
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
      :value="modelValue || value"
      :disabled="disabled"
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
