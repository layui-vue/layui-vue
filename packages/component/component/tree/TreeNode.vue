<script setup lang="ts">
import type { Tree, TreeData as _TreeData } from "./tree";

import { LayIcon } from "@layui/icons-vue";
import LayCheckbox from "../checkboxV2/index.vue";
import { computed, nextTick } from "vue";
import LayTransition from "../transition/index.vue";
import {
  ReplaceFieldsOptions,
  LoadFunction,
  OriginalTreeData,
} from "./tree.type";

import { useTreeSelectProvide } from "../treeSelect/useTreeSelect";

export type TreeData = _TreeData;

export interface TreeNodeProps {
  tree: Tree;
  nodeList: TreeData[];
  showCheckbox: boolean;
  showLine: boolean;
  selectedKey: any;
  checkStrictly: boolean | string;
  collapseTransition: boolean;
  onlyIconControl: boolean;
  tailNodeIcon: string | boolean;
  replaceFields: ReplaceFieldsOptions;
  load?: LoadFunction;
}

interface TreeNodeEmits {
  (e: "node-click", node: TreeData): void;
  (e: "check-change", node: TreeData, checked: boolean): void;
}

defineOptions({
  name: "TreeNode",
});

const props = defineProps<TreeNodeProps>();
const emit = defineEmits<TreeNodeEmits>();

function renderLineShort(node: TreeData) {
  const { children } = props.replaceFields;
  return (
    !node.hasNextSibling &&
    node.parentNode &&
    // 外层最后一个
    (!node.parentNode.hasNextSibling ||
      //上一层父级有延伸线
      (node.parentNode.hasNextSibling && !node.parentNode[children]))
  );
}
/**
 * 展开收起 icon样式
 * @param node
 */
const nodeIconType = (node: TreeData): string => {
  const { children } = props.replaceFields;

  if (!props.showLine) {
    if (node[children].length > 0 || node.isLazy) {
      return !node.isLeaf ? "layui-icon-triangle-r" : "layui-icon-triangle-d";
    }
    return "";
  }
  if (node[children]?.length > 0 || node.isLazy) {
    return !node.isLeaf ? "layui-icon-addition" : "layui-icon-subtraction";
  }
  if (props.tailNodeIcon) {
    return props.tailNodeIcon as string;
  }
  return "";
};

function recursiveNodeClick(node: TreeData) {
  emit("node-click", node);
}

const handleCheckChange = (node: TreeData, checked: boolean) => {
  emit("check-change", node, checked);
};

const treeSelectContext = useTreeSelectProvide();

function handleChange(checked: boolean, node: TreeData) {
  props.tree.setCheckedKeys(checked, props.checkStrictly, node);
  emit("check-change", node, checked);
  treeSelectContext &&
    treeSelectContext?.inputEl &&
    treeSelectContext?.inputEl.value?.focus();
}

function handleIconClick(node: TreeData) {
  const { id, children } = props.replaceFields;

  const Id = node[id];
  const originNode = props.tree.getOriginData(Id);
  const hasChildren = node[children] && node[children].length > 0;

  if (props.load && node.isLazy && !hasChildren) {
    node.isLoading = true;
    props.load(originNode, (data: OriginalTreeData[]) => {
      // todo
      // 不修改tree组件中props.data源数据
      const tree = props.tree.createTree(data, Id);
      Reflect.set(node, children, tree);

      node.isLoading = false;
      node.isLazy = false;
      nextTick(() => {
        node.isLeaf = !node.isLeaf;
      });
    });
  } else {
    hasChildren && (node.isLeaf = !node.isLeaf);
  }
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
    const { children } = props.replaceFields;

    let res = false; // true为半选 false为全选
    for (const item of node[children] || []) {
      if (item.isChecked) {
        res = true;
      }
    }

    if (!res && node[children]?.length) {
      for (const item of node[children] || []) {
        res = _isChildAllSelected(item);
        if (res) break;
      }
    }
    return res;
  }

  return (node: TreeData): boolean => {
    if (props.checkStrictly || !props.showCheckbox) {
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
    v-show="node.visible"
    v-for="(node, nodeIndex) in nodeList"
    :key="nodeIndex"
    :class="{
      'layui-tree-set': true,
      'layui-tree-setLineShort': renderLineShort(node),
      'layui-tree-setHide': node.isRoot,
    }"
  >
    <div
      class="layui-tree-entry"
      :class="{ 'layui-this': selectedKey === node[replaceFields.id] }"
      @click="handleRowClick(node)"
    >
      <div class="layui-tree-main">
        <span
          :class="[
            showLine &&
            (node[replaceFields.children]?.length > 0 || node.isLazy)
              ? 'layui-tree-icon'
              : '',
            { 'layui-tree-iconClick': true },
            {
              'layui-tree-icon-standalone':
                nodeIconType(node).length &&
                node.isLeaf &&
                !node[replaceFields.children]?.length,
            },
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
          @change="(checked: boolean) => handleChange(checked, node)"
          v-if="showCheckbox"
        />
        <lay-icon
          v-if="node.isLoading"
          class="layui-tree-loading layui-anim layui-anim-rotate layui-anim-loop"
          type="layui-icon-loading"
        />
        <span
          :class="{
            'layui-tree-txt': true,
            'layui-disabled': node.isDisabled,
          }"
          @click.stop="handleTitleClick(node)"
        >
          <slot name="title" :data="node">{{
            node[props.replaceFields.title]
          }}</slot>
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
          :node-list="node[replaceFields.children] || []"
          :show-checkbox="showCheckbox"
          :show-line="showLine"
          :selected-key="selectedKey"
          :collapse-transition="collapseTransition"
          :checkStrictly="checkStrictly"
          :only-icon-control="onlyIconControl"
          :tail-node-icon="tailNodeIcon"
          :replace-fields="replaceFields"
          :load="load"
          @node-click="recursiveNodeClick"
          @check-change="handleCheckChange"
        >
          <template v-if="$slots.title" #title="slotProp: { data: any }">
            <slot name="title" :data="slotProp.data"></slot>
          </template>
        </tree-node>
      </div>
    </lay-transition>
  </div>
</template>
