<script setup lang="ts">
import type {
  Component,
  Ref,
  StyleValue,
  VNode,
} from "vue";
import type { DropdownTeleportProps } from "../dropdown/interface";
import type { SelectOptionProps } from "../selectOption/index.vue";
import type { SelectSize } from "./interface";
import { LayIcon } from "@layui/icons-vue";

import {
  computed,
  onMounted,
  onUnmounted,
  provide,
  ref,
  useSlots,
  watch,
} from "vue";
import { isArrayChildren } from "../../utils";
import LayDropdown from "../dropdown/index.vue";
import LayInput from "../input/index.vue";
import LaySelectOption from "../selectOption/index.vue";
import LaySelectOptionGroup from "../selectOptionGroup/index.vue";
import LayTagInput from "../tagInput/index.vue";
import useProps from "./index.hooks";
import "./index.less";

export interface SelectProps {
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  searchMethod?: Function;
  modelValue?: any;
  multiple?: boolean;
  options?: SelectOptionProps[];
  autoFitWidth?: boolean;
  autoFitMinWidth?: boolean;
  size?: SelectSize;
  collapseTagsTooltip?: boolean;
  minCollapsedNum?: number;
  allowClear?: boolean;
  showSearch?: boolean;
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
  teleportProps?: DropdownTeleportProps;
}

export interface SelectEmits {
  (e: "update:modelValue", value: string | number | object): void;
  (e: "change", value: string | number | object): void;
  (e: "search", value: string): void;
  (e: "remove-tag", value: string | number | object): void;
  (e: "clear"): void;
}

defineOptions({
  name: "LaySelect",
});

const props = withDefaults(defineProps<SelectProps>(), {
  collapseTagsTooltip: true,
  minCollapsedNum: 3,
  allowClear: false,
  autoFitWidth: true,
  autoFitMinWidth: true,
  showSearch: false,
  modelValue: null,
  disabled: false,
  multiple: false,
});

const emits = defineEmits<SelectEmits>();

const { size } = useProps(props);

const slots = useSlots();
const selectRef = ref<typeof LayDropdown | null>(null);
const searchValue = ref("");
const singleValue = ref("");
const multipleValue: Ref<any[]> = ref([]);
const openState: Ref<boolean> = ref(false);
const _options = ref<any>([]);
const composing = ref(false);
let timer: any;

function getOption(nodes: VNode[], newOptions: any[]) {
  // eslint-disable-next-line array-callback-return
  nodes?.map((item) => {
    // 如果使用 v-for 嵌套，会有一些问题
    if (isArrayChildren(item, item.children)) {
      getOption(item.children as VNode[], newOptions);
    }
    else {
      // 如果是 Select Option 遍历选项到结果
      if ((item.type as Component).name === LaySelectOption.name) {
        // 如果存在插槽，优先级将大于 label 属性
        if (item.children) {
          // @ts-expect-error TODO
          const label = item.children.default()[0].children;
          if (typeof label == "string") {
            // @ts-expect-error TODO
            item.props.label = label;
          }
        }
        newOptions.push(item.props);
      }

      // 如果是 Select Option Group 深层遍历
      if ((item.type as Component).name === LaySelectOptionGroup.name) {
        if (item.children) {
          // @ts-expect-error TODO
          getOption(item.children.default() as VNode[], newOptions);
        }
      }
    }
  });
}

function intOption() {
  const newOptions: any[] = [];
  if (slots.default) {
    getOption(slots.default(), newOptions);
  }
  Object.assign(newOptions, props.options);
  if (JSON.stringify(newOptions) !== JSON.stringify(_options.value)) {
    _options.value = newOptions;
  }
}

const allOptions = computed(() => {
  return props.options;
});

const selectedValue = computed({
  get() {
    return props.multiple && props.modelValue == null ? [] : props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
    emits("change", value);
  },
});

const multiple = computed(() => {
  return props.multiple;
});

function handleRemove(value: any) {
  if (Array.isArray(selectedValue.value)) {
    selectedValue.value = selectedValue.value.filter(item => item !== value);
    emits("remove-tag", value);
  }
}

function onCompositionstart() {
  composing.value = true;
}

function onCompositionend(eventParam: Event) {
  composing.value = false;
  handleSearch((eventParam.target as HTMLInputElement).value);
}

