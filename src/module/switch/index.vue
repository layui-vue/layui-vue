<template>
  <span @click="handleClick">
    <div
      class="layui-unselect layui-form-switch"
      :class="{
        'layui-form-onswitch': modelValue == true,
        'layui-checkbox-disbaled layui-disabled': disabled,
      }"
    >
      <em>{{ modelValue == true ? '启用' : '禁用' }}</em>
      <i />
    </div>
  </span>
</template>

<script setup name="LaySwitch" lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: boolean
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const handleClick = function () {
  if (props.disabled) {
    return false
  }
  emit('update:modelValue', !props.modelValue)
}
</script>
