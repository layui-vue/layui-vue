<script lang="ts">
export default {
  name: "LayInput",
};
</script>

<script setup lang="ts">
import "./index.less";
import { LayIcon } from "@layui/icons-vue";
import { useSlots } from "vue";
import { useI18n } from "vue-i18n";

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
}

const props = withDefaults(defineProps<LayInputProps>(), {
  disabled: false,
  readonly: false,
  allowClear: false,
  autofocus: false
});

const emit = defineEmits([
  "update:modelValue",
  "input",
  "change",
  "focus",
  "blur",
]);

const onInput = function (event: InputEvent) {
  const inputElement = event.target as HTMLInputElement;
  emit("update:modelValue", inputElement.value);
  emit("input", event);
};

const onClear = () => {
  emit("update:modelValue", "");
};

const onFocus = (event: FocusEvent) => {
  emit("focus", event);
};

const onChange = () => {
  emit("change");
};

const onBlur = () => {
  emit("blur");
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
      :class="{ 'layui-disabled': disabled }"
      class="layui-input"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      :readonly="props.readonly"
    />
    <span class="layui-input-suffix" v-if="slots.suffix">
      <slot name="suffix"></slot>
    </span>
    <span class="layui-input-clear" v-if="allowClear">
      <lay-icon type="layui-icon-close-fill" @click="onClear"></lay-icon>
    </span>
  </div>
</template>
