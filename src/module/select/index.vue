<template>
  <select name="city" lay-verify="required">
    <option value=""></option>
    <option value="0">北京</option>
    <option value="1">上海</option>
    <option value="2">广州</option>
    <option value="3">深圳</option>
    <option value="4">杭州</option>
  </select>
  <div class="layui-unselect layui-form-select" @click="open" :class="[openState?'layui-form-selected':'']">
    <div class="layui-select-title">
      <input
        type="text"
        placeholder="请选择"
        value=""
        readonly=""
        class="layui-input layui-unselect"
      /><i class="layui-edge"></i>
    </div>
    <dl class="layui-anim layui-anim-upbit" style="">
      <dd lay-value="" class="layui-select-tips">请选择</dd>
      <dd lay-value="0" class="layui-this">北京</dd>
      <dd lay-value="1" class="">上海</dd>
      <dd lay-value="2" class="">广州</dd>
      <dd lay-value="3" class="">深圳</dd>
      <dd lay-value="4" class="">杭州</dd>
    </dl>
  </div>
</template>

<script setup name="LaySelect" lang="ts">
import { defineProps, ref } from 'vue'

const props =
  defineProps<{
    modelValue?: string
  }>()

const openState = ref(false)

const open = function() {
    openState.value = !openState.value
}
</script>
