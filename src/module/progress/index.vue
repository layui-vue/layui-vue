<template>
  <div class="layui-progress" :class="'layui-progress-' + size">
    <div
      class="layui-progress-bar"
      :class="'layui-bg-' + this.theme"
      :style="[
        this.color ? 'background-color: ' + this.color : '',
        {
          width: this.percent + '%',
        },
      ]"
    >
      <span v-if="showText" class="layui-progress-text">
        {{ text ? text : this.percent + '%' }}
      </span>
    </div>
  </div>
</template>
<script setup name="LayProgress" lang="ts">
import { defineProps } from '@vue/runtime-core'

const props =
  defineProps<{
    percent: Number
    theme: String
    color: String
    size: String
    showText: Boolean
    text: String
  }>()
</script>