/*
 * @Date: 2021-10-16 13:07:34
 * @LastEditors: 落小梅
 * @LastEditTime: 2021-10-16 13:29:06
 * @FilePath: \layui-vue\src\module\tree\new-tree\tree.type.ts
 */
export type StringFn = () => string
export type StringOrNumber = string | number
export type KeysType = (number | string)[]
export type EditType = boolean | ('add' | 'update' | 'delete')

export interface OriginalTreeData {
  title: StringFn | string
  id: StringOrNumber
  field: StringFn | string
  children?: OriginalTreeData[]
  disabled?: boolean
}

export interface TreeProps {
  checkedKeys?: KeysType
  data: OriginalTreeData
  showCheckbox?: boolean
  edit?: EditType
  accordion?: boolean
  onlyIconControl?: boolean
  showLine?: boolean
  replaceFields?: {
    id?: string
    children?: string
    title?: string
  }
}

export interface TreeEmits {
  (e: 'update:checkedKeys', keys: KeysType): void
  (e: 'node-click', node: OriginalTreeData, event: Event): void
}

/**
 *  Tree
 */

export interface Tree {}
