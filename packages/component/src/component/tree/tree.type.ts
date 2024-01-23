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
  checkedKeys?: KeysType;
  expandKeys?: KeysType;
  checkStrictly?: boolean | string;
  showCheckbox?: boolean;
  edit?: EditType;
  collapseTransition?: boolean;
  onlyIconControl?: boolean;
  showLine?: boolean;
  replaceFields: ReplaceFieldsOptions;
  defaultExpandAll?: boolean;
}
export interface TreeEmits {
  (e: "update:checkedKeys", keys: KeysType): void;
  (e: "update:expandKeys", keys: KeysType): void;
  (e: "node-click", node: OriginalTreeData, eventParam: Event): void;
}

export type CustomKey = string | number;
export type CustomString = (() => string) | string;
