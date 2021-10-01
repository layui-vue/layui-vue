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
import { defineProps, inject } from 'vue'

const props =
  defineProps<{
    key?: string
    title?: string
  }>()

const openKeys = inject('openKeys');

</script>
