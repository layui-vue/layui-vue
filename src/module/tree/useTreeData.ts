import { TreeData, TreeNode, UseTreeData } from '/@src/module/tree/tree.type'
import { computed, ref, unref, watch } from 'vue'
import {
  getCheckedKeys,
  getTreeSpreadKeys,
  initialTreeData,
  updateInnerTreeDataChecked,
} from '/@src/module/tree/treeHelper'
import { Recordable } from '/@src/module/type'

export const useTreeData: UseTreeData = (props, emit) => {
  const spreadKeys = computed({
    get: () => {
      if (!props.data) return []
      if (props.spreadKeys && props.spreadKeys.length > 0) {
        return props.spreadKeys as (string | number)[]
      }
      return getTreeSpreadKeys(props.data)
    },
    set: (value: (string | number)[]) => {
      emit('update:spreadKeys', value)
    },
  })

  const checkedKeys = computed({
    get: () => {
      return props.checkedKeys!
    },
    set: (value: (string | number)[]) => {
      emit('update:checkedKeys', value)
    },
  })

  /**
   * 渲染的data
   */
  const innerTreeData = ref<TreeNode[]>([])
  watch(
    () => props.data,
    (treeData) => {
      if (treeData) {
        innerTreeData.value = initialTreeData(treeData, checkedKeys)
      }
    },
    { immediate: true, deep: true }
  )

  /**
   * watch innerTreeDate to emit checkedKeys
   * @param treeData
   * @param node
   */
  watch(
    innerTreeData,
    (tree) => {
      const emitCheckedKeys = getCheckedKeys(tree)
      checkedKeys.value = emitCheckedKeys
    },
    { deep: true }
  )

  function updateInnerTreeData(treeData: TreeData[], node: TreeData): void {
    for (let i = 0; i < treeData.length; i++) {
      if (treeData[i].id === node.id) {
        treeData[i].spread = !treeData[i].spread
        break
      }
      if (treeData[i].children && treeData[i].children.length > 0) {
        updateInnerTreeData(treeData[i].children, node)
      }
    }
  }

  /**
   * tree wrapper class
   */
  const treeWrapperClass = computed((): Recordable => {
    const { showCheckbox, showLine } = unref(props)
    return {
      'layui-tree': true,
      'layui-form': showCheckbox,
      'layui-tree-line': showLine,
    }
  })

  /**
   * 更新checked状态到node中
   * @param node
   */
  function updateCheckedByNode(node: TreeNode) {
    updateInnerTreeDataChecked(innerTreeData.value, node)
  }

  return {
    spreadKeys,
    checkedKeys,
    innerTreeData,
    updateInnerTreeData,
    treeWrapperClass,
    updateCheckedByNode,
  }
}
