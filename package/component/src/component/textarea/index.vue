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
  allowClear?: boolean;
}

const props = defineProps<LayTextareaProps>();

interface TextareaEmits {
  (e: "blur", event: Event): void;
  (e: "input", event: Event): void;
  (e: "update:modelValue", value: string): void;
  (e: "change", event: Event): void;
  (e: "focus", event: Event): void;
  (e: "clear"): void;
}

const emit = defineEmits<TextareaEmits>();

const attrs = useAttrs();

const onInput = function (event: Event) {
  const inputElement = event.target as HTMLInputElement;
  emit("update:modelValue", inputElement.value);
  emit("input", event);
};

const onFocus = function (event: Event) {
  emit("focus", event);
};

const onBlur = function (event: Event) {
  emit("blur", event);
};

const onChange = (event: Event) => {
  emit("change", event);
};

const onClear = function () {
  emit("update:modelValue", "");
  emit("clear");
};

const hasContent = computed(() => (props.modelValue as string)?.length > 0);

const wordCount = computed(() => {
  let count = String(props.modelValue?.length ?? 0);
  if (attrs.maxlength) {
    count += "/" + attrs.maxlength;
  }
  return count;
});
</script>

<template>
  <div class="layui-textarea-wrapper">
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
      @change="onChange"
      @blur="onBlur"
    ></textarea>
    <span class="layui-textarea-clear" v-if="allowClear && hasContent">
      <lay-icon type="layui-icon-close-fill" @click="onClear"></lay-icon>
    </span>
    <div v-if="showCount" class="layui-texterea-show-count">
      {{ wordCount }}
    </div>
  </div>
</template>
