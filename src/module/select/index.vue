<template>
  <select :name="name" lay-verify="required">
  </select>
  <div class="layui-unselect layui-form-select" @click="open" :class="[openState?'layui-form-selected':'']">
    <div class="layui-select-title">
      <input
        type="text"
        placeholder="请选择"
        :value="selectItem.label"
        readonly=""
        class="layui-input layui-unselect"
      /><i class="layui-edge"></i>
    </div>
    <dl class="layui-anim layui-anim-upbit" style="">
      <dd lay-value="" @click="clean"  class="layui-select-tips">请选择</dd>
      <slot></slot>
    </dl>
  </div>
</template>

<script setup name="LaySelect" lang="ts">
import { defineProps, provide, reactive, ref, watch } from 'vue'

const props =
  defineProps<{
    modelValue?: string
    name?: string
  }>()

const openState = ref(false)

const open = function() {
    openState.value = !openState.value
}

const selectItem = reactive({label:"",value:props.modelValue});

provide("selectItem",selectItem);

// select update 时, 通知 change 事件
const emit = defineEmits(['update:modelValue'])

watch(selectItem, function(item) {
  emit('update:modelValue', item.value)
})

const clean = function() {
  selectItem.value = "";
  selectItem.label = "";
}

</script>
