<template>
  <div>
    <div class="layui-transfer layui-form layui-border-box">
      <div class="layui-transfer-box" style="width: 200px; height: 360px">
        <div class="layui-transfer-header">
          <lay-checkbox
            v-model:checked="allLeftChecked"
            skin="primary"
            label="all"
            @change="allLeftChange"
          >
            <span>{{ title[0] }}</span>
          </lay-checkbox>
        </div>
        <ul class="layui-transfer-data" style="height: 320px">
          <li v-for="dataSource in leftDataSource" :key="dataSource">
            <transfer-checkbox
              v-model="leftSelectedKeys"
              skin="primary"
              :label="dataSource[id]"
            >
              <span>{{ dataSource.title }}</span>
            </transfer-checkbox>
          </li>
        </ul>
      </div>
      <div class="layui-transfer-active">
        <lay-button @click="add" type="primary" :disabled="leftSelectedKeys.length==0"
          ><i class="layui-icon layui-icon-next"
        /></lay-button>
        <lay-button @click="remove" type="primary" :disabled="rightSelectedKeys.length==0"
          ><i class="layui-icon layui-icon-prev"
        /></lay-button>
      </div>
      <div class="layui-transfer-box" style="width: 200px; height: 360px">
        <div class="layui-transfer-header">
          <lay-checkbox
            v-model:checked="allRightChecked"
            skin="primary"
            label="all"
            @change="allRightChange"
          >
            <span>{{ title[1] }}</span>
          </lay-checkbox>
        </div>
        <ul class="layui-transfer-data" style="height: 320px">
          <li v-for="dataSource in rightDataSource" :key="dataSource">
            <transfer-checkbox
              v-model="rightSelectedKeys"
              skin="primary"
              :label="dataSource[id]"
            >
              <span>{{ dataSource.title }}</span>
            </transfer-checkbox>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup name="LayTransfer"></script>
<script setup lang="ts">
import { defineProps, Ref, ref, watch } from 'vue'
import { Recordable } from '/@src/module/type'
import transferCheckbox from './component/checkbox.vue'
import { check } from 'prettier'

const props = withDefaults(
  defineProps<{
    id?: string
    title?: string[]
    dataSource: Recordable[]
    selectedKeys: Array<string>
  }>(),
  {
    id: 'id',
    title: function() {
      return ['主列表','副列表']
    },
    dataSource: function () {
      return []
    },
    selectedKeys: function () {
      return []
    },
  }
)

const leftDataSource: Ref<any[]> = ref([...props.dataSource])
const rightDataSource: Ref<any[]> = ref([])

const leftSelectedKeys: Ref<string[]> = ref([])
const rightSelectedKeys: Ref<string[]> = ref([])

const allLeftChecked = ref(false)
const allRightChecked = ref(false)

const allLeftChange = function ({ checked }: any) {
  if (checked) {
    const ids = leftDataSource.value.map((item: any) => {
      return item[props.id]
    })
    leftSelectedKeys.value = ids
  } else {
    leftSelectedKeys.value = []
  }
}

watch(leftSelectedKeys, function(){
  if(leftDataSource.value.length === leftSelectedKeys.value.length ) {
    allLeftChecked.value = true
  } else {
    allLeftChecked.value = false
  }
},{deep:true})

const allRightChange = function ({ checked }: any) {
  if (checked) {
    const ids = rightDataSource.value.map((item: any) => {
      return item[props.id]
    })
    rightSelectedKeys.value = ids
  } else {
    rightSelectedKeys.value = []
  }
}

watch(rightSelectedKeys, function(){
  if(rightDataSource.value.length === rightSelectedKeys.value.length ) {
    allRightChecked.value = true
  } else {
    allRightChecked.value = false
  }
},{deep:true})

const add = function() {
    // 删除 leftDataSource 选中的元素
    rightDataSource.value = leftDataSource.value.filter(
      item => leftSelectedKeys.value.indexOf(item.id) != -1
    )
}

const remove = function() {
    // 删除 rightDataSource 选中的元素
    leftDataSource.value = rightDataSource.value.filter(
      item => rightSelectedKeys.value.indexOf(item.id) != -1
    )
}
</script>
