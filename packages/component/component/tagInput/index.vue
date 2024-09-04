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

import { useTreeSelectProvide } from "../treeSelect/useTreeSelect";

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

defineOptions({
  name: "LayTagInput",
});

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

const normalizedTags = computed(() => {
  let limit;

  if (props.max) {
    limit = Number(props.max);
    if (props.minCollapsedNum) {
      if (props.minCollapsedNum > props.max) {
        console.group("LayTagInput: minCollapsedNum > max");
        console.warn(
          `props.minCollapsedNum(${props.minCollapsedNum}) > props.max(${props.max})`
        );
        console.warn(
          `Tips: props.max should be greater than or equals to props.minCollapsedNum.`
        );
        console.groupEnd();
      }
    }
    if (tagData?.value?.length ?? 0 > limit)
      emit("update:modelValue", tagData.value?.slice(0, limit));
  }

  return normalizedTagData((tagData.value ?? []).slice(0, limit));
});

const computedTagData = computed(() => {
  if (!normalizedTags.value) return;
  return props.minCollapsedNum
    ? normalizedTags.value?.slice(0, props.minCollapsedNum)
    : normalizedTags.value;
});

const collapsedTagData = computed(() => {
  if (!normalizedTags.value) return;
  return props.minCollapsedNum &&
    normalizedTags.value?.length >
      (computedTagData.value?.length ?? 0) - props.minCollapsedNum
    ? normalizedTags.value?.slice(props.minCollapsedNum)
    : [];
});

const handleInput = function (e: Event) {
  if (isComposing.value) return;
  inputValue.value = (e.target as HTMLInputElement).value;
  // fix: 输入单个字符后删除，此时 inputValue.value 和 oldValueInputValue.value 都是空字符串，由此触发 handleClose
  if (!oldInputValue.value.length) oldInputValue.value = inputValue.value;
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
  if (e.key.toLowerCase() !== "backspace") return;
  if (!tagData.value || !tagData.value.length) return;
  if (!inputValue.value?.length && !oldInputValue.value.length) {
    const lastIndex = normalizedTags.value.length - 1;
    handleClose(normalizedTags.value[lastIndex].value, lastIndex, e);
    return;
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
  if (props.disabled || !props.allowClear) {
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
  // 防止 inputValue.value 或 oldInputValue.value 为空时，删除 tag
  if (inputValue.value?.length || oldInputValue.value.length) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
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
  return "";
});

onMounted(() => {
  handleResize();
  const treeSelectContext = useTreeSelectProvide();
  treeSelectContext?.setInputEl?.(inputRefEl.value as HTMLInputElement);
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
          :closable="!disabled && item.closable"
          :size="size"
          @close="handleClose(item.value, index, $event)"
        >
          {{ item.label }}
        </LayTag>
      </template>
      <template v-if="computedTagData?.length != tagData?.length">
        <LayToopTip
          v-if="collapsedTagData?.length"
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
                :closable="!disabled && item.closable"
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
        @keyup.delete="handleBackspaceKeyUp"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
      />
      <div
        v-if="disabledInput"
        class="layui-tag-input-inner-disabled-input"
      ></div>
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
