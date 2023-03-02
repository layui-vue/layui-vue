<script lang="ts">
export default {
  name: "TreeNode",
};
</script>

<script setup lang="ts">
import { LayIcon } from "@layui/icons-vue";
import LayCheckbox from "../checkbox/index.vue";
import { computed, Ref, useSlots } from "vue";
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
  isChecked: boolean;
  isDisabled: boolean;
  isLeaf: boolean;
  hasNextSibling: boolean;
  parentNode: Nullable<TreeData>;
}

export interface TreeNodeProps {
  tree: Tree;
  nodeList: TreeData[];
  showCheckbox: boolean;
  showLine: boolean;
  selectedKey: any;
  checkStrictly: boolean | string;
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
    return !node.isLeaf ? "layui-icon-addition" : "layui-icon-subtraction";
  }
  return "layui-icon-file";
};

function recursiveNodeClick(node: TreeData) {
  emit("node-click", node);
}

function handleChange(checked: boolean, node: TreeData) {
  props.tree.setCheckedKeys(checked, props.checkStrictly, node);
}

function handleIconClick(node: TreeData) {
  node.isLeaf = !node.isLeaf;
}

function handleTitleClick(node: TreeData) {
  if (!props.onlyIconControl) {
    handleIconClick(node);
  }
  if (!node.isDisabled) {
    emit("node-click", node);
  }
}

function handleRowClick(node: TreeData) {
  if (!props.showLine) {
    handleTitleClick(node);
  }
}

/**
 * is-all-selected
 */
const isChildAllSelected = computed(() => {
  function _isChildAllSelected(node: TreeData): boolean {
    if (!props.showCheckbox) {
      return false;
    }
    let childSelectNum = 0;
    let res = false; // true为半选 false为全选
    for (const item of node.children) {
      if (item.isChecked) childSelectNum++;
    }
    if (childSelectNum > 0) node.isChecked = true; //此处的处理与 checkedKeys 有关联
    if (childSelectNum == node.children.length) {
      //继续递归向下判断
      for (const item of node.children) {
        res = _isChildAllSelected(item);
        if (res) break;
      }
    } else {
      res = true;
    }
    return res;
  }

  return (node: TreeData): boolean => {
    if (props.checkStrictly) {
      return false;
    } else {
      let res = _isChildAllSelected(node);
      return res;
    }
  };
});
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
    <div class="layui-tree-entry" @click="handleRowClick(node)">
      <div class="layui-tree-main">
        <span
          :class="[
            showLine && node.children.length > 0 ? 'layui-tree-icon' : '',
            { 'layui-tree-iconClick': true },
          ]"
        >
          <lay-icon
            :type="nodeIconType(node)"
            @click.stop="handleIconClick(node)"
          />
        </span>
        <lay-checkbox
          value=""
          skin="primary"
          :modelValue="node.isChecked"
          :disabled="node.isDisabled"
          :isIndeterminate="isChildAllSelected(node)"
          @change="(checked) => handleChange(checked, node)"
          v-if="showCheckbox"
        />
        <span
          :class="{
            'layui-tree-txt': true,
            'layui-disabled': node.isDisabled,
            'layui-this': selectedKey === node.id,
          }"
          @click.stop="handleTitleClick(node)"
        >
          <slot name="title" :data="node">{{ node.title }}</slot>
        </span>
      </div>
    </div>
    <lay-transition :enable="collapseTransition">
      <div
        v-if="node.isLeaf"
        class="layui-tree-pack layui-tree-showLine"
        style="display: block"
      >
        <tree-node
          :tree="tree"
          :node-list="node.children"
          :show-checkbox="showCheckbox"
          :show-line="showLine"
          :selected-key="selectedKey"
          :collapse-transition="collapseTransition"
          :checkStrictly="checkStrictly"
          :only-icon-control="onlyIconControl"
          @node-click="recursiveNodeClick"
        >
          <template v-if="$slots.title" v-slot:title="slotProp: { data: any }">
            <slot name="title" :data="slotProp.data"></slot>
          </template>
        </tree-node>
      </div>
    </lay-transition>
  </div>
</template>
