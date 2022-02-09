<script lang="ts">
export default {
  name: "LayInput"
}
</script>

<script setup lang="ts">
import "./index.less"

export interface LayInputProps {
  name?: string;
  type?: string;
  disabled?: boolean;
  modelValue?: string | number;
  placeholder?: string;
}

const props = defineProps<LayInputProps>();

const emit = defineEmits(["update:modelValue", "input", "focus", "blur"]);

const onInput = function (event: InputEvent) {
  const inputElement = event.target as HTMLInputElement;
  emit("update:modelValue", inputElement.value);
  emit("input", event);
};

const onFocus = function (event: FocusEvent) {
  emit("focus", event);
};

const onBlur = function () {
  emit("blur");
};
</script>

<template>
  <input
    :type="type"
    :name="name"
    :value="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :class="{ 'layui-disabled': disabled }"
    class="layui-input"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>