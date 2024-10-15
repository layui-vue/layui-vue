import type {
  OriginalTreeData,
  StringOrNumber,
  ReplaceFieldsOptions,
  SearchNodeMethodType,
} from "./tree.type";
import type { Nullable } from "../../types";
import { isValueArray } from "../../utils";

type CustomKey = string | number;
type CustomString = (() => string) | string;

export interface TreeData {
  id: CustomKey;
  title: CustomString;
  children: TreeData[];
  parentKey: Nullable<StringOrNumber>;
  isRoot: boolean;
  visible: boolean;
  isChecked: boolean;
  isDisabled: boolean;
  isLeaf: boolean;
  isLazy: boolean;
  isLoading: boolean;
  hasNextSibling: boolean;
  parentNode: Nullable<TreeData>;
  [key: string]: any;
}
interface TreeConfig {
  checkStrictly: boolean | string;
  showCheckbox: boolean;
  checkedKeys: StringOrNumber[];
  expandKeys: StringOrNumber[];
  nodeMap: Map<StringOrNumber, TreeData>;
  originMap: Map<StringOrNumber, OriginalTreeData>;
  replaceFields: ReplaceFieldsOptions;
  defaultExpandAll: boolean;
  lazy: boolean;
  searchNodeMethod: SearchNodeMethodType;
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
    const { children, id } = this.config.replaceFields;

    const len = data.length;
    for (let i = 0; i < len; i++) {
      const node = this.getNode(data[i], parentKey, i < len - 1);
      const nodeChildren = Reflect.get(node, children);
      const nodeHasChildren = !!Reflect.get(node, children);

      if (nodeHasChildren) {
        Reflect.set(node, children, this.createTree(nodeChildren, node[id]));
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
      lazy,
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
      isLazy: !Reflect.get(origin, "spread") && lazy,
      isLoading: false,
      hasNextSibling: hasNextSibling,
      parentNode: parentNode || null,
      visible: true,
    });

    node.isDisabled = nodeDisabled;
    node.isChecked = checkedKeys.includes(nodeKey);
    node.isLeaf = parentNode ? parentNode.isLeaf : expandKeys.includes(nodeKey);
    node.isLeaf = nodeIsLeaf || (this.config.defaultExpandAll && !lazy);

    if (!nodeMap.has(nodeKey)) {
      nodeMap.set(nodeKey, node);
    }
    if (!originMap.has(nodeKey)) {
      originMap.set(nodeKey, origin);
    }
    return node;
  }

  treeForeach(tree: TreeData[], func: Function) {
    const { children } = this.config.replaceFields;

    tree.forEach((data: TreeData) => {
      data[children] && this.treeForeach(data[children], func);
      func(data);
    });
  }

  setCheckedKeys(
    checked: boolean,
    checkStrictly: boolean | string,
    node: TreeData
  ) {
    const { children } = this.config.replaceFields;

    if (!checkStrictly) {
      if (isValueArray(node[children])) {
        let notDisabledCount = 0;
        let checkCount = 0;

        this.treeForeach(node[children], (node: TreeData) => {
          if (!node.isDisabled) {
            notDisabledCount++;
            if (node.isChecked) {
              checkCount++;
            }
          }
        });
        checkCount < notDisabledCount ? (checked = true) : (checked = false);

        checked = this.setChildrenChecked(checked, node[children]);
      }

      node.isChecked = checked;

      if (node.parentNode) {
        this.setParentChecked(node.parentNode);
      }
    } else node.isChecked = checked;
  }

  setParentChecked(parent: TreeData) {
    const { children } = this.config.replaceFields;

    if (!parent) {
      return;
    }
    const pChild = parent[children] as TreeData[];
    const pChildChecked = pChild.every((c) => c.isChecked);

    parent.isChecked = pChildChecked;
    if (parent.parentNode) {
      this.setParentChecked(parent.parentNode);
    }
  }

  setChildrenChecked(checked: boolean, nodes: TreeData[]): boolean {
    const { children } = this.config.replaceFields;
    const len = nodes.length;
    let currentState = checked;

    for (let i = 0; i < len; i++) {
      if (isValueArray(nodes[i][children])) {
        const _checked = this.setChildrenChecked(checked, nodes[i][children]);
        // children 存在未选中的节点
        if (!_checked) {
          currentState = false;
        }
        nodes[i].isChecked = _checked;
        continue;
      }

      if (!nodes[i].isDisabled) {
        nodes[i].isChecked = checked;
        continue;
      }
      nodes[i].isChecked = currentState = false;
    }

    return currentState;
  }

  refreshData(data: Array<TreeData>) {
    return (this.treeData = data);
  }

  getData() {
    return this.treeData;
  }

  getKeys() {
    const expandKeys: any[] = [];
    const checkedKeys: StringOrNumber[] = [];
    const iterator = this.config.nodeMap[Symbol.iterator]();
    const { id: fId, children } = this.config.replaceFields;

    let next = iterator.next();
    while (!next.done) {
      const [, node] = next.value;
      const id = Reflect.get(node, fId);
      if (node.isChecked) {
        checkedKeys.push(id);
      }

      // #I9U1MX 父子节点存在联动，若current节点的所有子节点有未选中的情况，则current节点不选中
      if (!this.config.checkStrictly && node.isChecked && node[children]) {
        this.treeForeach(node[children], (child: TreeData) => {
          if (!child.isChecked) {
            const index = checkedKeys.findIndex(
              (key) => key === child.parentKey
            );
            index >= 0 && checkedKeys.splice(index, 1);
          }
        });
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

  _filter(value: string) {
    const {
      replaceFields: { children },
      searchNodeMethod,
      lazy,
    } = this.config;

    const traverse = function (node: TreeData[]) {
      node.forEach((child: TreeData) => {
        const childNodes = child[children] as TreeData[];
        child.visible = searchNodeMethod(child, value);

        traverse(childNodes);

        if (!child.visible && childNodes.length) {
          let allHidden = true;
          allHidden = !childNodes.some((child) => child.visible);

          child.visible = allHidden === false;
        }
        if (!value) return;

        if (child.visible && !child.isLeaf && !lazy) child.isLeaf = true;
      });
    };

    traverse(this.treeData);
  }
}

export { Tree };
