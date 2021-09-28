<template>
  <li class="layui-timeline-item">
    <i class="layui-icon layui-timeline-axis"></i>
    <div class="layui-timeline-content layui-text">
      <div v-if="simple" class="layui-timeline-title">
        {{ title }}
      </div>
      <h3 v-else class="layui-timeline-title">
        {{ title }}
      </h3>
      <slot></slot>
    </div>
  </li>
</template>

<script setup name="LayTimelineItem" lang="ts">
import { defineProps } from '@vue/runtime-core'

const props =
  defineProps<{
    title: string
    simple?: boolean
  }>()
</script>
