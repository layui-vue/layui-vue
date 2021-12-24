<!--
 * @Date: 2021-10-16 13:22:38
 * @LastEditors: 落小梅
 * @LastEditTime: 2021-10-16 13:53:14
 * @FilePath: \layui-vue\src\module\tree\new-tree\index.vue
-->
<script lang="ts">
export default {
  name: "LayTree",
};

// import { TreeEmits, TreeProps as Tp } from './tree.type'
</script>
<script lang="ts" setup>
import TreeNode from "./TreeNode.vue";
import { computed } from "vue";
import { useTree } from "./useTree";
import { TreeData } from "./tree";

type StringFn = () => string;
type StringOrNumber = string | number;
type KeysType = (number | string)[];
type EditType = boolean | ("add" | "update" | "delete");

interface OriginalTreeData {
  title: StringFn | string;
  id: StringOrNumber;
  field: StringFn | string;
  children?: OriginalTreeData[];
  disabled?: boolean;
}

interface TreeProps {
  checkedKeys?: KeysType;
  data: OriginalTreeData;
  showCheckbox?: boolean;
  edit?: EditType;
  accordion?: boolean;
  onlyIconControl?: boolean;
  showLine?: boolean;
  disabled?: boolean;
  replaceFields?: {
    id?: string;
    children?: string;
    title?: string;
  };
}

interface TreeEmits {
  (e: "update:checkedKeys", keys: KeysType): void;
  (e: "update:expandKeys", keys: KeysType): void;
  (e: "node-click", node: OriginalTreeData): void;
}

const props = withDefaults(defineProps<TreeProps>(), {
  showCheckbox: false,
  edit: false,
  accordion: false,
  onlyIconControl: false,
  disabled: false,
  showLine: true,
  replaceFields: () => {
    return {
      id: "id",
      children: "children",
      title: "title",
    };
  },
});

const emit = defineEmits<TreeEmits>();

const className = computed(() => {
  return {
    "layui-tree": true,
    "layui-form": props.showCheckbox,
    "layui-tree-line": props.showLine,
  };
});

const { tree, nodeList } = useTree(props, emit);

function handleClick(node: TreeData) {
  const originNode = tree.getOriginData(node.id);
  emit("node-click", originNode);
}
</script>
<template>
  <div :class="className">
    <tree-node
      :tree="tree"
      :node-list="nodeList"
      :show-checkbox="showCheckbox"
      :show-line="showLine"
      :only-icon-control="onlyIconControl"
      @node-click="handleClick"
    ></tree-node>
  </div>
</template>
