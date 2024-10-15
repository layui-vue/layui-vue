import type { TreeEmits, TreeProps, ReplaceFieldsOptions } from "./tree.type";
import type { ComputedRef } from "vue";
import { computed, watch } from "vue";

import { Tree, TreeData } from "./tree";

export declare type UseTree = (
  props: TreeProps,
  emit: TreeEmits,
  replaceFields: ReplaceFieldsOptions
) => {
  tree: Tree;
  nodeList: ComputedRef<TreeData[]>;
};

export const useTree: UseTree = (
  props: TreeProps,
  emit: TreeEmits,
  replaceFields: ReplaceFieldsOptions
) => {
  const tree = new Tree(
    {
      nodeMap: new Map(),
      originMap: new Map(),
      replaceFields: replaceFields as ReplaceFieldsOptions,
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

  watch(
    () => props.checkedKeys,
    () => {
      const { id } = replaceFields;
      const nodes = nodeList.value;
      tree.treeForeach(nodes, (child: TreeData) => {
        if (!props.checkedKeys?.includes(child[id])) {
          child.isChecked = false;
        }
      });

      tree.refreshData(nodes);
    }
  );

  return {
    tree,
    nodeList,
  };
};
