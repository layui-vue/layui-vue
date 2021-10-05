<template>
  <li class="layui-nav-item">
    <a href="javascript:void(0)">{{ title }} </a>
  </li>

  <li class="layui-nav-item" :class="[isOpen?'layui-nav-itemed':'']" v-if="slots.default">
    <a href="javascript:void(0)" @click="openHandle">
      {{ title }}
      <i class="layui-icon layui-icon-down layui-nav-more"></i>
    </a>
    <dl class="layui-nav-child">
      <slot></slot>
    </dl>
  </li>
</template>

<script setup name="LayMenuItem" lang="ts">
import { defineProps, ref, useSlots } from 'vue'
const slots = useSlots()

const props =
  defineProps<{
    title: string
}>()

const isOpen = ref(false)

const openHandle = function() {
  isOpen.value = !isOpen.value
}

</script>
