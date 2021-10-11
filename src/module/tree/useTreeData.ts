import { TreeData, UseTreeData } from '/@src/module/tree/tree.type'
import { computed, ref, unref, watch } from 'vue'
import { getTreeSpreadKeys, initialTreeData } from '/@src/module/tree/treeHelper'
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
    }
  })

  /**
   * 渲染的data
   */
  const innerTreeData = ref<TreeData[]>([])
  watch(() => props.data, (treeData) => {
    if (treeData) {
      innerTreeData.value = initialTreeData(treeData)
    }
  }, { immediate: true, deep: true })

  function updateInnerTreeData(treeData: TreeData[], node: TreeData): void {
    for(let i = 0; i <treeData.length; i++) {
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

  return {
    spreadKeys,
    innerTreeData,
    updateInnerTreeData,
    treeWrapperClass
  }
}
