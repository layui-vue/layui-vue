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
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "search", value: string): void;
}

const props = withDefaults(defineProps<TreeSelectProps>(), {
  disabled: false,
  placeholder: "请选择",
  multiple: false,
  allowClear: false,
  collapseTagsTooltip: true,
  minCollapsedNum: 3,
  checkStrictly: true,
  size: "md",
});

const singleValue = ref();
const multipleValue = ref(["1"]);
const openState = ref(false);
const dropdownRef = ref();
const emits = defineEmits<TreeSelectEmits>();

const selectedValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (!props.multiple) {
      emits("update:modelValue", value);
      emits("change", value);
    }
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
        node.label = node.title;
        node.closable = !node.disabled;
        return node;
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
    selectedValue.value = [];
  } else {
    selectedValue.value = "";
  }
};

const handleClick = (node: any) => {
  dropdownRef.value.hide();
  selectedValue.value = node.id;
};

// 判断值的实时状态
const hasContent = computed(() => {
  if (Array.isArray(selectedValue)) {
    return selectedValue.value.length > 0;
  } else {
    return selectedValue.value != "";
  }
});
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
        :placeholder="placeholder"
        :collapseTagsTooltip="collapseTagsTooltip"
        :minCollapsedNum="minCollapsedNum"
        :disabledInput="true"
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
        :placeholder="placeholder"
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
