<script lang="ts" setup>
import "./index.less";
import type { DropdownTeleportProps } from "../dropdown/interface";

import { StyleValue, computed, ref, watch, useSlots, provide } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { getNode } from "../../utils";
import { TreeSelectSize } from "./interface";
import { LayIcon } from "@layui/icons-vue";
import LayInput from "../input/index.vue";
import LayTagInput from "../tagInput/index.vue";
import LayDropdown from "../dropdown/index.vue";
import LayTree from "../tree/index.vue";
import useProps from "./index.hooks";
import { fillFieldNames } from "../tree/utils";
import {
  ReplaceFieldsOptionsOptional,
  LoadFunction,
  SearchNodeMethodType,
} from "../tree/tree.type";
import { LAYUI_TREE_SELECT } from "./useTreeSelect";

export interface TreeSelectProps {
  modelValue: any;
  data: any;
  size?: TreeSelectSize;
  multiple?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  placeholder?: string;
  checkStrictly?: boolean;
  collapseTagsTooltip?: boolean;
  minCollapsedNum?: number;
  search?: boolean;
  searchNodeMethod?: SearchNodeMethodType;
  lazy?: boolean;
  load?: LoadFunction;
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
  replaceFields?: ReplaceFieldsOptionsOptional;
  defaultExpandAll?: boolean;
  teleportProps?: DropdownTeleportProps;
  tailNodeIcon?: string;
}

export interface TreeSelectEmits {
  (e: "update:modelValue", value: string | string[]): void;

  (e: "change", value: string | string[]): void;

  (e: "search", value: string | string[]): void;
}

defineOptions({
  name: "LayTreeSelect",
});

const props = withDefaults(defineProps<TreeSelectProps>(), {
  disabled: false,
  multiple: false,
  allowClear: false,
  checkStrictly: true,
  collapseTagsTooltip: true,
  minCollapsedNum: 3,
  search: false,
  searchNodeMethod: (node: any, value: string) => {
    return node.title.includes(value);
  },
  defaultExpandAll: false,
});

const { size } = useProps(props);

const treeData = ref();
const searchValue = ref("");
const singleValue = ref("");
const multipleValue = ref([]);
const openState = ref(false);
const dropdownRef = ref();
const composing = ref(false);
const emits = defineEmits<TreeSelectEmits>();
const treeOriginData = ref();

const treeRef = ref();

const _replaceFields = computed(() => fillFieldNames(props.replaceFields));

