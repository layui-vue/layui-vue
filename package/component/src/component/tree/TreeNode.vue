<script lang="ts">
export default {
  name: "TreeNode",
};
</script>

<script setup lang="ts">
import { LayIcon } from "@layui/icons-vue";
import LayCheckbox from "../checkbox/index.vue";
import { Ref, useSlots } from "vue";
import { Tree } from "./tree";
import { Nullable } from "../../types";
import LayTransition from "../transition/index.vue";
import { StringOrNumber, CustomKey, CustomString } from "./tree.type";

export interface TreeData {
  id: CustomKey;
  title: CustomString;
  children: TreeData[];
  parentKey: Nullable<StringOrNumber>;
  isRoot: boolean;
  isChecked: Ref<boolean>;
  isDisabled: Ref<boolean>;
  isLeaf: Ref<boolean>;
  hasNextSibling: boolean;
  parentNode: Nullable<TreeData>;
}

export interface TreeNodeProps {
  tree: Tree;
  nodeList: TreeData[];
  showCheckbox: boolean;
  showLine: boolean;
  collapseTransition: boolean;
  onlyIconControl: boolean;
}

interface TreeNodeEmits {
  (e: "node-click", node: TreeData): void;
}

const slots = useSlots();
const props = defineProps<TreeNodeProps>();
const emit = defineEmits<TreeNodeEmits>();

function renderLineShort(node: TreeData) {
  return (
    !node.hasNextSibling &&
    node.parentNode &&
    // 外层最后一个
    (!node.parentNode.hasNextSibling ||
      //上一层父级有延伸线
      (node.parentNode.hasNextSibling && !node.parentNode.children))
  );
}
/**
 * 展开收起 icon样式
 * @param node
 */
const nodeIconType = (node: TreeData): string => {
  if (!props.showLine) {
    if (node.children.length > 0) {
      return "layui-tree-iconArrow ";
    }
    return "";
  }
  if (node.children.length !== 0) {
    return !node.isLeaf.value
      ? "layui-icon-addition"
      : "layui-icon-subtraction";
  }
  return "layui-icon-file";
};

function recursiveNodeClick(node: TreeData) {
  emit("node-click", node);
}

function handleChange(checked: boolean, node: TreeData) {
  props.tree.setCheckedKeys(checked, node);
}

function handleIconClick(node: TreeData) {
  node.isLeaf.value = !node.isLeaf.value;
}

function handleTitleClick(node: TreeData) {
  if (!props.onlyIconControl) {
    handleIconClick(node);
  }
  emit("node-click", node);
}
</script>

<template>
  <div
    v-for="(node, nodeIndex) in nodeList"
    :key="nodeIndex"
    :class="{
      'layui-tree-set': true,
      'layui-tree-setLineShort': renderLineShort(node),
      'layui-tree-setHide': node.isRoot,
    }"
  >
    <div class="layui-tree-entry">
      <div class="layui-tree-main">
        <span
          :class="[
            showLine && node.children.length > 0 ? 'layui-tree-icon' : '',
            { 'layui-tree-iconClick': true },
          ]"
        >
          <lay-icon :type="nodeIconType(node)" @click="handleIconClick(node)" />
        </span>
        <lay-checkbox
          v-if="showCheckbox"
          :modelValue="node.isChecked.value"
          :disabled="node.isDisabled.value"
          skin="primary"
          label=""
          @change="
            (checked) => {
              handleChange(checked, node);
            }
          "
        />
        <span
          :class="{
            'layui-tree-txt': true,
            'layui-disabled': node.isDisabled.value,
          }"
          @click="handleTitleClick(node)"
        >
          <template v-if="slots.title">
            <slot name="title" :data="node"></slot>
          </template> 
          <template v-else>
            {{ node.title }}
          </template>
        </span>
      </div>
    </div>
    <lay-transition :enable="collapseTransition">
      <div
        v-if="node.isLeaf.value"
        class="layui-tree-pack layui-tree-showLine"
        style="display: block"
      >
        <tree-node
          :node-list="node.children"
          :show-checkbox="showCheckbox"
          :show-line="showLine"
          :collapse-transition="collapseTransition"
          :tree="tree"
          :only-icon-control="onlyIconControl"
          @node-click="recursiveNodeClick"
        >
          <template v-if="slots.title" v-slot:title="{ data }">
            <slot name="title" :data="data"></slot>
          </template>
        </tree-node>
      </div>
    </lay-transition>
  </div>
</template>
