<template>
  <div class="layui-colla-item">
    <h2 class="layui-colla-title">
      {{ title }}<i class="layui-icon layui-colla-icon"></i>
    </h2>
    <div class="layui-colla-content layui-show">
      <p>
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script setup name="LayCollapseItem" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    title?: string
  }>()
</script>
