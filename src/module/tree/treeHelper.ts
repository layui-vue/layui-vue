import { TreeData, TreeNode } from '/@src/module/tree/tree.type'
import { Nullable } from '/@src/module/type'

/**
 * 添加父级parentId
 * @param data
 * @param parentId
 */
export const generatorTreeData = (data: TreeData[] | TreeNode[], parentId: TreeNode['parentId'] = ''): TreeNode[] => {
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
    data[i]._nextSibling = (i + 1) < len ? data[i+1] : null
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
export const setParentNode = (data: TreeNode[], parentNode?: TreeNode): void => {
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
 */
export const initialTreeData = (data: TreeData[]): TreeNode[] => {
  const innerTree = generatorTreeData(data)
  setNextSiblings(innerTree)
  setParentNode(innerTree)
  return innerTree
}

/**
 * 树展开的节点
 * v-model:spreadKeys 或者
 * data.item.spreadKeys
 * @param data
 */
export const getTreeSpreadKeys = (data: TreeData[]): (string | number)[] => {
  let keys: (string | number) [] = []
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
export const getEmitNode = (data: TreeData[], node: TreeNode): Nullable<TreeData> => {
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
