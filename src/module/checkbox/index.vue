<template>
  <span @click.stop="handleClick">
    <input type="checkbox" :name="name" :value="label" />
    <div
      class="layui-unselect layui-form-checkbox"
      :class="{
        'layui-checkbox-disbaled layui-disabled': disabled,
        'layui-form-checked': props.checked,
      }"
      :lay-skin="skin"
    >
      <span><slot /></span>
      <i class="layui-icon layui-icon-ok" />
    </div>
  </span>
</template>

<script setup name="LayCheckbox" lang="ts">
import { defineProps, ref } from 'vue'

const props =
  defineProps<{
    name?: string
    skin?: string
    label?: string
    checked?: boolean
    disabled?: boolean
  }>()

const emit = defineEmits(['update:checked', 'change'])

const handleClick = function () {
  if (!props.disabled) {
      emit('update:checked', !props.checked)
      emit('change', !props.checked)
  }
}
</script>
