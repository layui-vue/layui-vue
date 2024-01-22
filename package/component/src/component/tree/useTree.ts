import { TreeEmits, TreeProps } from "./tree.type";
import { computed, ComputedRef } from "vue";
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
      replaceFields: props.replaceFields,
      showCheckbox: props.showCheckbox ?? false,
      checkedKeys: props.checkedKeys ?? [],
      expandKeys: props.expandKeys ?? [],
      checkStrictly: props.checkStrictly ?? false,
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
