<script lang="ts">
export default {
  name: "LayTreeSelect",
};
</script>

<script lang="ts" setup>
import "./index.less";
import { computed, ref, watch } from "vue";
import { getNode } from "../../utils/treeUtil";
import { TreeSelectSize } from "./interface";
import { LayIcon } from "@layui/icons-vue";
import LayInput from "../input/index.vue";
import LayTagInput from "../tagInput/index.vue";
import LayDropdown from "../dropdown/index.vue";
import LayTree from "../tree/index.vue";

export interface TreeSelectProps {
  data: any;
  modelValue: any;
  disabled?: boolean;
  placeholder?: string;
  multiple?: boolean;
  allowClear?: boolean;
  collapseTagsTooltip?: boolean;
  minCollapsedNum?: number;
  size?: TreeSelectSize;
  checkStrictly?: boolean;
}

export interface TreeSelectEmits {
  (e: "update:modelValue", value: string | string[]): void;
  (e: "change", value: string | string[]): void;
  (e: "search", value: string | string[]): void;
}

const props = withDefaults(defineProps<TreeSelectProps>(), {
  disabled: false,
  multiple: false,
  allowClear: false,
  checkStrictly: true,
  collapseTagsTooltip: true,
  minCollapsedNum: 3,
  size: "md",
});

const singleValue = ref();
const multipleValue = ref([]);
const openState = ref(false);
const dropdownRef = ref();
const emits = defineEmits<TreeSelectEmits>();

const selectedValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
    emits("change", value);
  },
});

const checkedKeys = computed({
  get() {
    return props.multiple ? props.modelValue : [];
  },
  set(value) {
    if (props.multiple) {
      emits("update:modelValue", value);
      emits("change", value);
    }
  },
});

watch(
  selectedValue,
  () => {
    if (props.multiple) {
      multipleValue.value = selectedValue.value.map((value: any) => {
        const node: any = getNode(props.data, value);
        if (node) {
          node.label = node.title;
          node.value = node.id;
          node.closable = !node.disabled;
          return node;
        }
      });
    } else {
      const node: any = getNode(props.data, selectedValue.value);
      if (node) {
        singleValue.value = node.title;
      }
    }
  },
  { immediate: true, deep: true }
);

const onClear = function () {
  if (props.multiple) {
    emits("update:modelValue", []);
  } else {
    emits("update:modelValue", "");
  }
};

const handleClick = (node: any) => {
  dropdownRef.value.hide();
  selectedValue.value = node.id;
};

const handleRemove = (value: any) => {
  emits(
    "update:modelValue",
    checkedKeys.value.filter((item: any) => item != value)
  );
};

// 判断值的实时状态
const hasContent = computed(() => {
  if (Array.isArray(selectedValue)) {
    return selectedValue.value.length > 0;
  } else {
    return selectedValue.value != "";
  }
});

const _placeholder = computed(() => {
  return hasContent.value ? '' : props.placeholder;
})
</script>

<template>
  <div
    class="layui-tree-select"
    :class="{
      'layui-disabled': disabled,
      'has-content': hasContent,
      'has-clear': allowClear,
    }"
  >
    <lay-dropdown
      ref="dropdownRef"
      :disabled="disabled"
      :update-at-scroll="true"
      @show="openState = true"
      @hide="openState = false"
    >
      <lay-tag-input
        :size="size"
        :allow-clear="allowClear"
        :placeholder="_placeholder"
        :collapseTagsTooltip="collapseTagsTooltip"
        :minCollapsedNum="minCollapsedNum"
        :disabledInput="true"
        @remove="handleRemove"
        @clear="onClear"
        v-model="multipleValue"
        v-if="multiple"
      >
        <template #suffix>
          <lay-icon
            type="layui-icon-triangle-d"
            :class="{ triangle: openState }"
          ></lay-icon>
        </template>
      </lay-tag-input>
      <lay-input
        v-else
        v-model="singleValue"
        :allow-clear="allowClear"
        :placeholder="_placeholder"
        :disabled="disabled"
        :readonly="true"
        :size="size"
        @clear="onClear"
      >
        <template #suffix>
          <lay-icon
            type="layui-icon-triangle-d"
            :class="{ triangle: openState }"
          ></lay-icon>
        </template>
      </lay-input>
      <template #content>
        <div class="layui-tree-select-content">
          <lay-tree
            :data="data"
            :onlyIconControl="true"
            :show-checkbox="multiple"
            :check-strictly="checkStrictly"
            v-model:selectedKey="selectedValue"
            v-model:checkedKeys="checkedKeys"
            @node-click="handleClick"
          ></lay-tree>
        </div>
      </template>
    </lay-dropdown>
  </div>
</template>
