<script lang="ts" setup>
import type { TreeProps as _TreeProps, OriginalTreeData, TreeEmits } from "./interface";
import { computed, provide, useSlots } from "vue";
import { LAY_TREE_CONTEXT } from "./constant";
import { useTree } from "./hooks/useTree";

import TreeNode from "./TreeNode.vue";
import "./index.less";

export type TreeProps = _TreeProps;

defineOptions({
  name: "LayTree",
});

const props = withDefaults(defineProps<TreeProps>(), {
  showCheckbox: false,
  collapseTransition: true,
  checkStrictly: false,
  onlyIconControl: false,
  standalone: false,
  showLine: true,
  tailNodeIcon: "layui-icon-file",
  checkedKeys: () => {
    return [];
  },
  expandKeys: () => {
    return [];
  },
  defaultExpandAll: undefined,
  lazy: false,
});

const emits = defineEmits<TreeEmits>();
const slots = useSlots();

const context = useTree(props, emits);

const classes = computed(() => [
  "layui-tree",
  `layui-tree-${props.showLine ? "line" : "unline"}`,
  props.showCheckbox && "layui-form",
]);

provide(LAY_TREE_CONTEXT, {
  treeEmits: emits,
  treeSlots: slots,

  useTreeData: context,
});

const getTree = () => context.treeData;

const getFlatTree = () => context.flatTree;

function getNode() {
  return (val: OriginalTreeData["id"]) => {
    const node = context.findNode(val);

    return node && node.original;
  };
}

function filter(value: string) {
  if (!props.searchNodeMethod) {
    throw new Error("[Layui-vue/Tree] filterNodeMethod为空");
  }
  context.filter(value);
}

defineExpose({
  filter,

  getTree,
  getFlatTree,
  getNode,
});
</script>

<template>
  <div :class="classes">
    <TreeNode
      v-bind="props"
      :tree="context.treeData.value"
    />
  </div>
</template>
