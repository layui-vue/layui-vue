<template>
  <div class="layui-progress" :class="'layui-progress-' + size">
    <div
      class="layui-progress-bar"
      :class="'layui-bg-' + theme"
      :style="[
        color ? 'background-color: ' + color : '',
        {
          width: percent + '%',
        },
      ]"
    >
      <span v-if="showText" class="layui-progress-text">
        {{ text ? text : percent + '%' }}
      </span>
    </div>
  </div>
</template>
<script setup name="LayProgress" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    percent: number | string
    theme?: string
    color?: string
    size?: string
    showText?: boolean
    text?: string
  }>()
</script>