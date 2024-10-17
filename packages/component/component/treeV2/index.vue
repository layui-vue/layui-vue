<template>
  <div :class="classes">
    <tree-node
      v-bind="props"
      :slots="slots"
      @node-click="handleNodeClick"
      @node-check="handleNodeCheck"
      @update-expanded-keys="handleUpdateExpandedKeys"
      @update-checked-keys="handleUpdateCheckedKeys"
      @update-selected-key="handleUpdateSelectedKey"
    ></tree-node>
  </div>
</template>

<script lang="ts" setup>
import "./index.less";
import { computed, provide, ref, useSlots, watch } from "vue";
import { TREE_CONTEXT, TreeData, TreeProps } from "./interface";
import { useTree } from "./index.hook";
import TreeNode from "./TreeNode.vue";

const slots = ref(useSlots());

watch(
  () => useSlots(),
  (s) => (slots.value = s)
);

const props = withDefaults(defineProps<TreeProps>(), {
  showCheckbox: false,
  edit: false,
  collapseTransition: true,
  checkStrictly: false,
  isSelect: true,
  onlyIconControl: false,
  standalone: false,
  disabled: false,
  showLine: true,
  tailNodeIcon: "layui-icon-file",
  checkedKeys: () => {
    return [];
  },
  defaultExpandAll: false,
  lazy: false,
});
const emit = defineEmits<{
  (e: "update:selected-key", key: string | number): void;
  (e: "update:checked-keys", key: Array<string | number>): void;
  (e: "update:expand-keys", key: Array<string | number>): void;
  (e: "node-click", node: TreeData): void;
  (e: "node-check", node: TreeData): void;
}>();

const context = useTree(props);
provide(TREE_CONTEXT, context);

const handleUpdateSelectedKey = (node: TreeData) =>
  emit("update:selected-key", node.id);
const handleNodeClick = (node: TreeData) => emit("node-click", node);
const handleUpdateCheckedKeys = (nodes: Array<string | number>) =>
  emit("update:checked-keys", nodes);
const handleUpdateExpandedKeys = (nodes: Array<string | number>) =>
  emit("update:expand-keys", nodes);
const handleNodeCheck = (nodes: TreeData) => emit("node-check", nodes);

const classes = computed(() => [
  "layui-tree",
  `layui-tree-${props.showLine ? "line" : "unline"}`,
]);

defineOptions({
  name: "LayTreeV2",
});

const getTree = () => context._tree.value;
const getNodes = () => context._flatTree.value;
const getCheckedPath = () => context.checkedPath.value;
const getCheckedTitle = () => context.checkedTitle.value;
const getCheckedTitlePath = () => context.checkedTitlePath.value;

defineExpose({
  getTree,
  getNodes,
  getCheckedPath,
  getCheckedTitle,
  getCheckedTitlePath,
});
</script>
