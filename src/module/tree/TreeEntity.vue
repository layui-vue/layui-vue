<script lang="ts">
export default {
  name: 'LayTreeEntity',
}
</script>
<script setup lang="ts">
import LayIcon from '../icon'
import LayCheckbox from '../checkbox'
import { TreeNode } from '/@src/module/tree/tree.type'

type EventType = 'icon' | 'node'

interface TreeEntityProps {
  node: TreeNode
  showCheckbox?: boolean
  updateCheckedByNode: (node: TreeNode) => void
}

interface EmitEvent {
  (e: 'node-click', node: TreeNode, type: EventType): void
}

const props = withDefaults(defineProps<TreeEntityProps>(), {
  showCheckbox: false,
})
const emit = defineEmits<EmitEvent>()

/**
 * 是否设置短线
 * @param node
 */
const renderLineShort = (node: TreeNode): boolean => {
  return (
    // 没有下一个节点
    (node._nextSibling === null &&
      node._parentNode &&
      // 外层最后一个
      (node._parentNode._nextSibling === null ||
        //上一层父级有延伸线
        (node._parentNode._nextSibling &&
          !node._parentNode._nextSibling.children))) as boolean
  )
}
/**
 * 展开收起 icon样式
 * @param node
 */
const nodeIconType = (node: TreeNode): string => {
  return !node.spread ? 'layui-icon-addition' : 'layui-icon-subtraction'
}

/**
 * 节点Icon点击
 * @param node
 */
function handleIconClick(node: TreeNode) {
  emit('node-click', node, 'icon')
}

/**
 * 节点点击
 * @param node
 */
function handleNodeClick(node: TreeNode) {
  emit('node-click', node, 'node')
}

/**
 * 递归emit事件
 * @param node
 * @param type
 */
function innerClick(node: TreeNode, type: EventType, e?: Event) {
  emit('node-click', node, type)
}

/**
 * checkbox click
 * @param arg
 * @param node
 */
function handleCheckboxChange(
  arg: { checked: boolean; value: string },
  node: TreeNode
) {
  props.updateCheckedByNode(node)
}
</script>
<template>
  <template v-if="node.children && node.children.length > 0">
    <div
      class="layui-tree-set"
      :class="{
        'layui-tree-setLineShort': renderLineShort(node),
        'layui-tree-setHide': !node.parentId,
      }"
    >
      <div class="layui-tree-entry">
        <div class="layui-tree-main">
          <span class="layui-tree-iconClick layui-tree-icon">
            <LayIcon
              :type="nodeIconType(node)"
              @click.prevent.stop="handleIconClick(node, 'icon')"
            />
          </span>
          <LayCheckbox
            v-if="showCheckbox"
            v-model:checked="node._checked"
            name="name"
            skin="primary"
            @change="
              (args) => {
                handleCheckboxChange(args, node)
              }
            "
          >
            <!--            {{ node.title }} || {{node.id}}-->
          </LayCheckbox>
          <span
            class="layui-tree-txt"
            @click.prevent.stop="handleNodeClick(node, 'node')"
          >
            {{ node.title }}
          </span>
        </div>
      </div>
      <div
        v-show="node.spread"
        class="layui-tree-pack layui-tree-showLine"
        style="display: block"
      >
        <LayTreeEntity
          v-for="(item, index) in node.children"
          :key="index"
          :node="item"
          :show-checkbox="showCheckbox"
          :update-checked-by-node="updateCheckedByNode"
          @node-click="innerClick"
        />
      </div>
    </div>
  </template>
  <template v-else>
    <div
      class="layui-tree-set"
      :class="{
        'layui-tree-setLineShort': renderLineShort(node),
      }"
    >
      <div class="layui-tree-entry">
        <div class="layui-tree-main">
          <span class="layui-tree-iconClick">
            <LayIcon
              type="layui-icon-file"
              @click.prevent.stop="handleIconClick(node, 'icon')"
            />
          </span>
          <LayCheckbox
            v-if="showCheckbox"
            v-model:checked="node._checked"
            name="name"
            skin="primary"
            label="1"
            @change="
              (args) => {
                handleCheckboxChange(args, node)
              }
            "
          >
          </LayCheckbox>
          <span
            class="layui-tree-txt"
            @click.prevent.stop="handleNodeClick(node, 'node')"
          >
            {{ node.title }}
          </span>
        </div>
      </div>
    </div>
  </template>
</template>
<style scoped lang="less"></style>
