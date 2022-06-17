<script lang="ts">
export default {
  name: "LayTextarea",
};
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import "./index.less";

export interface LayTextareaProps {
  name?: string;
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  showCount?: boolean;
}

const props = defineProps<LayTextareaProps>();

const emit = defineEmits(["update:modelValue", "input", "focus", "blur"]);

const attrs = useAttrs();

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

const wordCount = computed(() => {
  let count = String(props.modelValue?.length ?? 0);
  if (attrs.maxlength) {
    count += "/" + attrs.maxlength;
  }
  return count;
});
</script>

<template>
  <textarea
    :value="modelValue"
    v-bind="$attrs"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    class="layui-textarea"
    :class="{ 'layui-disabled': disabled }"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  ></textarea>
  <div v-if="showCount" class="layui-texterea-show-count">
    {{ wordCount }}
  </div>
</template>
