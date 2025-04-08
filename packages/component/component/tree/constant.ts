import type { InjectionKey, Slots } from "vue";
import type { UseTreeReturn } from "./hooks/useTree";
import type { TreeEmits } from "./interface";

export const treeReplaceFields = {
  id: "id",
  title: "title",
  parent: "parent",
  checked: "checked",
  children: "children",
  disabled: "disabled",
  expanded: "spread",
  leaf: "leaf",
};

interface LayTreeContextType {
  treeEmits: TreeEmits;
  treeSlots: Slots;

  useTreeData: UseTreeReturn;
}

export const LAY_TREE_CONTEXT: InjectionKey<LayTreeContextType> = Symbol("LayTreeContext");
