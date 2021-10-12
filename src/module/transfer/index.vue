<template>
  <div>
    <div class="layui-transfer layui-form layui-border-box">
      <div class="layui-transfer-box" style="width: 200px; height: 360px">
        <div class="layui-transfer-header">
          <lay-checkbox
            v-model="allLeftSelectedKeys"
            skin="primary"
            label="all"
          >
            <span>列表一</span>
          </lay-checkbox>
        </div>
        <ul class="layui-transfer-data" style="height: 320px">
          <li v-for="dataSource in leftDataSource" :key="dataSource">
            <lay-checkbox
              v-model="leftSelectedKeys"
              skin="primary"
              :label="dataSource[id]"
            >
              <span>{{ dataSource.title }}</span>
            </lay-checkbox>
          </li>
        </ul>
      </div>
      <div class="layui-transfer-active">
        <button
          type="button"
          class="layui-btn layui-btn-sm layui-btn-primary layui-btn-disabled"
          data-index="0"
        >
          <i class="layui-icon layui-icon-next" /></button
        ><button
          type="button"
          class="layui-btn layui-btn-sm layui-btn-primary layui-btn-disabled"
          data-index="1"
        >
          <i class="layui-icon layui-icon-prev" />
        </button>
      </div>
      <div class="layui-transfer-box" style="width: 200px; height: 360px">
        <div class="layui-transfer-header">
          <lay-checkbox
            v-model="allRightSelectedKeys"
            skin="primary"
            label="all"
          >
            <span>列表二</span>
          </lay-checkbox>
        </div>
        <ul class="layui-transfer-data" style="height: 320px">
          <li v-for="dataSource in rightDataSource" :key="dataSource">
            <lay-checkbox
              v-model="rightSelectedKeys"
              skin="primary"
              :label="dataSource[id]"
            >
              <span>{{ dataSource.title }}</span>
            </lay-checkbox>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup name="LayTransfer"></script>
<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { Recordable } from '/@src/module/type'

const props = withDefaults(
  defineProps<{
    id?: string
    dataSource: Recordable[]
    selectedKeys: Array<string>
  }>(),
  {
    id: 'id',
    dataSource: function () {
      return []
    },
    selectedKeys: function () {
      return []
    },
  }
)

const leftDataSource = ref([...props.dataSource])
const rightDataSource = ref([])

const leftSelectedKeys = ref([])
const rightSelectedKeys = ref([])

const allLeftSelectedKeys = ref([])
const allRightSelectedKeys = ref([])
</script>
