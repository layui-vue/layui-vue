import {
  OriginalTreeData,
  StringOrNumber,
} from '/@src/module/tree/new-tree/tree.type'
import { Nullable } from '/@src/module/type'
import { Ref, ref } from 'vue'

type CustomKey = string | number
type CustomString = (() => string) | string

export interface TreeData {
  id: CustomKey
  title: CustomString
  children: TreeData[]
  parentKey: Nullable<StringOrNumber>
  isRoot: boolean
  isChecked: Ref<boolean>
  isDisabled: Ref<boolean>
  isLeaf: Ref<boolean>
  hasNextSibling: boolean
  parentNode: Nullable<TreeData>
}

interface ReplaceFields {
  id: string
  title: string
  children: string
}

interface TreeConfig {
  disabled: boolean
  showCheckbox: boolean
  checkedKeys: StringOrNumber[]
  nodeMap: Map<StringOrNumber, TreeData>
  replaceFields: ReplaceFields
}

function getNode(
  config: TreeConfig,
  origin: OriginalTreeData,
  parentKey: StringOrNumber,
  hasNextSibling: boolean
): TreeData {
  const {
    disabled,
    checkedKeys,
    showCheckbox,
    nodeMap,
    replaceFields: { children, id, title },
  } = config

  const nodeKey = Reflect.get(origin, id)
  const nodeTitle = Reflect.get(origin, title)
  const nodeChildren = Reflect.get(origin, children)
  const nodeDisabled = !!Reflect.get(origin, 'disabled')
  const nodeIsLeaf = !!Reflect.get(origin, 'spread')

  const parent = nodeMap.get(parentKey)
  if (parent) {
    console.log(parent.isChecked.value);
  }

  // console.log((parent && parent.isChecked.value) || checkedKeys.includes(nodeKey))

  // const isCheckedValue = (parent && parent.isChecked.value) || checkedKeys.includes(nodeKey)

  const node = Object.assign({}, origin, {
    id: nodeKey,
    title: nodeTitle,
    children: nodeChildren ? nodeChildren : [],
    parentKey: parentKey,
    isRoot: parentKey === '',
    isDisabled: ref(nodeDisabled),
    isChecked: showCheckbox ? ref(checkedKeys.includes(nodeKey)) : ref(false),
    // isChecked: ref(isCheckedValue),
    isLeaf: ref(nodeIsLeaf),
    hasNextSibling: hasNextSibling,
    parentNode: null,
  })
  // 如果全局设置了disabled,则全部至为true
  if (disabled) {
    node.isDisabled.value = true
  }

  if (!nodeMap.has(nodeKey)) {
    nodeMap.set(nodeKey, node)
  }

  return node
}

export function setParentNode(
  nodes: TreeData[],
  parentNode: Nullable<TreeData> = null
) {
  const len = nodes.length
  for (let i = 0; i < len; i++) {
    Reflect.set(nodes[i], 'parentNode', parentNode)
    if (nodes[i].children && nodes[i].children.length > 0) {
      setParentNode(nodes[i].children, nodes[i])
    }
  }
}

class Tree {
  private readonly config: TreeConfig
  protected treeData: TreeData[]

  constructor(
    config: TreeConfig,
    origin: OriginalTreeData | OriginalTreeData[]
  ) {
    this.config = config
    this.treeData = this.createTree(origin)
  }

  createTree(
    origin: OriginalTreeData | OriginalTreeData[],
    parentKey: StringOrNumber = ''
  ): TreeData[] {
    let data
    if (!Array.isArray(origin)) {
      data = Array.of(
        Object.assign({}, origin, {
          // isRoot: true,
          // isChecked: ref(false),
          // isExpand: ref(false),
          // isDisabled: ref(false),
          // isLeaf: ref(false),
        })
      )
    } else {
      data = origin
    }
    const nodeList: TreeData[] = []
    const { children } = this.config.replaceFields

    const len = data.length
    for (let i = 0; i < len; i++) {
      const node = getNode(this.config, data[i], parentKey, i < len - 1)
      const nodeChildren = Reflect.get(node, children)
      const nodeHasChildren = !!Reflect.get(node, children)

      if (nodeHasChildren) {
        Reflect.set(node, children, this.createTree(nodeChildren, node.id))
      }

      nodeList.push(node)
    }
    return nodeList
  }

  getData() {
    return this.treeData
  }

  setChecked(node: TreeData) {
    const item = this.config.nodeMap.get(node.id)
    console.log(item)
  }
}

export { Tree }
