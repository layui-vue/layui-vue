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
  icon?: string[] | string;
  [key: string]: any;
};

export type ReplaceFields = Partial<_ReplaceFieldsOptions>;

export type LoadFunction = (
  rootNode: OriginalTreeData | undefined,
  loadedCallback: (data: Array<OriginalTreeData>) => void
) => void;

export type SearchNodeMethodType = (node: any, value: string) => boolean;

export interface TreeProps {
  /**
   * 原始数据
   */
  data?: Array<OriginalTreeData>;
  /**
   * 规范化数据
   */
  tree?: Array<TreeData>;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 选中的节点ID数组
   */
  checkedKeys?: KeysType;
  /**
   * 展开的节点ID数组
   */
  expandKeys?: KeysType;
  /**
   * 是否严格遵循父子不互相关联
   */
  checkStrictly?: boolean | string;
  /**
   * 是否显示动画
   */
  collapseTransition?: boolean;
  /**
   * 是否只用图标控制展开与否
   */
  onlyIconControl?: boolean;
  /**
   * 当前选择的节点ID
   */
  selectedKey?: any;
  /**
   * 是否显示连接线
   */
  showLine?: boolean;
  /**
   * 是否独立使用
   */
  standalone?: boolean;
  /**
   * 是否显示复选框
   */
  showCheckbox?: boolean;
  /**
   * 替换字段
   */
  replaceFields?: ReplaceFields;
  /**
   * 图标是否带边框
   * @param iconName 图标名称
   * @returns `boolean`
   */
  shouldIconBorder?: (iconName: string) => boolean;
  /**
   * 节点图标
   */
  tailNodeIcon?: string | boolean | ((node: TreeData) => string);
  /**
   * 是否默认展开所有节点
   */
  defaultExpandAll?: boolean;
  /**
   * mock数据
   */
  cacheData?: Array<OriginalTreeData>;
  /**
   * 是否懒加载
   */
  lazy?: boolean;
  /**
   * 懒加载函数
   */
  load?: LoadFunction;
  /**
   * 是否在勾选时加载子节点
   */
  loadOnCheck?: boolean;
  /**
   * 搜索节点方法
   */
  searchNodeMethod?: SearchNodeMethodType;
  /**
   * 节点单击事件
   * @param node 当前节点
   * @returns `boolean` 返回 true 则拦截单击事件
   */
  nodeClick?: (node: TreeData) => boolean | undefined;
  /**
   * 节点双击事件
   * @param node 当前节点
   * @returns `boolean` 返回 true 则拦截双击事件
   */
  nodeDblClick?: (node: TreeData) => boolean | undefined;
  /**
   * 节点右键事件
   * @param node 当前节点
   * @returns `boolean` 返回 true 则拦截右键事件
   */
  nodeContextMenu?: (node: TreeData) => boolean | undefined;
  /**
   * 手风琴模式
   */
  accordion?: boolean;
}

export const TREE_CONTEXT = Symbol("TREE_CONTEXT");
