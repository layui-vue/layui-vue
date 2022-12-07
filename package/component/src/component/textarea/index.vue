<script lang="ts">
export default {
  name: "LayTextarea",
};
</script>

<script setup lang="ts">
import { LayIcon } from "@layui/icons-vue";
import { computed, ref, watch } from "vue";
import {isObject } from "@vueuse/shared"
import "./index.less";

export interface TextareaProps {
  name?: string;
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  showCount?: boolean;
  allowClear?: boolean;
  maxlength?: number;
  autosize?: boolean | { minHeight: number, maxHeight: number };
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
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const composing = ref(false);

const onInput = function (event: Event) {
  const inputElement = event.target as HTMLInputElement;
  emit("input", inputElement.value);
  if (composing.value) {
    return;
  }
  emit("update:modelValue", inputElement.value);
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

const onCompositionstart = () => {
  composing.value = true;
};

const onCompositionend = (event: Event) => {
  composing.value = false;
  onInput(event);
};

const hasContent = computed(() => (props.modelValue as string)?.length > 0);

const wordCount = computed(() => {
  let count = String(props.modelValue?.length ?? 0);
  if (props.maxlength) {
    count += "/" + props.maxlength;
  }
  return count;
});

watch([() => props.modelValue, textareaRef], () => {
  if (!textareaRef.value || !props.autosize) return;
  const height: number = textareaRef.value?.scrollHeight + 2; // 边框 
  if (isObject(props.autosize)) {
    const { minHeight, maxHeight } = props.autosize;
    if (height < minHeight || height > maxHeight) return;
  }
  textareaRef.value!.style.height = '1px'
  textareaRef.value!.style.height = `${textareaRef.value?.scrollHeight + 2}px`
}, {
  immediate: true,
})
</script>

<template>
  <div class="layui-textarea-wrapper">
    <textarea
      ref="textareaRef"
      class="layui-textarea"
      :value="modelValue"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :maxlength="maxlength"
      :class="{ 'layui-textarea-disabled': disabled }"
      @compositionstart="onCompositionstart"
      @compositionend="onCompositionend"
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
