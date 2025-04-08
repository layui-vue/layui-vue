<script lang="ts" setup>
import type { TagProps } from "../tag/index.vue";
import type { TagInputData, TagInputSize } from "./interface";
import { LayIcon } from "@layui/icons-vue";
import { isObject, reactiveOmit, useResizeObserver } from "@vueuse/core";
import {
  computed,
  nextTick,
  onMounted,
  reactive,
  ref,
  shallowRef,
  useSlots,
  watch,
} from "vue";
import { isArray } from "../../utils";
import LayTag from "../tag/index.vue";
import LayToopTip from "../tooltip/index.vue";

import { useTreeSelectProvide } from "../treeSelect/useTreeSelect";
import "./index.less";

export type TagData = TagInputData;

export interface TagInputProps {
  modelValue?: (string | number | TagData)[];
  inputValue?: string;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
  allowClear?: boolean;
  max?: number;
  minCollapsedNum?: number;
  collapseTagsTooltip?: boolean;
  size?: TagInputSize;
  tagProps?: TagProps;
  disabledInput?: boolean;
  checkInputValue?: (value: string) => boolean;
}

defineOptions({
  name: "LayTagInput",
});

const props = withDefaults(defineProps<TagInputProps>(), {
  placeholder: undefined,
  minCollapsedNum: 0,
  size: "md",
  checkInputValue: (_: string) => true,
});

const emit = defineEmits([
  "change",
  "exceed",
  "check-input-value-fail",
  "update:modelValue",
  "update:inputValue",
  "input-value-change",
  "press-enter",
  "remove",
  "clear",
  "focus",
  "blur",
]);

const slots = useSlots();
const mirrorRefEl = shallowRef<HTMLElement | undefined>(undefined);
const inputRefEl = shallowRef<HTMLInputElement | undefined>(undefined);
const oldInputValue = ref<string>("");
const compositionValue = ref<string>("");
const oldCompositionValue = ref<string>("");
const isComposing = ref(false);
const inputStyle = reactive({ width: "15px" });
const _tagProps = reactive(props.tagProps ?? {});
const tagProps = reactiveOmit(_tagProps, "closable", "size", "disabled");
const inputValue = ref(props.inputValue ?? "");

const tagData = ref();

function flushOut(val: any) {
  emit("update:modelValue", val);
  emit("change", val);
}

watch(
  () => props.modelValue,
  (val) => {
    if (props.max) {
      if (props.minCollapsedNum) {
        if (props.minCollapsedNum > props.max) {
          // eslint-disable-next-line no-console
          console.group("LayTagInput: minCollapsedNum > max");
          console.warn(
            `props.minCollapsedNum(${props.minCollapsedNum}) > props.max(${props.max})`,
          );
          console.warn(
            `Tips: props.max should be greater than or equals to props.minCollapsedNum.`,
          );
          // eslint-disable-next-line no-console
          console.groupEnd();
        }
      }
    }

    tagData.value = val;
  },
  { immediate: true },
);

watch(
  () => inputValue.value,
  (val) => {
    emit("update:inputValue", val);
    emit("input-value-change", val);
  },
);

watch(
  () => props.inputValue,
  (val) => {
    inputValue.value = val ?? "";
  },
);

const normalizedTags = computed(() => {
  return normalizedTagData(tagData.value ?? []);
});

const computedTagData = computed(() => {
  if (!normalizedTags.value)
    return;
  return props.minCollapsedNum
    ? normalizedTags.value?.slice(0, props.minCollapsedNum)
    : normalizedTags.value;
});

const collapsedTagData = computed(() => {
  if (!normalizedTags.value)
    return;
  return props.minCollapsedNum
    && normalizedTags.value?.length
    > (computedTagData.value?.length ?? 0) - props.minCollapsedNum
    ? normalizedTags.value?.slice(props.minCollapsedNum)
    : [];
});

function handleInput(e: Event) {
  if (isComposing.value)
    return;
  inputValue.value = (e.target as HTMLInputElement).value;
  // fix: 输入单个字符后删除，此时 inputValue.value 和 oldValueInputValue.value 都是空字符串，由此触发 handleClose
  if (!oldInputValue.value.length)
    oldInputValue.value = inputValue.value;
}

function handleComposition(e: CompositionEvent) {
  if (e.type === "compositionend") {
    isComposing.value = false;
    compositionValue.value = "";
    handleInput(e);
  }
  else {
    isComposing.value = true;
    if (compositionValue.value.length || e.data?.length)
      oldCompositionValue.value = compositionValue.value;
    compositionValue.value = inputValue.value + (e.data ?? "");
  }
}

function handleEnter(e: KeyboardEvent) {
  e.preventDefault();
  const valueStr = inputValue.value ? String(inputValue.value).trim() : "";
  if (!valueStr || !tagData.value)
    return;
  if (!(props.max && tagData.value?.length >= props.max)) {
    if (!props.checkInputValue || props.checkInputValue(valueStr)) {
      tagData.value = isArray(tagData.value)
        ? tagData.value.concat(String(valueStr))
        : [valueStr];
      inputValue.value = "";
      oldInputValue.value = "";
      flushOut(tagData.value);
    }
    else {
      emit("check-input-value-fail", valueStr, e);
    }
  }
  else {
    emit("exceed", valueStr, e);
  }
  emit("press-enter", valueStr, e);
}

