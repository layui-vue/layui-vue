<script lang="ts">
export default {
  name: 'TreeNode',
}
</script>

<script setup lang="ts">
import { StringOrNumber } from '/@src/module/tree/new-tree/tree.type'
import { Nullable } from '/@src/module/type'

import LayIcon from '../../icon'
import LayCheckbox from '../../checkbox'
import { nextTick, Ref } from 'vue'

type CustomKey = string | number
type CustomString = (() => string) | string

interface TreeData {
  id: CustomKey
  title: CustomString
  children: TreeData[]
  parentKey: Nullable<StringOrNumber>
  isRoot: Ref<boolean>
  isChecked: Ref<boolean>
  isDisabled: Ref<boolean>
  isLeaf: Ref<boolean>
  hasNextSibling: boolean
  parentNode: Nullable<TreeData>
}

interface TreeNodeProps {
  nodeList: TreeData[]
  showCheckbox: boolean
  showLine: boolean
}

interface TreeNodeEmits {
  (e: 'node-click', event: Event): void
}

const props = defineProps<TreeNodeProps>()
const emit = defineEmits<TreeNodeEmits>()

function renderLineShort(node: TreeData) {
  return (
    !node.hasNextSibling &&
    node.parentKey &&
    // 外层最后一个
    (!node.parentNode.hasNextSibling ||
      //上一层父级有延伸线
      (node.parentNode.hasNextSibling && !node.parentNode.children))
  )
}
/**
 * 展开收起 icon样式
 * @param node
 */
const nodeIconType = (node: TreeData): string => {
  if (!props.showLine) {
    if (node.children.length > 0) {
      return 'layui-tree-iconArrow '
    }
    return ''
  }
  if (node.children.length !== 0) {
    return !node.isLeaf.value ? 'layui-icon-addition' : 'layui-icon-subtraction'
  }
  return 'layui-icon-file'
}

function handleNodeClick (args: { label: string, value: string }, node: TreeData) {
  emit('node-click', args, node)
}

function recursiveNodeClick (args: { label: string, value: string }, node: TreeData) {
  emit('node-click', args, node)
}

function setChildrenChecked (checked: boolean, nodes: TreeData[]) {
  const len = nodes.length
  for (let i = 0; i < len; i++) {
    nodes[i].isChecked.value = checked
    nodes[i].children && nodes[i].children.length > 0 && (setChildrenChecked(checked, nodes[i].children))
  }
}

async function setParentChecked (checked: boolean, parent: TreeData) {
  if (!parent) {
    return
  }
  parent.isChecked.value = checked
  if (parent.parentNode) {
    await setParentChecked(checked, parent.parentNode)
    // todo
    await nextTick()
    const pChild = parent.children
    const pChildChecked = pChild.some(c => c.isChecked.value)
    console.log(pChildChecked)
    if (pChildChecked) {
      parent.isChecked.value = true
    }
  }
}

function handleChange(checked: boolean, node: TreeData) {
  node.isChecked.value = checked
  if (node.children) {
    setChildrenChecked(checked, node.children)
  }
  setParentChecked(checked, node.parentNode)
}

function handleIconClick (node: TreeData) {
  node.isLeaf.value = !node.isLeaf.value
}
</script>

<template>
  <div
    v-for="(node, nodeIndex) in nodeList"
    :key="nodeIndex"
    :class="{
      'layui-tree-set': true,
      'layui-tree-setLineShort': renderLineShort(node),
      'layui-tree-setHide': node.isRoot,
    }"
  >
    <div class="layui-tree-entry">
      <div class="layui-tree-main">
        <span
          :class="[
            showLine && node.children.length > 0 ? 'layui-tree-icon' : '',
            { 'layui-tree-iconClick': true },
          ]"
        >
          <LayIcon
            :type="nodeIconType(node)"
            @click="handleIconClick(node)"
          />
        </span>
        <LayCheckbox
          v-if="showCheckbox"
          v-model:checked="node.isChecked.value"
          skin="primary"
          @change="({ checked }) => { handleChange(checked, node) }"
        >
        </LayCheckbox>
        <span class="layui-tree-txt">
          {{ node.title }}
        </span>
      </div>
    </div>
    <transition>
      <div
        v-if="node.isLeaf.value"
        class="layui-tree-pack layui-tree-showLine"
        style="display: block"
      >
        <TreeNode
          :node-list="node.children"
          :show-checkbox="showCheckbox"
          :show-line="showLine"
          @node-click="recursiveNodeClick"
        />
      </div>
    </transition>
  </div>
</template>

<style scoped></style>
