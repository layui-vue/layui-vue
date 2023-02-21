export type StringFn = () => string;
export type StringOrNumber = string | number;
export type KeysType = (number | string)[];
export type EditType = boolean | ("add" | "update" | "delete");

export interface OriginalTreeData {
  title: StringFn | string;
  id: StringOrNumber;
  field: StringFn | string;
  children?: OriginalTreeData[];
  disabled?: boolean;
}

export interface ReplaceFieldsOptions {
  id?: string;
  children?: string;
  title?: string;
}

export interface TreeProps {
  checkedKeys?: KeysType;
  expandKeys?: KeysType;
  data: OriginalTreeData;
  checkStrictly?: boolean | string;
  showCheckbox?: boolean;
  edit?: EditType;
  collapseTransition?: boolean;
  onlyIconControl?: boolean;
  showLine?: boolean;
  replaceFields?: ReplaceFieldsOptions;
}
export interface TreeEmits {
  (e: "update:checkedKeys", keys: KeysType): void;
  (e: "update:expandKeys", keys: KeysType): void;
  (e: "node-click", node: OriginalTreeData, eventParam: Event): void;
}

export type CustomKey = string | number;
export type CustomString = (() => string) | string;
