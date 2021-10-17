import { TreeEmits, TreeProps } from '/@src/module/tree/new-tree/tree.type'
import { computed, ComputedRef, watch } from 'vue'
import { setParentNode, Tree, TreeData } from '/@src/module/tree/new-tree/tree'

export declare type UseTree = (
  props: TreeProps,
  emit: TreeEmits
) => {
  nodeList: ComputedRef<TreeData[]>
  handleCheckbox: (node: TreeData) => void
}

export const useTree: UseTree = (props: TreeProps, emit: TreeEmits) => {
  const tree = computed(() => {
    return new Tree(
      {
        disabled: false,
        nodeMap: new Map(),
        replaceFields: {
          id: 'id',
          title: 'title',
          children: 'children',
        },
        showCheckbox: props.showCheckbox ?? false,
        checkedKeys: props.checkedKeys ?? [],
      },
      props.data
    )
  })
  const nodeList = computed(() => {
    const nodes = tree.value.getData()
    setParentNode(nodes)
    return nodes
  })

  watch(
    () => nodeList,
    (list) => {
    },
    { deep: true }
  )

  function handleCheckbox(node: TreeData) {
    tree.value.setChecked(node)
  }

  return {
    nodeList,
    handleCheckbox,
  }
}
