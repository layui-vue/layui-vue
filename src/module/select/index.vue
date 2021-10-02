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
      <slot></slot>
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
