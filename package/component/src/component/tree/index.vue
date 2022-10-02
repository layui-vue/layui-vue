<script lang="ts">
export default {
  name: "LayTree",
};
</script>

<script lang="ts" setup>
import TreeNode from "./TreeNode.vue";
import { computed, useSlots, watch, ref, onMounted, nextTick } from "vue";
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
  checkStrictly?: boolean;
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
  checkedKeys: () => {
    return [];
  },
  showCheckbox: false,
  edit: false,
  collapseTransition: true,
  checkStrictly: false,
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

let tree = ref();
let nodeList = ref();
const unWatch = ref(false);
const initStatus = ref(false);

const loadNodeList = () => {
  let { tree: _tree, nodeList: _nodeList } = useTree(props, emit);
  tree.value = _tree;
  nodeList.value = _nodeList.value;
};

watch(
  () => props.data,
  () => {
    loadNodeList();
  },
  { deep: true, immediate: true }
);

watch(
  () => props.checkedKeys,
  () => {
    if (!unWatch.value) {
      loadNodeList();
    }
  }
);

watch(
  tree,
  () => {
    if (initStatus.value) {
      const { checkedKeys } = tree.value.getKeys();
      unWatch.value = true;
      emit("update:checkedKeys", checkedKeys);
      setTimeout(() => {
        unWatch.value = false;
      }, 0);
    }
  },
  { deep: true }
);

onMounted(() => {
  nextTick(() => {
    initStatus.value = true;
  });
});

function handleClick(node: TreeData) {
  const originNode = tree.value.getOriginData(node.id);
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
      :check-strictly="checkStrictly"
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
