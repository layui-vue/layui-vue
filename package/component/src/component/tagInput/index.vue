<script lang="ts">
export default {
  name: "LayTagInput",
};
</script>
<script lang="ts" setup>
import "./index.less";
import LayTag, { TagProps } from "../tag/index.vue";
import LayToopTip from "../tooltip/index.vue";
import {
  onMounted,
  shallowRef,
  ref,
  watch,
  computed,
  reactive,
  nextTick,
  useSlots,
} from "vue";
import { isObject, reactiveOmit, useResizeObserver } from "@vueuse/core";
import { LayIcon } from "@layui/icons-vue";
import { TagInputSize } from "./inerface";

export interface TagData {
  value?: string | number;
  label?: string;
  closable?: boolean;
  [other: string]: any;
}

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
}

const props = withDefaults(defineProps<TagInputProps>(), {
  placeholder: undefined,
  minCollapsedNum: 0,
  size: "md",
});

const emit = defineEmits([
  "change",
  "update:modelValue",
  "update:inputValue",
  "inputValueChange",
  "pressEnter",
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
const isComposing = ref(false);
const inputStyle = reactive({ width: "15px" });
const _tagProps = reactive(props.tagProps ?? {});
const tagProps = reactiveOmit(_tagProps, "closable", "size", "disabled");
const inputValue = computed({
  get() {
    return props.inputValue;
  },
  set(val) {
    emit("update:inputValue", val);
    emit("inputValueChange", val);
  },
});

const tagData = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
    emit("change", val);
  },
});

const normalizedTags = computed(() => normalizedTagData(tagData.value ?? []));

const computedTagData = computed(() => {
  if (!normalizedTags.value) return;
  return props.minCollapsedNum
    ? normalizedTags.value?.slice(0, props.minCollapsedNum)
    : normalizedTags.value;
});

const collapsedTagData = computed(() => {
  if (!normalizedTags.value) return;
  return props.minCollapsedNum &&
    normalizedTags.value?.length > props.minCollapsedNum
    ? normalizedTags.value?.slice(props.minCollapsedNum)
    : [];
});

const handleInput = function (e: Event) {
  if (isComposing.value) {
    return;
  }
  inputValue.value = (e.target as HTMLInputElement).value;
};

const handleComposition = (e: CompositionEvent) => {
  if (e.type === "compositionend") {
    isComposing.value = false;
    compositionValue.value = "";
    handleInput(e);
  } else {
    isComposing.value = true;
    compositionValue.value = inputValue.value + (e.data ?? "");
  }
};

const handleEnter = (e: KeyboardEvent) => {
  e.preventDefault();
  const valueStr = inputValue.value ? String(inputValue.value).trim() : "";
  if (!valueStr || !tagData.value) return;
  const isLimit = props.max && tagData.value?.length >= props.max;
  if (!isLimit) {
    tagData.value =
      tagData.value instanceof Array
        ? tagData.value.concat(String(valueStr))
        : [valueStr];
    inputValue.value = "";
  }
  emit("pressEnter", inputValue.value, e);
};

const handleBackspaceKeyUp = (e: KeyboardEvent) => {
  if (!tagData.value || !tagData.value.length) return;
  if (!oldInputValue.value && ["Backspace", "Delete"].includes(e.code)) {
    const lastIndex = normalizedTags.value.length - 1;
    handleClose(normalizedTags.value[lastIndex].value, lastIndex, e);
  }
  oldInputValue.value = inputValue.value ?? "";
};

const handleFocus = (e: FocusEvent) => {
  emit("focus", e);
  (inputRefEl.value as HTMLInputElement)?.focus();
};

const handleBlur = (e: FocusEvent) => {
  emit("blur", e);
  (inputRefEl.value as HTMLInputElement)?.blur();
};

const handleClearClick = (e: MouseEvent) => {
  if (props.disabled || props.readonly || !props.allowClear) {
    return;
  }
  tagData.value = [];
  emit("clear", e);
};

const handleClose = (
  value: string | number | undefined,
  index: number,
  e: Event
) => {
  if (!tagData.value) return;
  const arr = [...tagData.value];
  arr.splice(index, 1);
  tagData.value = arr;
  emit("remove", value, e);
};

const handleMouseDown = (e: MouseEvent) => {
  if (inputRefEl.value) {
    e.preventDefault();
    inputRefEl.value.focus();
  }
};

const setInputWidth = (width: number) => {
  if (width > 15) {
    inputStyle.width = `${width}px`;
  } else {
    inputStyle.width = "15px";
  }
};

const handleResize = () => {
  if (mirrorRefEl.value) {
    setInputWidth(mirrorRefEl.value.offsetWidth);
  }
};

const cls = computed(() => [
  `layui-tag-input`,
  `layui-tag-input-${props.size}`,
  {
    "layui-tag-input-disabled": props.disabled,
  },
]);

const normalizedTagData = (value: Array<string | number | TagData>) =>
  value.map((item) => {
    if (isObject(item)) return item;
    return {
      value: item,
      label: String(item),
      closable: true,
    };
  });

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
  }
);

const moreCount = computed(() => {
  if (tagData.value && computedTagData.value) {
    return tagData.value.length - computedTagData.value.length;
  }
});

onMounted(() => {
  handleResize();
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
    <div class="layui-tag-input-prepend" v-if="slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <span v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </span>
    <span class="layui-tag-input-inner">
      <template
        v-for="(item, index) of computedTagData"
        :key="`${item}-${index}`"
      >
        <LayTag
          v-bind="tagProps"
          :closable="!readonly && !disabled && item.closable"
          :size="size"
          @close="handleClose(item.value, index, $event)"
        >
          {{ item.label }}
        </LayTag>
      </template>
      <template v-if="computedTagData?.length != tagData?.length">
        <LayToopTip
          :isDark="false"
          trigger="hover"
          popperStyle="padding:6px"
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
                :closable="!readonly && !disabled && item.closable"
                :size="size"
                @close="
                  handleClose(
                    item.value,
                    index + (minCollapsedNum ?? 0),
                    $event
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
        @keyup="handleBackspaceKeyUp"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
      />
    </span>
    <span
      v-if="allowClear && tagData?.length && !disabled"
      class="layui-tag-input-clear"
    >
      <lay-icon type="layui-icon-close-fill" @click.stop="handleClearClick" />
    </span>
    <span class="layui-tag-input-suffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </span>
    <div class="layui-tag-input-append" v-if="slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>