function handleBackspaceKeyUp(e: KeyboardEvent) {
  if (e.key.toLowerCase() !== "backspace")
    return;
  if (!tagData.value || !tagData.value.length)
    return;
  if (
    !oldCompositionValue.value.length
    && !inputValue.value?.length
    && !oldInputValue.value.length
  ) {
    const lastIndex = normalizedTags.value.length - 1;
    handleClose(normalizedTags.value[lastIndex].value, lastIndex, e);
    return;
  }
  oldCompositionValue.value = compositionValue.value.length
    ? compositionValue.value
    : "";
  oldInputValue.value = inputValue.value ?? "";
}

function handleFocus(e: FocusEvent) {
  emit("focus", e);
  (inputRefEl.value as HTMLInputElement)?.focus();
}

function handleBlur(e: FocusEvent) {
  emit("blur", e);
  (inputRefEl.value as HTMLInputElement)?.blur();
}

function handleClearClick(e: MouseEvent) {
  if (props.disabled || !props.allowClear) {
    return;
  }
  tagData.value = [];
  flushOut(tagData.value);
  emit("clear", e);
}

function handleClose(value: string | number | undefined, index: number, e: Event) {
  // 防止 inputValue.value 或 oldInputValue.value 为空时，删除 tag
  if (
    e.type !== "click"
    && (isComposing.value
      || compositionValue.value.length
      || inputValue.value?.length
      || oldInputValue.value.length)
  ) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  if (!tagData.value)
    return;
  const arr = [...tagData.value];
  arr.splice(index, 1);
  tagData.value = arr;
  flushOut(tagData.value);
  emit("remove", value, e);
}

function handleMouseDown(e: MouseEvent) {
  if (inputRefEl.value) {
    e.preventDefault();
    inputRefEl.value.focus();
  }
}

function setInputWidth(width: number) {
  if (width > 15) {
    inputStyle.width = `${width}px`;
  }
  else {
    inputStyle.width = "15px";
  }
}

function handleResize() {
  if (mirrorRefEl.value) {
    setInputWidth(mirrorRefEl.value.offsetWidth);
  }
}

const cls = computed(() => [
  `layui-tag-input`,
  `layui-tag-input-${props.size}`,
  {
    "layui-tag-input-disabled": props.disabled,
  },
]);

function normalizedTagData(value: Array<string | number | TagData>) {
  return value.map((item) => {
    if (isObject(item))
      return item;
    return {
      value: item,
      label: String(item),
      closable: true,
    };
  });
}

useResizeObserver(mirrorRefEl, () => {
  handleResize();
});

watch(
  () => inputValue.value,
  (val) => {
    if (inputRefEl.value && !isComposing.value) {
      nextTick(() => {
        inputRefEl.value!.value = val ?? "";
      });
    }
  },
);

const moreCount = computed(() => {
  if (normalizedTags.value && computedTagData.value) {
    return normalizedTags.value.length - computedTagData.value.length;
  }
  return "";
});

onMounted(() => {
  handleResize();
  const treeSelectContext = useTreeSelectProvide();
  treeSelectContext?.setInputEl?.(inputRefEl.value as HTMLInputElement);

  if (inputRefEl.value) {
    inputRefEl.value!.value = inputValue.value;
  }
});

defineExpose({
  focus: handleFocus,
  blur: handleBlur,
});
</script>

<template>
  <div :class="cls" @mousedown="handleMouseDown">
    <span ref="mirrorRefEl" class="layui-tag-input-mirror">
      {{ compositionValue || inputValue || placeholder }}
    </span>
    <div v-if="slots.prepend" class="layui-tag-input-prepend">
      <slot name="prepend" />
    </div>
    <span v-if="$slots.prefix">
      <slot name="prefix" />
    </span>
    <span class="layui-tag-input-inner">
      <template
        v-for="(item, index) of computedTagData"
        :key="`${item}-${index}`"
      >
        <LayTag
          v-bind="tagProps"
          :closable="!disabled && item.closable"
          :size="size"
          @close="handleClose(item.value, index, $event)"
        >
          {{ item.label }}
        </LayTag>
      </template>
      <template v-if="computedTagData?.length !== tagData?.length">
        <LayToopTip
          v-if="collapsedTagData?.length"
          :is-dark="false"
          trigger="hover"
          popper-style="padding:6px"
          :disabled="!collapseTagsTooltip"
        >
          <LayTag v-bind="tagProps" key="more" :closable="false" :size="size">
            +{{ moreCount }}...
          </LayTag>
          <template #content>
            <div class="layui-tag-input-collapsed-panel">
              <LayTag
                v-for="(item, index) of collapsedTagData"
                :key="`${item}-${index}`"
                v-bind="tagProps"
                :closable="!disabled && item.closable"
                :size="size"
                @close="
                  handleClose(
                    item.value,
                    index + (minCollapsedNum ?? 0),
                    $event,
                  )
                "
              >
                {{ item.label }}
              </LayTag>
            </div>
          </template>
        </LayToopTip>
      </template>

      <input
        ref="inputRefEl"
        class="layui-tag-input-inner-input"
        :style="inputStyle"
        :disabled="disabled || disabledInput"
        :placeholder="placeholder"
        :readonly="readonly"
        @keydown.enter="handleEnter"
        @keyup.delete="handleBackspaceKeyUp"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
      >
      <div
        v-if="disabledInput"
        class="layui-tag-input-inner-disabled-input"
      />
    </span>
    <span
      v-if="allowClear && tagData?.length && !disabled"
      class="layui-tag-input-clear"
    >
      <LayIcon type="layui-icon-close-fill" @click.stop="handleClearClick" />
    </span>
    <span v-if="$slots.suffix" class="layui-tag-input-suffix">
      <slot name="suffix" />
    </span>
    <div v-if="slots.append" class="layui-tag-input-append">
      <slot name="append" />
    </div>
  </div>
</template>
