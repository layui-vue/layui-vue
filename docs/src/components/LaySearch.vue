<template>
  <select :name="name" lay-verify="required"></select>
  <div
    class="layui-unselect layui-form-select"
    @click="open"
    :class="[openState ? 'layui-form-selected' : '']"
  >
    <div class="layui-select-title">
      <input
        type="text"
        placeholder="Search"
        class="layui-input layui-unselect"
        @input="change"
        :value="name"
        style="
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: whitesmoke;
        "
      /><i class="layui-edge"></i>
    </div>
    <dl class="layui-anim layui-anim-upbit" style="">
      <dd v-if="menus.length <= 0" class="layui-select-tips">无内容</dd>
      <dd
        v-else
        v-for="data in menus"
        :value = "name"
        @click="jump(data)"
        :key="data"
        class="layui-select-tips"
      >
        {{ data.title }}
      </dd>
    </dl>
  </div>
</template>

<script setup name="LaySelect" lang="ts">
import { defineProps, Ref, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props =
  defineProps<{
    datas?: object[]
  }>()

const route = useRoute()
const router = useRouter()

const openState = ref(false)
const menus = ref(props.datas)
const name = ref('')

const open = function () {
  openState.value = !openState.value
}

const jump = function (data: any) {
  name.value = data.title
  router.push(data.path)
}

const change = function(e: any) {
  name.value = e.target.value
  if(e.target.value === ""){
    menus.value = props.datas
  }else{
    menus.value = searchList(e.target.value, props.datas);
  }
}

const searchList = function (str: String, container: any) {
  var newList = []
  var startChar = str.charAt(0)
  var strLen = str.length
  for (var i = 0; i < container.length; i++) {
    var obj = container[i]
    var isMatch = false
    for (var p in obj) {
      if (typeof obj[p] == 'function') {
        obj[p]()
      } else {
        var curItem = ''
        if (obj[p] != null) {
          curItem = obj[p]
        }
        for (var j = 0; j < curItem.length; j++) {
          if (curItem.charAt(j) == startChar) {
            if (curItem.substring(j).substring(0, strLen) == str) {
              isMatch = true
              break
            }
          }
        }
      }
    }
    if (isMatch) {
      newList.push(obj)
    }
  }
  return newList
}
</script>