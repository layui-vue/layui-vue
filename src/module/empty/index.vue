<template>
  <div class="layui-empty">
    <div class="layui-empty-image">
      <img class="layui-empty-image-default" src="./index.svg" />
    </div>
    <div class="layui-empty-description">{{ description }}</div>
  </div>
</template>

<script setup name="LayEmpty" lang="ts">
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    description?: string
  }>(),
  {
    description: '暂无数据',
  }
)
</script>
