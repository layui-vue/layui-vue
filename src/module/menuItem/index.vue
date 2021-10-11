<template>

  <li
    class="layui-nav-item"
    :class="[isOpen && isTree ? 'layui-nav-itemed' : '']"
    v-if="slots.default"
  >
    <a href="javascript:void(0)" @click="openHandle">
      {{ title }}
      <i class="layui-icon layui-icon-down layui-nav-more"></i>
    </a>
    <dl
      class="layui-nav-child"
      :class="[
        isOpen && !isTree ? 'layui-show' : '',
        !isTree ? 'layui-anim layui-anim-upbit' : '',
      ]"
    >
      <slot></slot>
    </dl>
  </li>

  <li v-else class="layui-nav-item" @click="selectHandle()" :class="[selectKey === id ? 'layui-this':'']">
    <a href="javascript:void(0)">{{ title }} </a>
  </li>
</template>

<script setup name="LayMenuItem" lang="ts">
import { defineProps, inject, Ref, ref, useSlots } from 'vue'
const slots = useSlots()

const props =
  defineProps<{
    id: string
    title: string
  }>()

const isOpen = ref(false)

const isTree = inject('isTree')
const selectKey: Ref<String> = inject('selectKey') as Ref<String>

const openHandle = function () {
  isOpen.value = !isOpen.value
}

const selectHandle = function() {
    selectKey.value = props.id
}
</script>
