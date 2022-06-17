<script lang="ts">
export default {
  name: "LayTree",
};
</script>

<script lang="ts" setup>
import TreeNode from "./TreeNode.vue";
import { computed, useSlots } from "vue";
import { useTree } from "./useTree";
import { TreeData } from "./tree";
import { StringFn, StringOrNumber, KeysType, EditType } from "./tree.type";
import "./index.less";

export interface OriginalTreeData {
  title: StringFn | string;
  id: StringOrNumber;
  field: StringFn | string;
  children?: OriginalTreeData[];
  disabled?: boolean;
}

export interface TreeProps {
  checkedKeys?: KeysType;
  data: OriginalTreeData;
  showCheckbox?: boolean;
  edit?: EditType;
  collapseTransition?: boolean;
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
  collapseTransition: false,
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

const slots = useSlots();

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
      :collapse-transition="collapseTransition"
      :only-icon-control="onlyIconControl"
      @node-click="handleClick"
    >
      <template v-if="slots.title">
        <slot name="title" :data="data"></slot>
      </template>
    </tree-node>
  </div>
</template>