const selectedValue = computed({
  get() {
    return props.multiple && props.modelValue == null ? [] : props.modelValue;
  },
  set(value) {
    if (props.modelValue !== value) {
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

const slots = useSlots();

watch(
  [selectedValue, checkedKeys, treeData],
  () => {
    const { id, title } = _replaceFields.value;
    if (props.multiple) {
      try {
        multipleValue.value = checkedKeys.value.map((value: any) => {
          let node: any = getNode(
            treeOriginData.value || props.data,
            value,
            _replaceFields.value
          );

          if (node) {
            node.label = node[title];
            node.value = node[id];
            node.closable = !node.disabled;
          }

          if (node == undefined) {
            node = {
              label: value,
              value: value,
              closable: true,
            };
          }
          return node;
        });
      } catch (e) {
        throw new Error("v-model / model-value is not an array type");
      }
    } else {
      /**
       * 根据 id 查找 node 节点
       *
       * 备注：如果找不到这个节点, 说明存在 BUG 或 空值, 对 singleValue 清空
       */
      const node: any = getNode(
        treeOriginData.value || props.data,
        selectedValue.value,
        _replaceFields.value
      );

      if (node) {
        singleValue.value = node[title];
      } else {
        singleValue.value = "";
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

/**
 * Tree 节点单击事件
 *
 * 备注：单选模式需要执行的逻辑，多选模式禁用。
 *
 * @param node 当前节点
 */
const handleClick = (node: any) => {
  if (!props.multiple) {
    dropdownRef.value.hide();
  }
};

/**
 * Tag 标签的删除事件
 *
 * 备注: 多选模式需要考虑 checkStrictly 为 false 的情况，删除当前节点，是否需要删除子节点, 如果为 true 时，仅删除当前节点
 */
const handleRemove = (value: any) => {
  // 关闭 dropdown 前置操作
  dropdownRef.value.hide();

  // 删除 checkedKeys 的逻辑
  if (props.checkStrictly) {
    emits(
      "update:modelValue",
      checkedKeys.value.filter((item: any) => item != value)
    );
  } else {
    // 当 checkStrictly 配置为 false 时, 删除内容为 当前节点 与 关联子集
    const node = getNode(props.data, value, _replaceFields.value);
    const nodeIds = filterNodeIds(node);
    emits(
      "update:modelValue",
      checkedKeys.value.filter((item: any) => !nodeIds.includes(item))
    );
  }
};

const filterNodeIds = (node: any) => {
  const nodeIds: any[] = [];
  const { id, children } = _replaceFields.value;

  function _findNodeIds(node: any, arr: any[]) {
    arr.push(node[id]);
    if (node[children]) {
      node[children].forEach((item: any) => {
        _findNodeIds(item, arr);
      });
    }
  }

  _findNodeIds(node, nodeIds);
  return nodeIds;
};

/**
 * 实时标识，是否存在数据
 *
 * 应用于多选模式 placeholder 属性的显示隐藏
 */
const hasContent = computed(() => {
  if (props.multiple) {
    return checkedKeys.value.length > 0;
  } else {
    return Array.isArray(selectedValue.value)
      ? selectedValue.value.length
      : selectedValue.value;
  }
});

const _placeholder = computed(() => {
  return hasContent.value ? "" : props.placeholder;
});

const onSearch = (value: string) => {
  if (composing.value) return;
  emits("search", value);
  searchValue.value = value;
};

const onCompositionstart = () => {
  composing.value = true;
};

const onCompositionend = (eventParam: Event) => {
  composing.value = false;
  onSearch((eventParam.target as HTMLInputElement).value);
};

// 监听 searchValue 刷新 tree 数据
watch(
  searchValue,
  useDebounceFn(() => {
    treeRef.value && treeRef.value.filter(searchValue.value);
  }, 500)
);

const treeFilter = (tree: any[], fn: Function) => {
  const { children } = _replaceFields.value;
  return tree
    .map((node) => ({ ...node }))
    .filter((node) => {
      node[children] = node[children] && treeFilter(node[children], fn);
      if (node[children] && node[children].length) node.spread = true;
      return (
        fn(node, searchValue.value) || (node[children] && node[children].length)
      );
    });
};

watch(openState, () => {
  if (!openState.value) {
    searchValue.value = "";
  }
});

watch(
  () => props.data,
  () => {
    if (props.data !== treeData.value) {
      treeData.value = props.data;
    }
  },
  { immediate: true, deep: true }
);

const inputEl = ref<HTMLInputElement | null>(null);

const setInputEl = (el: HTMLInputElement) => {
  if (props.search) {
    inputEl.value = el;
  }
};

provide(LAYUI_TREE_SELECT, {
  inputEl,
  setInputEl,
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
      :contentClass="contentClass"
      :contentStyle="contentStyle"
      :teleportProps="teleportProps"
      :click-to-close="false"
      @show="openState = true"
      @hide="openState = false"
    >
      <lay-tag-input
        v-if="multiple"
        v-model="multipleValue"
        :size="size"
        :allow-clear="allowClear"
        :placeholder="_placeholder"
        :collapseTagsTooltip="collapseTagsTooltip"
        :minCollapsedNum="minCollapsedNum"
        :disabledInput="!search"
        :inputValue="searchValue"
        @input-value-change="onSearch"
        @remove="handleRemove"
        @clear="onClear"
        @keyup.delete.capture.prevent.stop
        @keydown.enter.capture.prevent.stop
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
        :modelValue="singleValue"
        :allow-clear="allowClear"
        :placeholder="_placeholder"
        :disabled="disabled"
        :readonly="!search"
        :size="size"
        @clear="onClear"
        @input="onSearch"
        @compositionstart="onCompositionstart"
        @compositionend="onCompositionend"
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
            ref="treeRef"
            :data="treeData"
            v-model:treeOriginData="treeOriginData"
            :is-select="!multiple"
            :onlyIconControl="true"
            :show-checkbox="multiple"
            :check-strictly="checkStrictly"
            v-model:selectedKey="selectedValue"
            v-model:checkedKeys="checkedKeys"
            :tail-node-icon="tailNodeIcon"
            :replaceFields="_replaceFields"
            :defaultExpandAll="defaultExpandAll"
            :lazy="lazy"
            :load="load"
            :searchNodeMethod="searchNodeMethod"
            @node-click="handleClick"
          >
            <slot></slot>
          </lay-tree>
        </div>
      </template>
    </lay-dropdown>
  </div>
</template>
