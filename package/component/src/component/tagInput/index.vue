<script lang="ts">
export default {
  name: "LayTagInput",
};
</script>
<script lang="ts" setup>
import "./index.less";
import LayTag, { LayTagProps } from "../tag/index.vue";
import LayToopTip from "../tooltip/index.vue";
import {
  onMounted,
  shallowRef,
  ref,
  watch,
  computed,
  reactive,
  nextTick,
} from "vue";
import { reactiveOmit, useResizeObserver, useVModel } from "@vueuse/core";

export interface TagData {
  value?: string | number;
  label?: string;
  closable?: boolean;
  [other: string]: any;
}

export interface LayInputTagProps {
  modelValue?: (string | number | TagData)[];
  inputValue?: string;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
  allowClear?: boolean;
  max?: number;
  minCollapsedNum?: number;
  collapseTagsTooltip?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  tagProps?: LayTagProps;
}

const props = withDefaults(defineProps<LayInputTagProps>(), {
  disabled: false,
  placeholder: "",
  readonly: false,
  allowClear: true,
  minCollapsedNum: 3,
  size: "md",
  //max:3
});

const emit = defineEmits(["update:modelValue", "update:inputValue"]);

const mirrorRefEl = shallowRef<HTMLElement | undefined>(undefined);
const inputRefEl = shallowRef<HTMLInputElement | undefined>(undefined);
const oldInputValue = ref<string>("");
const compositionValue = ref<string>("");
const isComposing = ref(false);
const inputStyle = reactive({ width: "15px" });
const inputValue = useVModel(props, "inputValue", emit, { defaultValue: "" });
const tagData = useVModel(props, "modelValue", emit, {
  deep: true,
  defaultValue: [] as TagData[],
});
const tagProps = reactiveOmit(
  props.tagProps ?? {},
  "closable",
  "size",
  "disabled"
);

const computedTagData = computed(() => {
  if (!tagData.value) return;
  return props.minCollapsedNum
    ? tagData.value?.slice(0, props.minCollapsedNum)
    : tagData.value;
});

const collapsedTagData = computed(() => {
  if (!tagData.value) return;
  return props.minCollapsedNum && tagData.value?.length > props.minCollapsedNum
    ? tagData.value?.slice(props.minCollapsedNum)
    : [];
});

const handleInput = function (event: Event) {
  if (isComposing.value) {
    return;
  }
  inputValue.value = (event.target as HTMLInputElement).value;
};

const handleComposition = (event: CompositionEvent) => {
  if (event.type === "compositionend") {
    isComposing.value = false;
    compositionValue.value = "";
    handleInput(event);
  } else {
    isComposing.value = true;
    compositionValue.value = inputValue.value + (event.data ?? "");
  }
};

const handleEnter = (event: KeyboardEvent) => {
  event.preventDefault();
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
};

const handleBackspaceKeyUp = (event: KeyboardEvent) => {
  if (!tagData.value || !tagData.value.length) return;
  if (!oldInputValue.value && ["Backspace", "Delete"].includes(event.code)) {
    tagData.value = tagData.value.slice(0, -1);
  }
  oldInputValue.value = inputValue.value ?? "";
};

const handleFocus = () => {
  (inputRefEl.value as HTMLInputElement)?.focus();
};

const handleBlur = () => {
  (inputRefEl.value as HTMLInputElement)?.blur();
};

const handleClearClick = (e: MouseEvent) => {
  if (props.disabled || props.readonly || !props.allowClear) {
    return;
  }
  tagData.value = [];
};

const handleClose = (index: number) => {
  if (!tagData.value) return;
  const arr = [...tagData.value];
  arr.splice(index, 1);
  tagData.value = arr;
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
  if(tagData.value && computedTagData.value) {
    return tagData.value.length - computedTagData.value.length
  }
})

onMounted(() => {
  handleResize();
});

defineExpose({
  focus: handleFocus,
  blur: handleBlur,
});
</script>
<template>
  <div :class="cls" @click="handleFocus">
    <span ref="mirrorRefEl" class="layui-tag-input-mirror">
      {{ compositionValue || inputValue || placeholder }}
    </span>
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
          :closable="!readonly && !disabled"
          :size="size"
          @close="handleClose(index)"
        >
          {{ item }}
        </LayTag>
      </template>
      <template v-if="computedTagData?.length != tagData?.length">
        <LayToopTip :isDark="false" trigger="click" popperStyle="padding:6px">
          <LayTag v-bind="tagProps" key="more" :closable="false" :size="size">
            +{{ moreCount }}...
          </LayTag>
          <template #content>
            <div class="layui-tag-input-collapsed-panel">
              <LayTag
                v-for="(item, index) of collapsedTagData"
                :key="`${item}-${index}`"
                v-bind="tagProps"
                :closable="!readonly && !disabled"
                :size="size"
                @close="handleClose(index + (minCollapsedNum ?? 0))"
              >
                {{ item }}
              </LayTag>
            </div>
          </template>
        </LayToopTip>
      </template>
      <input
        ref="inputRefEl"
        class="layui-tag-input-inner-input"
        :style="inputStyle"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readonly"
        @keydown.enter="handleEnter"
        @keyup="handleBackspaceKeyUp"
        @input="handleInput"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
      />
    </span>
    <span v-if="allowClear && tagData?.length" class="layui-tag-input-clear">
      <lay-icon type="layui-icon-close-fill" @click.stop="handleClearClick" />
    </span>
  </div>
</template>
