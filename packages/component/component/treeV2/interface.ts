export type OriginalTreeData = {
  [key: string]: any;
};

export type EditType = boolean | ("add" | "update" | "delete");

export type KeysType = (number | string)[];

type _ReplaceFieldsOptions = {
  id: string;
  title: string;
  parent: string;
  children: string;
  checked: string;
  disabled: string;
  expanded: string;
  leaf: string;
  [key: string]: string;
};

export type TreeData = {
  id: string | number;
  title: string;
  children: Array<TreeData>;
  parent?: string | number;
  disabled: boolean;
  checked: boolean;
  indeterminated: boolean;
  expanded: boolean;
  loading: boolean;
  leaf: boolean;
  original: OriginalTreeData;
  slot: string;
  [key: string]: any;
};

export type ReplaceFields = Partial<_ReplaceFieldsOptions>;

export type LoadFunction = (
  rootNode: OriginalTreeData | undefined,
  loadedCallback: (data: Array<OriginalTreeData>) => void
) => void;

export type SearchNodeMethodType = (node: any, value: string) => boolean;

export interface TreeProps {
  data?: Array<OriginalTreeData>;
  tree?: Array<TreeData>;
  disabled?: boolean;
  edit?: EditType;
  checkedKeys?: KeysType;
  expandKeys?: KeysType;
  checkStrictly?: boolean | string;
  collapseTransition?: boolean;
  onlyIconControl?: boolean;
  selectedKey?: any;
  showLine?: boolean;
  standalone?: boolean;
  showCheckbox?: boolean;
  replaceFields?: ReplaceFields;
  shouldIconBorder?: (iconName: string) => boolean;
  tailNodeIcon?: string | boolean | ((node: TreeData) => string);
  isSelect?: boolean;
  defaultExpandAll?: boolean;
  cacheData?: Array<OriginalTreeData>;
  lazy?: boolean;
  load?: LoadFunction;
  searchNodeMethod?: SearchNodeMethodType;
  nodeClick?: (node: TreeData) => boolean | undefined;
  nodeDblClick?: (node: TreeData) => boolean | undefined;
  nodeContextMenu?: (node: TreeData) => boolean | undefined;
}

export const TREE_CONTEXT = Symbol("TREE_CONTEXT");