onMounted(() => {
  intOption();
  timer = setInterval(intOption, 500);
  watch(
    [selectedValue, _options],
    () => {
      if (multiple.value) {
        try {
          multipleValue.value = selectedValue.value?.map((value: any) => {
            let option = _options.value.find((item: any) => {
              // eslint-disable-next-line eqeqeq
              item.disabled == "" || item.disabled == true
                ? (item.closable = false)
                : (item.closable = true);
              return item.value === value;
            });

            // eslint-disable-next-line eqeqeq
            if (option == undefined) {
              option = { label: value, value, closable: true };
            }

            return option;
          });
        }
        catch {
          throw new Error("v-model / model-value is not an array type");
        }
      }
      else {
        searchValue.value = "";
        singleValue.value = _options.value.find((item: any) => {
          return item.value === selectedValue.value;
        })?.label;
      }
    },
    { immediate: true, deep: true },
  );
});

onUnmounted(() => {
  clearInterval(timer);
});

function handleSearch(value: string) {
  if (composing.value)
    return;
  emits("search", value);
  searchValue.value = value;

  // 当拉下关闭 | 用户输入，弹出弹窗
  if (value && !openState.value) {
    selectRef.value && selectRef.value.show();
  }
}

function handleClear() {
  if (multiple.value) {
    selectedValue.value = [];
  }
  else {
    selectedValue.value = "";
  }

  emits("clear");
}

function handleHide() {
  searchValue.value = "";
  openState.value = false;
}

const hasContent = computed(() => {
  if (Array.isArray(selectedValue.value)) {
    return selectedValue.value.length > 0;
  }
  else {
    return (
      selectedValue.value !== ""
      && selectedValue.value !== undefined
      && selectedValue.value !== null
    );
  }
});

const _placeholder = computed(() => {
  return hasContent.value ? "" : props.placeholder;
});

provide("selectRef", selectRef);
provide("openState", openState);
provide("selectedValue", selectedValue);
provide("searchValue", searchValue);
provide("multiple", multiple);
provide("searchMethod", props.searchMethod);
</script>

<template>
  <div
    class="layui-select"
    :class="{
      'has-content': hasContent,
      'has-clear': allowClear,
      'has-disabled': disabled,
    }"
  >
    <LayDropdown
      ref="selectRef"
      :disabled="disabled"
      :content-class="contentClass"
      :content-style="contentStyle"
      :auto-fit-width="autoFitWidth"
      :auto-fit-min-width="autoFitMinWidth"
      :teleport-props="teleportProps"
      @hide="handleHide"
      @show="openState = true"
    >
      <LayTagInput
        v-if="multiple"
        v-model="multipleValue"
        v-model:input-value="searchValue"
        :allow-clear="allowClear"
        :placeholder="_placeholder"
        :collapse-tags-tooltip="collapseTagsTooltip"
        :min-collapsed-num="minCollapsedNum"
        :disabled="disabled"
        :disabled-input="!showSearch"
        :size="size"
        class="layui-unselect"
        :style="{ width: '100%' }"
        @remove="handleRemove"
        @clear="handleClear"
        @input-value-change="handleSearch"
        @keyup.delete.capture.prevent.stop
        @keydown.enter.capture.prevent.stop
      >
        <template v-if="slots.prepend" #prepend>
          <slot name="prepend" />
        </template>
        <template v-if="slots.append" #append>
          <slot name="append" />
        </template>
        <template #suffix>
          <LayIcon
            type="layui-icon-triangle-d"
            :class="{ triangle: openState }"
          />
        </template>
      </LayTagInput>
      <LayInput
        v-else
        :size="size"
        :disabled="disabled"
        :readonly="!showSearch"
        :model-value="singleValue"
        :allow-clear="allowClear"
        :placeholder="_placeholder"
        :class="{ 'layui-unselect': !showSearch }"
        @compositionstart="onCompositionstart"
        @compositionend="onCompositionend"
        @input="handleSearch"
        @clear="handleClear"
      >
        <template v-if="slots.prepend" #prepend>
          <slot name="prepend" />
        </template>
        <template v-if="slots.append" #append>
          <slot name="append" />
        </template>
        <template #suffix>
          <LayIcon
            type="layui-icon-triangle-d"
            :class="{ triangle: openState }"
          />
        </template>
      </LayInput>
      <template #content>
        <dl class="layui-select-content">
          <div v-if="slots.header" class="layui-select-content__header">
            <slot name="header" />
          </div>
          <template v-if="options">
            <LaySelectOption
              v-for="(item, index) in allOptions"
              v-bind="item"
              :key="index"
            />
          </template>
          <slot />
          <div v-if="slots.footer" class="layui-select-content__footer">
            <slot name="footer" />
          </div>
        </dl>
      </template>
    </LayDropdown>
  </div>
</template>
