import type { TreeData } from "./tree";

export type StringFn = () => string;
export type StringOrNumber = string | number;
export type KeysType = (number | string)[];
export type EditType = boolean | ("add" | "update" | "delete");

export interface OriginalTreeData {
  title: StringFn | string;
  id: StringOrNumber;
  children?: OriginalTreeData[];
  disabled?: boolean;
  [key: string]: any;
}

export interface ReplaceFieldsOptions {
  id: string;
  children: string;
  title: string;
}

export interface ReplaceFieldsOptionsOptional {
  id?: string;
  children?: string;
  title?: string;
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
  searchNodeMethod?: SearchNodeMethodType;
}

export interface TreeEmits {
  (e: "update:checkedKeys", keys: KeysType): void;
  (e: "update:expandKeys", keys: KeysType): void;
  (e: "node-click", node: OriginalTreeData, eventParam: Event): void;
}

export type CustomKey = string | number;
export type CustomString = (() => string) | string;

export type LoadFunction = (
  rootNode: OriginalTreeData,
  loadedCallback: (data: OriginalTreeData[]) => void
) => void;

export type SearchNodeMethodType = (node: any, value: string) => boolean;
