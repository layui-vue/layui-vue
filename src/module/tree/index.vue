<script setup lang="ts">
import { computed, unref, VNode, VNodeChild } from 'vue'
import TreeEntity from './TreeEntity.vue'

interface TreeData {
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

type EditAction = 'add' | 'update' | 'del'

type EditType = boolean | EditAction[]

interface TreeProps {
  /**
   * 指定唯一的id
   */
  id?: string
  /**
   * 选中的节点
   */
  checkedKeys?: any[]
  /**
   * 展开的节点
   */
  spreadKeys?: any[]
  /**
   * 数据源
   */
  data?: TreeData
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
    none?: () => string | string | VNode | Element
  }
}

interface TreeNode {
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

interface TreeEmits {
  /**
   * 节点被点击后触发
   * @param e 事件
   * @param treeNode
   */
  (e: 'on-click', treeNode: TreeNode): void
  /**
   * 点击复选框时触发
   * @param e 事件
   * @param treeNode
   */
  (e: 'on-check', treeNode: TreeNode): void
  /**
   * 操作节点的回调
   * @param e 事件
   * @param treeNode
   */
  (e: 'on-operate', treeNode: TreeNode): void
  (e: 'update:checkedKeys', keys: any[]): void
  (e: 'update:spreadKeys', keys: any[]): void
}

const props = withDefaults(defineProps<TreeProps>(), {
  showCheckbox: false,
  accordion: false,
  onlyIconControl: false,
  isJump: false,
  showLine: true,
  edit: true,
})

// tree wrapper style
const treeWrapperClass = computed(() => {
  const { showCheckbox, showLine } = unref(props)
  return {
    'layui-tree': true,
    'layui-form': showCheckbox,
    'layui-tree-line': showLine,
  }
})

/**
 * 按 layui的思路，这里改变数据
 * @param data
 * @param isRootNode
 */
function transformTreeData (data: TreeData[], parentExtend = false, isRootNode = true) {
  data.forEach((item, index) => {
    item._parentExtend = !parentExtend ? (index + 1) !== data.length: parentExtend
    if(isRootNode) {
      item._isRoot = true
    }
    if (item.children) {
      item._hasChild = true
      transformTreeData(item.children, item._parentExtend, false)
    } else {
      item._hasChild = false
    }
  })
}

const renderData = computed(() => {
  const { data } = unref(props)
  transformTreeData(data)
  console.log(data)
  return data
})

console.log(renderData)

</script>
<script lang="ts">
export default {
  name: 'LayTree',
}
</script>
<template>
  <div :class="treeWrapperClass">
    <TreeEntity
      v-for="(node) in renderData"
      :key="node.id"
      :id="node.id"
      :node="node"
    ></TreeEntity>
  </div>
  <hr />
  <div class="layui-tree layui-tree-line" lay-filter="LAY-tree-2">
    <div
      data-id="1"
      class="layui-tree-set layui-tree-setHide layui-tree-spread"
    >
      <div class="layui-tree-entry">
        <div class="layui-tree-main">
          <span class="layui-tree-iconClick layui-tree-icon"
            ><i class="layui-icon layui-icon-subtraction"></i></span
          ><span class="layui-tree-txt">江西</span>
        </div>
      </div>
      <div
        class="layui-tree-pack layui-tree-lineExtend layui-tree-showLine"
        style="display: block"
      >
        <div data-id="1000" class="layui-tree-set layui-tree-spread">
          <div class="layui-tree-entry">
            <div class="layui-tree-main">
              <span class="layui-tree-iconClick layui-tree-icon"
                ><i class="layui-icon layui-icon-subtraction"></i></span
              ><span class="layui-tree-txt">南昌</span>
            </div>
          </div>
          <div
            class="layui-tree-pack layui-tree-lineExtend layui-tree-showLine"
            style="display: block"
          >
            <div data-id="10001" class="layui-tree-set">
              <div class="layui-tree-entry">
                <div class="layui-tree-main">
                  <span class="layui-tree-iconClick"
                    ><i class="layui-icon layui-icon-file"></i></span
                  ><span class="layui-tree-txt">青山湖区</span>
                </div>
              </div>
            </div>
            <div data-id="10002" class="layui-tree-set layui-tree-setLineShort">
              <div class="layui-tree-entry">
                <div class="layui-tree-main">
                  <span class="layui-tree-iconClick"
                    ><i class="layui-icon layui-icon-file"></i></span
                  ><span class="layui-tree-txt">高新区</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-id="1001" class="layui-tree-set">
          <div class="layui-tree-entry">
            <div class="layui-tree-main">
              <span class="layui-tree-iconClick"
                ><i class="layui-icon layui-icon-file"></i></span
              ><span class="layui-tree-txt">九江</span>
            </div>
          </div>
        </div>
        <div data-id="1002" class="layui-tree-set">
          <div class="layui-tree-entry">
            <div class="layui-tree-main">
              <span class="layui-tree-iconClick"
                ><i class="layui-icon layui-icon-file"></i></span
              ><span class="layui-tree-txt">赣州</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      data-id="2"
      class="layui-tree-set layui-tree-setHide layui-tree-spread"
    >
      <div class="layui-tree-entry">
        <div class="layui-tree-main">
          <span class="layui-tree-iconClick layui-tree-icon"
            ><i class="layui-icon layui-icon-subtraction"></i></span
          ><span class="layui-tree-txt">广西</span>
        </div>
      </div>
      <div
        class="layui-tree-pack layui-tree-lineExtend layui-tree-showLine"
        style="display: block"
      >
        <div data-id="2000" class="layui-tree-set">
          <div class="layui-tree-entry">
            <div class="layui-tree-main">
              <span class="layui-tree-iconClick"
                ><i class="layui-icon layui-icon-file"></i></span
              ><span class="layui-tree-txt">南宁</span>
            </div>
          </div>
        </div>
        <div data-id="2001" class="layui-tree-set">
          <div class="layui-tree-entry">
            <div class="layui-tree-main">
              <span class="layui-tree-iconClick"
                ><i class="layui-icon layui-icon-file"></i></span
              ><span class="layui-tree-txt">桂林</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      data-id="3"
      class="layui-tree-set layui-tree-setHide layui-tree-setLineShort layui-tree-spread"
    >
      <div class="layui-tree-entry">
        <div class="layui-tree-main">
          <span class="layui-tree-iconClick layui-tree-icon"
            ><i class="layui-icon layui-icon-subtraction"></i></span
          ><span class="layui-tree-txt">陕西</span>
        </div>
      </div>
      <div class="layui-tree-pack layui-tree-lineExtend" style="display: block">
        <div data-id="3000" class="layui-tree-set">
          <div class="layui-tree-entry">
            <div class="layui-tree-main">
              <span class="layui-tree-iconClick"
                ><i class="layui-icon layui-icon-file"></i></span
              ><span class="layui-tree-txt">西安</span>
            </div>
          </div>
        </div>
        <div data-id="3001" class="layui-tree-set layui-tree-setLineShort">
          <div class="layui-tree-entry">
            <div class="layui-tree-main">
              <span class="layui-tree-iconClick"
                ><i class="layui-icon layui-icon-file"></i></span
              ><span class="layui-tree-txt">延安</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
