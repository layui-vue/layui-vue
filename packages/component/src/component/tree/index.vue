<script lang="ts" setup>
import TreeNode from "./TreeNode.vue";
import { computed, watch, ref, onMounted, nextTick } from "vue";
import { useTree } from "./useTree";
import { TreeData } from "./tree";
import {
  StringFn,
  StringOrNumber,
  KeysType,
  EditType,
  ReplaceFieldsOptionsOptional,
  LoadFunction,
} from "./tree.type";
import { fillFieldNames } from "./utils";
import "./index.less";

export interface OriginalTreeData {
  title: StringFn | string;
  id: StringOrNumber;
  children?: OriginalTreeData[];
  disabled?: boolean;
  [key: string]: any;
}

export interface TreeProps {
  data: OriginalTreeData | OriginalTreeData[];
  treeOriginData?: TreeData[];
  disabled?: boolean;
  edit?: EditType;
  checkedKeys?: KeysType;
  expandKeys?: KeysType;
  checkStrictly?: boolean | string;
  collapseTransition?: boolean;
  onlyIconControl?: boolean;
  selectedKey?: any;
  showLine?: boolean;
  showCheckbox?: boolean;
  replaceFields?: ReplaceFieldsOptionsOptional;
  tailNodeIcon?: string | boolean;
  isSelect?: boolean;
  defaultExpandAll?: boolean;
  lazy?: boolean;
  load?: LoadFunction;
}

interface TreeEmits {
  (e: "update:expandKeys", keys: KeysType): void;
  (e: "update:checkedKeys", keys: KeysType): void;
  (e: "node-click", node: OriginalTreeData): void;
  (e: "update:selectedKey", id: string | number): void;
  (e: "update:treeOriginData", treeOriginData: TreeData[]): void;
}

defineOptions({
  name: "LayTree",
});

const props = withDefaults(defineProps<TreeProps>(), {
  showCheckbox: false,
  edit: false,
  collapseTransition: true,
  checkStrictly: false,
  isSelect: true,
  onlyIconControl: false,
  disabled: false,
  showLine: true,
  tailNodeIcon: "layui-icon-file",
  checkedKeys: () => {
    return [];
  },
  defaultExpandAll: false,
  lazy: false,
});

const emit = defineEmits<TreeEmits>();

const className = computed(() => {
  return {
    "layui-tree": true,
    "layui-form": props.showCheckbox,
    "layui-tree-line": props.showLine,
    "layui-tree-unline": !props.showLine,
  };
});

const _replaceFields = computed(() => fillFieldNames(props.replaceFields));

let tree = ref();
let nodeList = ref();
const unWatch = ref(false);
const initStatus = ref(false);

const loadNodeList = () => {
  let { tree: _tree, nodeList: _nodeList } = useTree(
    Object.assign({}, props, { replaceFields: _replaceFields.value }),
    emit
  );
  tree.value = _tree;
  nodeList.value = _nodeList.value;
};

watch(
  () => props.data,
  () => {
    if (!unWatch.value) {
      loadNodeList();
    }
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
  () => props.expandKeys,
  () => {
    if (!unWatch.value) {
      loadNodeList();
    }
  }
);

const lastExpandKey = ref<KeysType>([]);
const lastCheckedKey = ref<KeysType>([]);

watch(
  tree,
  () => {
    if (initStatus.value) {
      const { checkedKeys, expandKeys } = tree.value.getKeys();
      unWatch.value = true;
      // checkedKeys 比较
      if (String(lastCheckedKey.value) != String(checkedKeys)) {
        lastCheckedKey.value = checkedKeys;
        emit("update:checkedKeys", checkedKeys);
      }
      // expandKeys 比较
      if (String(lastExpandKey) != String(expandKeys)) {
        lastExpandKey.value = expandKeys;
        emit("update:expandKeys", expandKeys);
      }
      setTimeout(() => {
        unWatch.value = false;
      }, 0);

      // todo
      // 新增懒加载不修改源数据
      // 暂时用于TreeSelect生成multipleValue.value | singleValue
      emit("update:treeOriginData", tree.value.treeData);
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
  const originNode = tree.value.getOriginData(node[_replaceFields.value.id]);
  if (props.isSelect) {
    emit("update:selectedKey", node[_replaceFields.value.id]);
  }
  emit("node-click", originNode);
}

const selectedKey = ref(props.selectedKey);

watch(
  () => props.selectedKey,
  () => {
    selectedKey.value = props.selectedKey;
  }
);
</script>
<template>
  <div :class="className">
    <tree-node
      :tree="tree"
      :node-list="nodeList"
      :show-checkbox="showCheckbox"
      :show-line="showLine"
      :selectedKey="selectedKey"
      :check-strictly="checkStrictly"
      :collapse-transition="collapseTransition"
      :only-icon-control="onlyIconControl"
      :tail-node-icon="tailNodeIcon"
      :replace-fields="_replaceFields"
      :load="load"
      @node-click="handleClick"
    >
      <template v-if="$slots.title" #title="{ data }">
        <slot name="title" :data="data"></slot>
      </template>
    </tree-node>
  </div>
</template>
