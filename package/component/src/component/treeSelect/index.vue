<script lang="ts">
export default {
  name: "LayTreeSelect",
};
</script>

<script lang="ts" setup>
import "./index.less";
import { StyleValue, computed, ref, watch } from "vue";
import { getNode } from "../../utils/index";
import { TreeSelectSize } from "./interface";
import { LayIcon } from "@layui/icons-vue";
import LayInput from "../input/index.vue";
import LayTagInput from "../tagInput/index.vue";
import LayDropdown from "../dropdown/index.vue";
import LayTree from "../tree/index.vue";
import useProps from "./index.hooks";

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
  search?: boolean;
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
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
  search: false,
});

const { size } = useProps(props);

const treeData = ref();
const searchValue = ref();
const singleValue = ref();
const multipleValue = ref([]);
const openState = ref(false);
const dropdownRef = ref();
const composing = ref(false);
const emits = defineEmits<TreeSelectEmits>();

const selectedValue = computed({
  get() {
    return props.multiple && props.modelValue == null ? [] : props.modelValue;
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
  [selectedValue, treeData],
  () => {
    if (props.multiple) {
      try {
        multipleValue.value = selectedValue.value.map((value: any) => {
          var node: any = getNode(props.data, value);
          if (node) {
            node.label = node.title;
            node.value = node.id;
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
      const node: any = getNode(props.data, selectedValue.value);
      if (node) {
        singleValue.value = node.title;
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
    selectedValue.value = node.id;
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
    const node = getNode(props.data, value);
    const nodeIds = filterNodeIds(node);
    emits(
      "update:modelValue",
      checkedKeys.value.filter((item: any) => !nodeIds.includes(item))
    );
  }
};

const filterNodeIds = (node: any) => {
  const nodeIds: any[] = [];
  function _findNodeIds(node: any, arr: any[]) {
    arr.push(node.id);
    if (node.children) {
      node.children.forEach((item: any) => {
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

const handleSearch = (value: string) => {
  if (composing.value) return;
  emits("search", value);
  searchValue.value = value;
};

const onCompositionstart = () => {
  composing.value = true;
};

const onCompositionend = (eventParam: Event) => {
  composing.value = false;
  handleSearch((eventParam.target as HTMLInputElement).value);
};

// 监听 searchValue 刷新 tree 数据
watch(searchValue, () => {
  if (searchValue.value === "") {
    treeData.value = props.data;
  } else {
    treeData.value = treeFilter(props.data, (item: any) => {
      return item.title.indexOf(searchValue.value) > -1;
    });
  }
});

function treeFilter(tree: any[], func: Function) {
  return tree
    .map((node) => ({ ...node }))
    .filter((node) => {
      node.children = node.children && treeFilter(node.children, func);
      return func(node) || (node.children && node.children.length);
    });
}

watch(
  () => props.data,
  () => {
    treeData.value = props.data;
  },
  { immediate: true, deep: true }
);
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
        :disabledInput="!search"
        @input-value-change="handleSearch"
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
        :readonly="!search"
        :size="size"
        @clear="onClear"
        @Input="handleSearch"
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
            :data="treeData"
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
