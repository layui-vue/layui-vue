<template>
  <li class="layui-nav-item">
    <a href="">{{ title }} </a>
  </li>

  <li class="layui-nav-item" v-if="slots.default">
    <a href="">
      {{ title }}
      <i class="layui-icon layui-icon-down layui-nav-more"></i>
    </a>
    <dl class="layui-nav-child">
      <slot></slot>
    </dl>
  </li>
</template>

<script setup name="LayMenuItem" lang="ts">
import { defineProps, useSlots } from 'vue'
const slots = useSlots()

const props =
  defineProps<{
    title: string
  }>()
</script>
