<!--
 * @Date: 2021-10-16 13:22:38
 * @LastEditors: 落小梅
 * @LastEditTime: 2021-10-16 13:53:14
 * @FilePath: \layui-vue\src\module\tree\new-tree\index.vue
-->
<script lang="ts">
export default {
  name: 'LayTree',
}

// import { TreeEmits, TreeProps as Tp } from './tree.type'
</script>
<script lang="ts" setup>
import TreeNode from './TreeNode.vue'
import { computed } from 'vue'
import { useTree } from '/@src/module/tree/new-tree/useTree'

type StringFn = () => string
type StringOrNumber = string | number
type KeysType = (number | string)[]
type EditType = boolean | ('add' | 'update' | 'delete')

interface OriginalTreeData {
  title: StringFn | string
  id: StringOrNumber
  field: StringFn | string
  children?: OriginalTreeData[]
  disabled?: boolean
}

interface TreeProps {
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

interface TreeEmits {
  (e: 'update:checkedKeys', keys: KeysType): void
  (e: 'node-click', args: any,  node: OriginalTreeData, event: Event): void
}

const props = withDefaults(defineProps<TreeProps>(), {
  showCheckbox: false,
  edit: false,
  accordion: false,
  onlyIconControl: false,
  showLine: true,
  replaceFields: () => {
    return {
      id: 'id',
      children: 'children',
      title: 'title',
    }
  },
})
const emit = defineEmits<TreeEmits>()

const className = computed(() => {
  return {
    'layui-tree': true,
    'layui-form': props.showCheckbox,
    'layui-tree-line': props.showLine,
  }
})

const {
  nodeList,
  handleCheckbox
} = useTree(props, emit)

function handleClick (args, node) {
  handleCheckbox(node)
}
</script>
<template>
  <div :class="className">
    <tree-node
      :nodeList="nodeList"
      :showCheckbox="showCheckbox"
      :showLine="showLine"
      @node-click="handleClick"
    ></tree-node>
  </div>
</template>
