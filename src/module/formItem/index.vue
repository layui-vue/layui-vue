<template>
  <div class="layui-form-item">
    <label class="layui-form-label">{{ label }}</label>
    <div :class="[mode ? 'layui-input-' + mode : '']" class="layui-input-block">
      <slot></slot>
    </div>
  </div>
</template>
<script setup name="LayFormItem" lang="ts">
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    mode?: string
    label?: string
  }>(),
  {
    mode: 'block',
  }
)
</script>
