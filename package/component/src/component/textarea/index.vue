<script lang="ts">
export default {
  name: "LayTextarea",
};
</script>

<script setup lang="ts">
import { LayIcon } from "@layui/icons-vue";
import { computed } from "vue";
import "./index.less";

export interface TextareaProps {
  name?: string;
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  showCount?: boolean;
  allowClear?: boolean;
  maxlength?: number;
}

const props = defineProps<TextareaProps>();

interface TextareaEmits {
  (e: "blur", event: Event): void;
  (e: "input", value: string): void;
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "focus", event: Event): void;
  (e: "clear"): void;
}

const emit = defineEmits<TextareaEmits>();

const onInput = function (event: Event) {
  const inputElement = event.target as HTMLInputElement;
  emit("update:modelValue", inputElement.value);
  emit("input", inputElement.value);
};

const onFocus = function (event: Event) {
  emit("focus", event);
};

const onBlur = function (event: Event) {
  emit("blur", event);
};

const onChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  emit("change", inputElement.value);
};

const onClear = function () {
  emit("update:modelValue", "");
  emit("clear");
};

const hasContent = computed(() => (props.modelValue as string)?.length > 0);

const wordCount = computed(() => {
  let count = String(props.modelValue?.length ?? 0);
  if (props.maxlength) {
    count += "/" + props.maxlength;
  }
  return count;
});
</script>

<template>
  <div class="layui-textarea-wrapper">
    <textarea
      class="layui-textarea"
      :value="modelValue"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :maxlength="maxlength"
      :class="{ 'layui-textarea-disabled': disabled }"
      @input="onInput"
      @focus="onFocus"
      @change="onChange"
      @blur="onBlur"
    ></textarea>
    <span class="layui-textarea-clear" v-if="allowClear && hasContent">
      <lay-icon type="layui-icon-close-fill" @click="onClear"></lay-icon>
    </span>
    <div v-if="showCount" class="layui-texterea-count">
      {{ wordCount }}
    </div>
  </div>
</template>
