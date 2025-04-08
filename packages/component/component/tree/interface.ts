import type { NumberOrString } from "@layui/component/types";
import type { VNode } from "vue";

export type KeysType = (NumberOrString)[];

export interface OriginalTreeData {
  id?: NumberOrString;
  title?: NumberOrString;
  children?: OriginalTreeData[];
  disabled?: boolean;
  checked?: boolean;
  spread?: boolean;
  leaf?: boolean;
  [key: string]: any;
}

export interface ReplaceFieldsOptions {
  id: string;
  title: string;
  children: string;
  disabled: string;
  checked: string;
  expanded: string;
  leaf: string;
}

export type ReplaceFieldsOptionsOptional = Partial<ReplaceFieldsOptions>;

export interface TreeData {
  id: string | number;
  title: string;
  children: Array<TreeData>;
  parent?: string | number;

  /**
   * 是否禁止
   */
  disabled: boolean;

  /**
   * 单行是否选中
   */
  checked: boolean;
  isIndeterminate: boolean;

  /**
   * 是否展开子节点
   */
  expanded: boolean;
  loading: boolean;

  /**
   * 是否没有子节点
   * props.lazy为true时，为false，将有一次注入的机会
   */
  leaf: boolean;
  original: OriginalTreeData;
  slot: string | ((data: OriginalTreeData) => VNode);
  visible: boolean;
  [key: string]: any;
}

export type LoadFunction = (
  rootNode: OriginalTreeData | undefined,
  loadedCallback: (data: Array<OriginalTreeData>) => void
) => void;

export type SearchNodeMethodType = (node: OriginalTreeData, value: string) => boolean;

export interface TreeProps {
  /**
   * 原始数据
   */
  data?: OriginalTreeData | Array<OriginalTreeData>;
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
  selectedKey?: NumberOrString;
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
  replaceFields?: ReplaceFieldsOptionsOptional;
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
   * 手风琴模式
   */
  accordion?: boolean;
}

export interface TreeNodeProps extends TreeProps {
  /**
   * 规范化数据
   */
  tree: Array<TreeData>;
};

export interface TreeEmits {
  (e: "update:selected-key", key: string | number): void;
  (e: "update:checked-keys", keys: Array<string | number>): void;
  (e: "update:expand-keys", keys: Array<string | number>): void;
  (e: "node-click", node: OriginalTreeData): void;
  (e: "check-change", node: OriginalTreeData, checked: boolean): void;
  (e: "node-double", event: MouseEvent, node: OriginalTreeData): void;
  (e: "node-contextmenu", event: MouseEvent, node: OriginalTreeData): void;
}
