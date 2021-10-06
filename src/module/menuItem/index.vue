<template>
  <li class="layui-nav-item">
    <a href="javascript:void(0)">{{ title }} </a>
  </li>

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
</template>

<script setup name="LayMenuItem" lang="ts">
import { defineProps, inject, ref, useSlots } from 'vue'
const slots = useSlots()

const props =
  defineProps<{
    key: string
    title: string
  }>()

const isOpen = ref(false)

const isTree = inject('isTree')
const selectKeys = inject('selectKeys')

const openHandle = function () {
  isOpen.value = !isOpen.value
}
</script>
