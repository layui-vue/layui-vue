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
        placeholder="请选择"
        :value="name"
        class="layui-input layui-unselect"
        @input="change"
        style="
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: whitesmoke;
        "
      /><i class="layui-edge"></i>
    </div>
    <dl class="layui-anim layui-anim-upbit" style="">
      <dd lay-value="" class="layui-select-tips">请选择</dd>
      <dd
        v-for="data in datas"
        lay-value=""
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

const name = ref('')

const open = function () {
  openState.value = !openState.value
}

const jump = function (data: any) {
  router.push(data.path)
  name.value = data.title
}
</script>