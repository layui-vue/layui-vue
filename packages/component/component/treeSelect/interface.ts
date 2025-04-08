import type { DropdownTeleportProps } from "@layui/component/component/dropdown/interface";
import type {
  LoadFunction,
  ReplaceFieldsOptionsOptional,
  SearchNodeMethodType,
  TreeProps,
} from "@layui/component/component/tree/interface";

import type { StyleValue } from "vue";

export type TreeSelectSize = "lg" | "md" | "sm" | "xs";

export interface TreeSelectProps {
  modelValue: TreeProps["checkedKeys"] | TreeProps["selectedKey"];
  data: NonNullable<TreeProps["data"]>;
  size?: TreeSelectSize;
  multiple?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  placeholder?: string;
  checkStrictly?: boolean;
  collapseTagsTooltip?: boolean;
  minCollapsedNum?: number;
  search?: boolean;
  searchNodeMethod?: SearchNodeMethodType;
  lazy?: boolean;
  load?: LoadFunction;
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
  replaceFields?: ReplaceFieldsOptionsOptional;
  defaultExpandAll?: boolean;
  teleportProps?: DropdownTeleportProps;
  tailNodeIcon?: string;
  cacheData?: TreeProps["cacheData"];
}

export interface TreeSelectEmits {
  (e: "update:modelValue", value: TreeSelectProps["modelValue"]): void;

  (e: "change", value: TreeSelectProps["modelValue"]): void;

  (e: "search", value: string): void;
}
