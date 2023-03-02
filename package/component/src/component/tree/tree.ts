import { OriginalTreeData, StringOrNumber } from "./tree.type";
import { Nullable } from "../../types";

type CustomKey = string | number;
type CustomString = (() => string) | string;

export interface TreeData {
  id: CustomKey;
  title: CustomString;
  children: TreeData[];
  parentKey: Nullable<StringOrNumber>;
  isRoot: boolean;
  isChecked: boolean;
  isDisabled: boolean;
  isLeaf: boolean;
  hasNextSibling: boolean;
  parentNode: Nullable<TreeData>;
}
interface ReplaceFields {
  id: string;
  title: string;
  children: string;
}
interface TreeConfig {
  checkStrictly: boolean | string;
  showCheckbox: boolean;
  checkedKeys: StringOrNumber[];
  expandKeys: StringOrNumber[];
  nodeMap: Map<StringOrNumber, TreeData>;
  originMap: Map<StringOrNumber, OriginalTreeData>;
  replaceFields: ReplaceFields;
}

class Tree {
  protected config: TreeConfig;
  protected treeData: TreeData[];

  constructor(
    config: TreeConfig,
    origin: OriginalTreeData | OriginalTreeData[]
  ) {
    this.config = config;
    this.treeData = [];
    this.init(origin);
  }

  init(origin: OriginalTreeData | OriginalTreeData[]): void {
    const tree = this.createTree(origin);
    this.treeData = tree;
  }

  createTree(
    origin: OriginalTreeData | OriginalTreeData[],
    parentKey: StringOrNumber = ""
  ): TreeData[] {
    let data;
    if (!Array.isArray(origin)) {
      data = Array.of(Object.assign({}, origin));
    } else {
      data = origin;
    }
    const nodeList: TreeData[] = [];
    const { children } = this.config.replaceFields;

    const len = data.length;
    for (let i = 0; i < len; i++) {
      const node = this.getNode(data[i], parentKey, i < len - 1);
      const nodeChildren = Reflect.get(node, children);
      const nodeHasChildren = !!Reflect.get(node, children);

      if (nodeHasChildren) {
        Reflect.set(node, children, this.createTree(nodeChildren, node.id));
      }

      nodeList.push(node);
    }
    return nodeList;
  }

  getNode(
    origin: OriginalTreeData,
    parentKey: StringOrNumber,
    hasNextSibling: boolean
  ): TreeData {
    const {
      nodeMap,
      originMap,
      checkedKeys,
      expandKeys,
      replaceFields: { children, id, title },
    } = this.config;

    const nodeKey = Reflect.get(origin, id);
    const nodeTitle = Reflect.get(origin, title);
    const nodeChildren = Reflect.get(origin, children);
    const nodeDisabled = !!Reflect.get(origin, "disabled");
    const nodeIsLeaf =
      !!Reflect.get(origin, "spread") || expandKeys.includes(nodeKey);
    const parentNode = nodeMap.get(parentKey);

    const node = Object.assign({}, origin, {
      id: nodeKey,
      title: nodeTitle,
      children: nodeChildren ? nodeChildren : [],
      parentKey: parentKey,
      isRoot: parentKey === "",
      isDisabled: false,
      isChecked: false,
      isLeaf: false,
      hasNextSibling: hasNextSibling,
      parentNode: parentNode || null,
    });

    node.isDisabled = nodeDisabled;
    node.isChecked = checkedKeys.includes(nodeKey);
    node.isLeaf = parentNode ? parentNode.isLeaf : expandKeys.includes(nodeKey);
    node.isLeaf = nodeIsLeaf;

    if (!nodeMap.has(nodeKey)) {
      nodeMap.set(nodeKey, node);
    }
    if (!originMap.has(nodeKey)) {
      originMap.set(nodeKey, origin);
    }
    return node;
  }

  treeForeach(tree: any, func: Function) {
    tree.forEach((data: any) => {
      data.children && this.treeForeach(data.children, func);
      func(data);
    });
  }

  setChildrenChecked(checked: boolean, nodes: TreeData[]) {
    var ableCount = 0;
    var checkCount = 0;
    const len = nodes.length;
    this.treeForeach(nodes, (node: any) => {
      if (!node.isDisabled) {
        ableCount = ableCount + 1;
        if (node.isChecked) {
          checkCount = checkCount + 1;
        }
      }
    });
    checkCount < ableCount ? (checked = true) : (checked = false);
    for (let i = 0; i < len; i++) {
      if (
        !nodes[i].isDisabled ||
        (nodes[i].isDisabled && nodes[i].children.length > 0)
      ) {
        nodes[i].isChecked = checked;
      }
      nodes[i].children &&
        nodes[i].children.length > 0 &&
        this.setChildrenChecked(checked, nodes[i].children);
    }
  }

  setParentChecked(checked: boolean, parent: TreeData) {
    if (!parent) {
      return;
    }
    parent.isChecked = checked;
    const pChild = parent.children;
    const pChildChecked = pChild.some((c) => c.isChecked);
    if (pChildChecked) {
      parent.isChecked = true;
    }
    if (parent.parentNode) {
      this.setParentChecked(checked, parent.parentNode);
    }
  }

  setCheckedKeys(
    checked: boolean,
    checkStrictly: boolean | string,
    node: TreeData
  ) {
    node.isChecked = checked;
    if (!checkStrictly) {
      if (node.parentNode) {
        this.setParentChecked(checked, node.parentNode);
      }
      if (node.children) {
        this.setChildrenChecked(checked, node.children);
      }
    }
  }

  getData() {
    return this.treeData;
  }

  getKeys() {
    const expandKeys = [];
    const checkedKeys = [];
    const iterator = this.config.nodeMap[Symbol.iterator]();
    let next = iterator.next();
    while (!next.done) {
      const [, node] = next.value;
      const id = Reflect.get(node, this.config.replaceFields.id);
      if (node.isChecked) {
        checkedKeys.push(id);
      }
      if (node.isLeaf) {
        expandKeys.push(id);
      }
      next = iterator.next();
    }
    return { checkedKeys, expandKeys };
  }

  getOriginData(key: StringOrNumber): OriginalTreeData {
    return this.config.originMap.get(key)!;
  }
}

export { Tree };
