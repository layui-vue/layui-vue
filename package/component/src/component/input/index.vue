<script lang="ts">
export default {
  name: "LayInput",
};
</script>

<script setup lang="ts">
import "./index.less";
import { LayIcon } from "@layui/icons-vue";
import { useSlots } from "vue";
import { useI18n }  from "../../language";

const { t } = useI18n();
const slots = useSlots();

export interface LayInputProps {
  name?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  modelValue?: string;
  placeholder?: string;
  allowClear?: boolean;
  autofocus?: boolean;
  autocomplete?: boolean;
}

const props = withDefaults(defineProps<LayInputProps>(), {
  disabled: false,
  readonly: false,
  allowClear: false,
  autofocus: false,
  autocomplete: false,
});

const emit = defineEmits([
  "update:modelValue",
  "input",
  "change",
  "focus",
  "blur",
]);

const onInput = function (event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value;
  emit("update:modelValue", value);
  emit("input", event);
};

const onClear = () => {
  emit("update:modelValue", "");
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
</script>

<template>
  <div class="layui-input-wrapper">
    <span class="layui-input-prefix" v-if="slots.prefix">
      <slot name="prefix"></slot>
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
      :class="{ 'layui-disabled': disabled }"
      class="layui-input"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
    />
    <span class="layui-input-suffix" v-if="slots.suffix">
      <slot name="suffix"></slot>
    </span>
    <span class="layui-input-clear" v-if="allowClear">
      <lay-icon type="layui-icon-close-fill" @click="onClear"></lay-icon>
    </span>
  </div>
</template>
