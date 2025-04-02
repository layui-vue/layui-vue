<script setup lang="ts">
import { LayIcon } from "@layui/icons-vue";
import { computed, ref, useAttrs, watch, nextTick, onMounted } from "vue";
import { isObject } from "@vueuse/core";
import "./index.less";
import { TextareaAutosizeHeight, TextareaAutosizeRow } from "./interface";

export interface TextareaProps {
  /**
   * 绑定值
   */
  modelValue?: string;
  /**
   * `native` 表单名
   */
  name?: string;
  /**
   * `native` 提示信息
   */
  placeholder?: string;
  /**
   * `native` 禁用
   */
  disabled?: boolean;
  /**
   * 显示字数
   */
  showCount?: boolean;
  /**
   * 允许清空
   */
  allowClear?: boolean;
  /**
   * `native` 列数
   */
  cols?: number;
  /**
   * `native` 行数
   */
  rows?: number;
  /**
   * `native` 最大输入长度
   */
  maxlength?: number;
  /**
   * 自动高度
   */
  autosize?: boolean | TextareaAutosizeHeight | TextareaAutosizeRow;
  readonly?: boolean;
}

defineOptions({
  name: "LayTextarea",
});

const props = withDefaults(defineProps<TextareaProps>(), {
  autosize: false,
  showCount: false,
});

interface TextareaEmits {
  (e: "blur", eventParam: Event): void;
  (e: "input", value: string): void;
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "focus", eventParam: Event): void;
  (e: "clear"): void;
}

const emit = defineEmits<TextareaEmits>();
const textareaRef = ref<HTMLTextAreaElement>();
const composing = ref(false);
const attrs = useAttrs();

const styles = ref({
  width: props.cols ? "" : "100%",
  height: props.rows ? "" : "auto",
  minHeight: props.rows ? "" : "100px",
  maxHeight: props.autosize ? "" : "auto",
  transition: "height 0.2s",
  ...attrs,
});

const onInput = function (eventParam: Event) {
  const inputElement = eventParam.target as HTMLInputElement;
  if (composing.value) return;
  emit("update:modelValue", inputElement.value);
  nextTick(() => emit("input", inputElement.value));
};

/**
 * 根据行数计算高度
 */
const _CalcLineHeight = (lineCounts: number) => {
  const lh = Number(textareaRef.value!.style.lineHeight) || 20;
  let num = lh * lineCounts + 8;
  num += num % lh;
  return num;
};

/**
 * 根据高度推算行数
 */
const _CalcLines = (height: number) => {
  return Math.floor(height / _CalcLineHeight(1));
};

watch(
  () => props.modelValue,
  (value, oldValue) => {
    if (isObject(props.autosize)) {
      const mode =
        (oldValue ?? "").split(/\n/g).length > (value ?? "").split(/\n/g).length
          ? "inc"
          : "dec";
      let heightOfLine = _CalcLineHeight(value?.split(/\n/g).length ?? 0);

      if (textareaRef.value!.clientHeight > heightOfLine && mode == "dec")
        return;
      if (textareaRef.value!.clientHeight < heightOfLine && mode == "inc")
        return;

      styles.value.height = `${heightOfLine}px`;
      nextTick(() =>
        textareaRef.value!.scrollTo(0, textareaRef.value?.scrollHeight ?? 0)
      );
    }
  }
);

const onFocus = function (eventParam: Event) {
  emit("focus", eventParam);
};

const onBlur = function (eventParam: Event) {
  emit("blur", eventParam);
};

const onChange = (eventParam: Event) => {
  const inputElement = eventParam.target as HTMLInputElement;
  emit("change", inputElement.value);
};

const onClear = function () {
  emit("update:modelValue", "");
  emit("clear");
};

const onCompositionstart = () => {
  composing.value = true;
};

const onCompositionend = (eventParam: Event) => {
  composing.value = false;
  onInput(eventParam);
};

const hasContent = computed(() => (props.modelValue as string)?.length > 0);

const wordCount = computed(() => {
  let count = String(props.modelValue?.length ?? 0);
  if (props.maxlength) {
    count += "/" + props.maxlength;
  }
  return count;
});

const focus = () => {
  nextTick(() => {
    textareaRef.value?.focus();
  });
};

const blur = () => {
  nextTick(() => {
    textareaRef.value?.blur();
  });
};

const handleMouseEnter = () => {
  let height = Number(textareaRef.value?.style.height);
  let _minHeight = 0,
    _maxHeight = 0;

  if (isObject(props.autosize)) {
    if (Object.hasOwn(props.autosize, "maxHeight")) {
      let { minHeight, maxHeight } = props.autosize as TextareaAutosizeHeight;
      _minHeight = minHeight;
      _maxHeight = maxHeight;
    } else {
      let { minRow, maxRow } = props.autosize as TextareaAutosizeRow;
      _minHeight = _CalcLineHeight(minRow);
      _maxHeight = _CalcLineHeight(maxRow);
    }
  }

  height < _minHeight && (height = _minHeight);
  height > _maxHeight && (height = _maxHeight);

  nextTick(() => (styles.value.height = `${height}px`));
};

onMounted(() => {
  if (isObject(props.autosize)) {
    if (Object.hasOwn(props.autosize, "maxHeight")) {
      let { minHeight, maxHeight } = props.autosize as TextareaAutosizeHeight;
      styles.value.minHeight = `${minHeight}px`;
      styles.value.height = `${minHeight}px`;
      styles.value.maxHeight = `${maxHeight}px`;
    } else {
      let { minRow, maxRow } = props.autosize as TextareaAutosizeRow;
      styles.value.minHeight = `${_CalcLineHeight(minRow)}px`;
      styles.value.height = `${_CalcLineHeight(minRow)}px`;
      styles.value.maxHeight = `${_CalcLineHeight(maxRow)}px`;
    }
  }

  if (props.rows) {
    styles.value.height = _CalcLineHeight(props.rows) + "px";
    styles.value.maxHeight = _CalcLineHeight(props.rows) + "px";
  }
});

defineExpose({ focus, blur });
</script>

<template>
  <div class="layui-textarea-wrapper">
    <textarea
      ref="textareaRef"
      class="layui-textarea"
      :rows="rows"
      :cols="cols"
      :value="modelValue"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :style="styles"
      :class="{ 'layui-textarea-disabled': disabled }"
      @compositionstart="onCompositionstart"
      @compositionend="onCompositionend"
      @input="onInput"
      @focus="onFocus"
      @change="onChange"
      @blur="onBlur"
      @mouseenter="handleMouseEnter"
      @mousedown="() => (styles.transition = 'none')"
      @mouseup="() => (styles.transition = 'height 0.2s')"
    ></textarea>
    <span class="layui-textarea-clear" v-if="allowClear && hasContent">
      <lay-icon type="layui-icon-close-fill" @click="onClear"></lay-icon>
    </span>
    <div v-if="showCount" class="layui-texterea-count">
      {{ wordCount }}
    </div>
  </div>
</template>
