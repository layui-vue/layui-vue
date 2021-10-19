import {
  OriginalTreeData,
  StringFn,
  StringOrNumber,
} from '/@src/module/tree/new-tree/tree.type'
import { computed, ref, Ref } from 'vue'
import { Nullable } from '/@src/module/type'

export interface TreeConfig {
  disabled: boolean
  showLine: boolean
  showCheckbox: boolean
  spread: boolean
  checkedKeys: StringOrNumber[]
  spreadKeys: StringOrNumber[]
}

export const useTreeData = (
  treeConfig: TreeConfig,
  origin: OriginalTreeData | OriginalTreeData[]
) => {
  const tree = computed(() => {
    const initTree = initialTree(origin)
    const treeNodes = getTreeNodes(initTree, treeConfig, '')
    return treeNodes
  })
}

function getTreeNodes(
  origin: OriginalTreeData[],
  config: TreeConfig,
  parentId = ''
) {
  const len = origin.length
  for (let i = 0; i < len; i++) {
    const node = createTreeNode(config, origin[i], i, len, parentId)
  }
}

function createTreeNode(
  config: TreeConfig,
  current: OriginalTreeData,
  i: number,
  len: number,
  parentId: string
) {
  const treeNode = new TreeNode(current)
  const { disabled, spread } = config
  treeNode.isDisabled.value = disabled
  treeNode.isLeaf.value = spread
  if (i < len - 1) {
    treeNode.hasNextSibling = true
  }
  treeNode.parentId = parentId
}

class TreeNode {
  id: StringOrNumber
  parentId: StringOrNumber
  title: StringFn | string
  children: Nullable<TreeNode[]>
  parentNode: Nullable<TreeNode>
  isDisabled: Ref<boolean>
  isLeaf: Ref<boolean>
  isChecked: Ref<boolean>
  hasNextSibling: boolean
  constructor(options: OriginalTreeData) {
    this.id = options.id
    this.title = options.title
    this.children = []
    this.parentId = ''
    this.parentNode = null
    this.isDisabled = ref(false)
    this.isLeaf = ref(false)
    this.isChecked = ref(false)
    this.hasNextSibling = false
  }
}

/**
 * init tree.
 * if origin source is object then return Array.of(originSource)
 * if array, return
 * @param originData
 */
function initialTree(originData: OriginalTreeData | OriginalTreeData[]): any {
  let treeNodes = []
  if (!Array.isArray(originData)) {
    treeNodes.push(originData)
  } else {
    treeNodes = Array.of(originData)
  }
  return treeNodes
}
