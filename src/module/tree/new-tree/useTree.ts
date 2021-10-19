import { TreeEmits, TreeProps } from '/@src/module/tree/new-tree/tree.type'
import { computed, ComputedRef, watch } from 'vue'
import { Tree, TreeData } from '/@src/module/tree/new-tree/tree'

export declare type UseTree = (
  props: TreeProps,
  emit: TreeEmits
) => {
  tree: Tree
  nodeList: ComputedRef<TreeData[]>
}

export const useTree: UseTree = (props: TreeProps, emit: TreeEmits) => {
  const tree = new Tree(
    {
      nodeMap: new Map(),
      originMap: new Map(),
      replaceFields: {
        id: 'id',
        title: 'title',
        children: 'children',
      },
      showCheckbox: props.showCheckbox ?? false,
      checkedKeys: props.checkedKeys ?? [],
      expandKeys: props.expandKeys ?? [],
    },
    props.data
  )

  const nodeList = computed(() => {
    const nodes = tree.getData()
    return nodes
  })

  watch(
    () => nodeList,
    (list) => {
      const { checkedKeys, expandKeys } = tree.getKeys()
      emit('update:checkedKeys', checkedKeys)
      // emit('update:expandKeys', expandKeys)
    },
    { deep: true }
  )

  return {
    tree,
    nodeList,
  }
}
