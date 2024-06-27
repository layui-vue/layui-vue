import type { TreeEmits, TreeProps, ReplaceFieldsOptions } from "./tree.type";
import type { ComputedRef } from "vue";
import { computed } from "vue";

import { Tree, TreeData } from "./tree";

export declare type UseTree = (
  props: TreeProps,
  emit: TreeEmits
) => {
  tree: Tree;
  nodeList: ComputedRef<TreeData[]>;
};

export const useTree: UseTree = (props: TreeProps, emit: TreeEmits) => {
  const tree = new Tree(
    {
      nodeMap: new Map(),
      originMap: new Map(),
      replaceFields: props.replaceFields as ReplaceFieldsOptions,
      showCheckbox: props.showCheckbox ?? false,
      checkedKeys: props.checkedKeys ?? [],
      expandKeys: props.expandKeys ?? [],
      checkStrictly: props.checkStrictly ?? false,
      defaultExpandAll: props.defaultExpandAll ?? false,
      lazy: props.lazy ?? false,
      searchNodeMethod: props.searchNodeMethod!,
    },
    props.data
  );

  const nodeList = computed(() => {
    const nodes = tree.getData();
    return nodes;
  });

  return {
    tree,
    nodeList,
  };
};
