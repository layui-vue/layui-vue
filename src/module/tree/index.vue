<script setup lang="ts">
import { VNode, VNodeChild } from 'vue'
import TreeEntity from './TreeEntity.vue'
import { useTreeData } from '/@src/module/tree/useTreeData'
import { TreeNode } from '/@src/module/tree/tree.type'

type EditAction = 'add' | 'update' | 'del'

type EditType = boolean | EditAction[]

export declare interface TreeData {
  /**
   * 节点唯一索引值，用于对指定节点进行各类操作
   */
  id: string | number
  /**
   * 节点标题
   */
  title: string | (() => string)
  /**
   * 节点字段名
   */
  field: string | (() => string)
  /**
   * 子节点。支持设定选项同父节点
   */
  children: TreeData[]
  /**
   * 点击节点弹出新窗口对应的 url。需开启 isJump 参数
   * 废弃，通过 on-click事件用户控制
   */
  href: string | URL
  /**
   * 节点是否初始展开，默认 false
   * 废弃：设置 v-model:spreadKeys
   */
  spread: boolean
  /**
   * 节点是否初始为选中状态（如果开启复选框的话），默认 false
   * 废弃：设置 v-model:checkedKeys
   */
  checked: boolean
  /**
   * 节点是否为禁用状态。默认 false
   */
  disabled: boolean
}

export declare interface TreeProps {
  /**
   * 指定唯一的id
   */
  key?: string
  /**
   * 选中的节点
   */
  checkedKeys?: (string | number)[]
  /**
   * 展开的节点
   */
  spreadKeys?: (string | number)[]
  /**
   * 数据源
   */
  data?: TreeData[]
  /**
   * 是否显示复选框 默认 false
   */
  showCheckbox?: boolean
  /**
   * 是否开启节点的操作图标。默认 false。
   若为 true，则默认显示“改删”图标
   若为 数组，则可自由配置操作图标的显示状态和顺序，目前支持的操作图标有：add、update、del，如：
   edit: ['add', 'update', 'del']
   */
  edit?: EditType
  /**
   * 是否开启手风琴模式，默认 false
   */
  accordion?: boolean
  /**
   * 是否仅允许节点左侧图标控制展开收缩。默认 false（即点击节点本身也可控制）。若为 true，则只能通过节点左侧图标来展开收缩
   */
  onlyIconControl?: boolean
  /**
   * 是否允许点击节点时弹出新窗口跳转。默认 false，若开启，需在节点数据中设定 link 参数（值为 url 格式
   * 废弃：能过事件用户自行控制
   */
  isJump?: boolean
  /**
   * 是否开启连接线。默认 true，若设为 false，则节点左侧出现三角图标。
   */
  showLine?: boolean
  /**
   * 自定义各类默认文本，目前支持以下设定：
   */
  text?: {
    /**
     * 节点默认名称
     */
    defaultNodeName?: () => string | string
    /**
     * 数据为空时的提示文本
     */
    none?: (() => string) | string | VNode | Element
  }
}


export interface EmitData {
  /**
   * 当前点击的节点数据
   */
  data: TreeData
  /**
   * 节点的展开状态
   */
  state: 'open' | 'close' | 'normal'
  /**
   * 当前节点元素
   */
  elem: Element | VNode | VNodeChild
}

export interface TreeEmits {
  /**
   * 节点被点击后触发
   * @param e 事件
   * @param treeNode
   */
  (e: 'on-click', treeNode: EmitData): void
  /**
   * 点击复选框时触发
   * @param e 事件
   * @param treeNode
   */
  (e: 'on-check', treeNode: EmitData): void
  /**
   * 操作节点的回调
   * @param e 事件
   * @param treeNode
   */
  (e: 'on-operate', treeNode: EmitData): void
  (e: 'update:spreadKeys', spreadKeys: string[]): void
}

const props = withDefaults(defineProps<TreeProps>(), {
  showCheckbox: false,
  accordion: false,
  onlyIconControl: false,
  isJump: false,
  showLine: true,
  edit: () => true,
})

const emit = defineEmits<TreeEmits>()

const {
  innerTreeData,
  updateInnerTreeData,
  treeWrapperClass
} = useTreeData(props, emit)

function handleNodeClick(node: TreeNode) {
  updateInnerTreeData(innerTreeData.value, node)
}

</script>
<script lang="ts">
export default {
  name: 'LayTree',
}
</script>
<template>
  <div :class="treeWrapperClass">
    <TreeEntity
      v-for="(node) in innerTreeData"
      :key="node.id"
      :node="node"
      @node-click="handleNodeClick"
    ></TreeEntity>
  </div>
</template>
<style scoped></style>
