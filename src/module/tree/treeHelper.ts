import { TreeData, TreeNode } from '/@src/module/tree/tree.type'
import { Nullable } from '/@src/module/type'
import { Ref, WritableComputedRef } from "vue";

/**
 * 添加父级parentId
 * @param data
 * @param parentId
 * @param checkedKeys
 */
export const generatorTreeData = (
  data: TreeData[] | TreeNode[],
  parentId: TreeNode['parentId'] = ''
): TreeNode[] => {
  const innerTreeData: TreeNode[] = []
  const len = data.length
  for (let i = 0; i < len; i++) {
    const item = data[i]
    const inner = {
      ...item,
      parentId: parentId,
      spread: item.spread || false
    }
    if (item.children && item.children.length > 0) {
      inner.children = generatorTreeData(item.children, item.id)
    }
    innerTreeData.push(inner as TreeNode)
  }
  return innerTreeData
}

/**
 * 设置当前节点的下一个节点nextSibling，没有为null
 * @param data
 */
export const setNextSiblings = (data: TreeNode[]): void => {
  const len = data.length
  for (let i = 0; i < len; i++) {
    data[i]._nextSibling = i + 1 < len ? data[i + 1] : null
    if (data[i].children && data[i].children.length > 0) {
      setNextSiblings(data[i].children)
    }
  }
}

/**
 * 设置当前节点的父节点，没有为null
 * @param data
 * @param parentNode
 */
export const setParentNode = (
  data: TreeNode[],
  parentNode?: TreeNode
): void => {
  const len = data.length
  for (let i = 0; i < len; i++) {
    data[i]._parentNode = parentNode ? parentNode : null
    if (data[i].children && data[i].children.length > 0) {
      setParentNode(data[i].children, data[i])
    }
  }
}

/**
 * 初始化内部tree结构
 * @param data
 * @param checkedKeys
 */
export const initialTreeData = (
  data: TreeData[],
  checkedKeys: WritableComputedRef<(string | number)[]>
): TreeNode[] => {
  const innerTree = generatorTreeData(data, '')
  setNextSiblings(innerTree)
  setParentNode(innerTree)
  patchCheckedKeys(innerTree, checkedKeys)
  return innerTree
}

/**
 * 树展开的节点
 * v-model:spreadKeys 或者
 * data.item.spreadKeys
 * @param data
 */
export const getTreeSpreadKeys = (data: TreeData[]): (string | number)[] => {
  let keys: (string | number)[] = []
  const len = data.length
  for (let i = 0; i < len; i++) {
    const id: number | string = data[i].id
    if (data[i].spread) {
      keys.push(id)
    }
    if (data[i].children && data[i].children.length > 0) {
      keys = [...keys, ...getTreeSpreadKeys(data[i].children)]
    }
  }
  return keys
}

/**
 * 获取点击的原数据的节点
 * @param data
 * @param node
 */
export const getEmitNode = (
  data: TreeData[],
  node: TreeNode
): Nullable<TreeData> => {
  let item: Nullable<TreeData> = null
  const len = data.length
  for (let i = 0; i < len; i++) {
    if (data[i].id === node.id) {
      item = data[i]
      break
    }
    if (data[i].children && data[i].children.length > 0) {
      item = getEmitNode(data[i].children, node)
      if (item) {
        break
      }
    }
  }
  return item
}

/**
 * checkedKes分发到node
 * @param tree
 * @param checkedKeys
 * @param checked
 */
export const patchCheckedKeys = (tree: TreeNode[], checkedKeys: WritableComputedRef<(string | number)[]>, checked = false): void => {
  if (!checkedKeys.value) {
    return
  }
  const len = tree.length
  for (let i = 0; i < len; i++){
    tree[i]._checked = checked
    const node = tree[i]
    // 该节点是checked
    if (checkedKeys.value.indexOf(node.id) > -1) {
      node._checked = true
      if (node.children && node.children.length > 0) {
        patchCheckedKeys(node.children, checkedKeys, true)
      }
    } else {
      if (node.children && node.children.length > 0) {
        patchCheckedKeys(node.children, checkedKeys, false)
        // 判断children是否为都选中，如果是都选中的情况下，父组件也得是选中
        const allChildrenChecked = node.children.every(it => it._checked)
        if (allChildrenChecked) {
          node._checked = true
        }
      }
    }
  }
}

function updateChildren(data: TreeNode[], flag: boolean) {
  for (let i = 0; i < data.length; i++) {
    data[i]._checked = flag
    if (data[i].children && data[i].children.length > 0) {
      updateChildren(data[i].children, flag)
    }
  }
}

/**
 * 更新树
 * @param data
 * @param clickNode
 * @param parentNode
 */
export function updateInnerTreeDataChecked(data: TreeNode[], clickNode: TreeNode, parentNode?: TreeNode) {
  const len = data.length
  for (let i = 0; i < len; i++) {
    const currentNode = data[i]
    // 找到当前更新的节点
    if (currentNode.id === clickNode.id) {
      // 如果当前节点有子节点，更新子节点
      if (currentNode.children && currentNode.children.length > 0) {
        updateChildren(data[i].children, currentNode._checked!)
      }
    } else {
      if (currentNode.children && currentNode.children.length > 0) {
        updateInnerTreeDataChecked(currentNode.children, clickNode, currentNode)
      }
    }
    // 当前节点有选中，父节点一定选中
    if (currentNode.children && currentNode.children.length > 0) {
      currentNode._checked = currentNode.children.some(it => it._checked)
    }
  }
}

export function getCheckedKeys(tree: TreeNode[]): (string | number)[] {
  let keys: (string | number) [] = []
  const len = tree.length
  for (let i = 0; i < len; i++) {
    const current = tree[i]
    if (current._checked) {
      keys.push(current.id)
      if (current.children && current.children.length > 0) {
        keys = [...keys, ...getCheckedKeys(current.children)]
      }
    }
  }
  return keys
}
