<template>
  <span @click.stop="handleClick">
    <div
      class="layui-unselect layui-form-switch"
      :class="{
        'layui-form-onswitch': modelValue == true,
        'layui-checkbox-disbaled layui-disabled': disabled,
      }"
    >
      <em>{{ modelValue == true ? activeText : inactiveText }}</em>
      <i />
    </div>
  </span>
</template>

<script setup name="LaySwitch" lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    disabled?: boolean
    activeText?: string
    inactiveText?: string
  }>(),
  {
    activeText: '启用',
    inactiveText: '禁用',
  }
)

const emit = defineEmits(['update:modelValue', 'change'])

const handleClick = function () {
  if (props.disabled) {
    return false
  }
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue)
}
</script>
