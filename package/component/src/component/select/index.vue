<script lang="ts">
export default {
  name: "LaySelect",
};
</script>

<script setup lang="ts">
import "./index.less";
import {
  provide,
  computed,
  ref,
  Ref,
  useSlots,
  onMounted,
  VNode,
  Component,
  watch,
  onUnmounted,
  StyleValue,
} from "vue";
import { LayIcon } from "@layui/icons-vue";
import LayInput from "../input/index.vue";
import LayTagInput from "../tagInput/index.vue";
import LayDropdown from "../dropdown/index.vue";
import LaySelectOption, { SelectOptionProps } from "../selectOption/index.vue";
import { SelectSize } from "./interface";
import { isArrayChildren } from "../../utils";

export interface SelectProps {
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  searchMethod?: Function;
  modelValue?: any;
  multiple?: boolean;
  items?: SelectOptionProps[];
  size?: SelectSize;
  collapseTagsTooltip?: boolean;
  minCollapsedNum?: number;
  allowClear?: boolean;
  showSearch?: boolean;
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
}

export interface SelectEmits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "search", value: string): void;
}

const props = withDefaults(defineProps<SelectProps>(), {
  collapseTagsTooltip: true,
  minCollapsedNum: 3,
  allowClear: false,
  showSearch: false,
  modelValue: null,
  disabled: false,
  multiple: false,
  size: "md",
});

const slots = useSlots();
const selectRef = ref();
const searchValue = ref("");
const singleValue = ref("");
const multipleValue: Ref<any[]> = ref([]);
const emits = defineEmits<SelectEmits>();
const openState: Ref<boolean> = ref(false);
const options = ref<any>([]);
const composing = ref(false);
var timer: any;

const getOption = (nodes: VNode[], newOptions: any[]) => {
  nodes?.map((item) => {
    if (isArrayChildren(item, item.children)) {
      getOption(item.children as VNode[], newOptions);
    } else {
      if ((item.type as Component).name == LaySelectOption.name) {
        if (item.children) {
          // @ts-ignore
          const label = item.children.default()[0].children;
          if (typeof label == "string") {
            // @ts-ignore
            item.props.label = label;
          }
        }
        newOptions.push(item.props);
      }
    }
  });
};

const intOption = () => {
  const newOptions: any[] = [];
  if (slots.default) {
    getOption(slots.default(), newOptions);
  }
  Object.assign(newOptions, props.items);
  if (JSON.stringify(newOptions) != JSON.stringify(options.value)) {
    options.value = newOptions;
  }
};

const handleRemove = (value: any) => {
  if (Array.isArray(selectedValue.value)) {
    selectedValue.value = selectedValue.value.filter((item) => item != value);
  }
};

const onCompositionstart = () => {
  composing.value = true;
};

const onCompositionend = (eventParam: Event) => {
  composing.value = false;
  handleSearch((eventParam.target as HTMLInputElement).value);
};

onMounted(() => {
  intOption();
  timer = setInterval(intOption, 500);
  watch(
    [selectedValue, options],
    () => {
      if (multiple.value) {
        try {
          multipleValue.value = selectedValue.value?.map((value: any) => {
            return options.value.find((item: any) => {
              item.disabled == "" || item.disabled == true
                ? (item.closable = false)
                : (item.closable = true);
              return item.value === value;
            });
          });
        } catch (e) {
          throw new Error("v-model / model-value is not an array type");
        }
      } else {
        searchValue.value = "";
        singleValue.value = options.value.find((item: any) => {
          return item.value === selectedValue.value;
        })?.label;
      }
    },
    { immediate: true, deep: true }
  );
});

onUnmounted(() => {
  clearInterval(timer);
});

const selectedValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
    emits("change", value);
  },
});

const multiple = computed(() => {
  return props.multiple;
});

const handleSearch = (value: string) => {
  if (composing.value) return;
  emits("search", value);
  searchValue.value = value;
};

const handleClear = () => {
  if (multiple.value) {
    selectedValue.value = [];
  } else {
    selectedValue.value = "";
  }
};

const handleHide = () => {
  searchValue.value = "";
  openState.value = false;
};

const hasContent = computed(() => {
  if (Array.isArray(selectedValue)) {
    return selectedValue.value.length > 0;
  } else {
    return (
      selectedValue.value != "" &&
      selectedValue.value != undefined &&
      selectedValue.value != null
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
    <lay-dropdown
      ref="selectRef"
      :disabled="disabled"
      :contentClass="contentClass"
      :contentStyle="contentStyle"
      :update-at-scroll="true"
      :autoFitWidth="true"
      @hide="handleHide"
      @show="openState = true"
    >
      <lay-tag-input
        v-if="multiple"
        v-model="multipleValue"
        v-model:input-value="searchValue"
        :allow-clear="allowClear"
        :placeholder="_placeholder"
        :collapseTagsTooltip="collapseTagsTooltip"
        :minCollapsedNum="minCollapsedNum"
        :disabled="disabled"
        :disabledInput="!showSearch"
        :size="size"
        :class="{ 'layui-unselect': true }"
        :style="{ width: '100%' }"
        @remove="handleRemove"
        @clear="handleClear"
        @input-value-change="handleSearch"
        @keyup.delete.capture.prevent.stop
        @keyup.backspace.capture.prevent.stop
        @keydown.enter.capture.prevent.stop
      >
        <template v-if="slots.prepend" #prepend>
          <slot name="prepend"></slot>
        </template>
        <template v-if="slots.append" #append>
          <slot name="append"></slot>
        </template>
        <template #suffix>
          <lay-icon
            type="layui-icon-triangle-d"
            :class="{ triangle: openState }"
          ></lay-icon>
        </template>
      </lay-tag-input>
      <lay-input
        v-else
        :size="size"
        :disabled="disabled"
        :readonly="!showSearch"
        :modelValue="singleValue"
        :allow-clear="allowClear"
        :placeholder="_placeholder"
        :class="{ 'layui-unselect': !showSearch }"
        @compositionstart="onCompositionstart"
        @compositionend="onCompositionend"
        @Input="handleSearch"
        @clear="handleClear"
      >
        <template v-if="slots.prepend" #prepend>
          <slot name="prepend"></slot>
        </template>
        <template v-if="slots.append" #append>
          <slot name="append"></slot>
        </template>
        <template #suffix>
          <lay-icon
            type="layui-icon-triangle-d"
            :class="{ triangle: openState }"
          ></lay-icon>
        </template>
      </lay-input>
      <template #content>
        <dl class="layui-select-content">
          <template v-if="items">
            <lay-select-option
              v-for="(item, index) in items"
              v-bind="item"
              :key="index"
            ></lay-select-option>
          </template>
          <slot></slot>
        </dl>
      </template>
    </lay-dropdown>
  </div>
</template>
