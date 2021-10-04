<template>
  <ul class="layui-rate">
    <li class="layui-inline">
      <i class="layui-icon layui-icon-rate-solid"></i>
    </li>
    <li class="layui-inline">
      <i class="layui-icon layui-icon-rate-solid"></i>
    </li>
    <li class="layui-inline"><i class="layui-icon layui-icon-rate"></i></li>
    <li class="layui-inline"><i class="layui-icon layui-icon-rate"></i></li>
    <li class="layui-inline"><i class="layui-icon layui-icon-rate"></i></li>
  </ul>
</template>
<script setup lang="ts">
import { defineProps, ref, withDefaults } from 'vue'

const rate = ref([])

const props = withDefaults(
  defineProps<{
    length?: number
    modelValue?: number
  }>(),
  {
    length: 5,
    modelValue: 0
  }
)
</script>
