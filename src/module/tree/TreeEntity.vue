<script lang="ts">
export default {
  name: 'LayTreeEntity',
}
</script>
<script setup lang="ts">
import { computed, unref, VNode, VNodeChild } from 'vue'
import LayIcon from '../icon'

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

interface TreeEntityProps {
  node: TreeData
  id: string | number
}

const props = defineProps<TreeEntityProps>()
</script>
<template>
  <template v-if="node.children && node.children.length > 0">
    <div
      class="layui-tree-set"
      :class="{
        // 'layui-tree-setLineShort': (index + 1) === data.length,
        'layui-tree-setLineShort': false,
        'layui-tree-setHide': node._isRoot,
      }"
    >
      <!--    {{index}}, {{ data.length }}-->
      <div class="layui-tree-entry">
        <div class="layui-tree-main">
          <span
            class="layui-tree-iconClick layui-tree-icon"
          >
            <LayIcon
              type="layui-icon-subtraction"
            ></LayIcon>
          </span>
          <span class="layui-tree-txt">{{ node.title }}---{{node._hasChild}}</span>
        </div>
      </div>
      <div
        class="layui-tree-pack layui-tree-lineExtend layui-tree-showLine"
        style="display: block"
      >
        <LayTreeEntity
          v-for="(item, index) in node.children"
          :key="index"
          :node="item"
          :id="item.id"
        ></LayTreeEntity>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="layui-tree-set" :class="{'layui-tree-setLineShort': false}"><!-- :class="{'layui-tree-setLineShort': isLast}"-->
      <div class="layui-tree-entry">
        <div class="layui-tree-main">
          <span
            class="layui-tree-iconClick">
            <LayIcon
              type="layui-icon-file"
            ></LayIcon>
          </span>
          <span class="layui-tree-txt">{{ node.title }}, {{node._hasChild}},{{node._parentExtend}}</span>
        </div>
      </div>
    </div>
  </template>
</template>
<style scoped lang="less"></style>
