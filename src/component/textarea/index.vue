<script lang="ts">
export default {
  name: "LayTextarea",
};
</script>

<script setup lang="ts">
import "./index.less";

export interface LayTextareaProps {
  name?: string;
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = defineProps<LayTextareaProps>();

const emit = defineEmits(["update:modelValue", "input", "focus", "blur"]);

const onInput = function (event: InputEvent) {
  const inputElement = event.target as HTMLInputElement;
  emit("update:modelValue", inputElement.value);
  emit("input", inputElement.value);
};

const onFocus = function (event: FocusEvent) {
  emit("focus", event);
};

const onBlur = function () {
  emit("blur");
};
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    class="layui-textarea"
    :class="{ 'layui-disabled': disabled }"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  ></textarea>
</template>
