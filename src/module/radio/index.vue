<template>
  <span>
    <input type="radio" :value="label" :name="name" />
    <div
      class="layui-unselect layui-form-radio"
      @click="handleClick"
      :class="{
        'layui-form-radioed': modelValue == label,
        'layui-radio-disbaled layui-disabled': disabled,
      }"
    >
      <i
        v-if="modelValue != label"
        class="layui-anim layui-icon layui-anim-scaleSpring"
        :class="{ 'layui-form-radioed': modelValue != label }"
        >&#xe63f;</i
      >
      <i
        v-if="modelValue == label"
        class="layui-anim layui-icon layui-anim-scaleSpring"
        :class="{ 'layui-form-radioed': modelValue == label }"
        >&#xe643;</i
      >
      <span><slot></slot></span>
    </div>
  </span>
</template>

<script setup name="LayRadio" lang="ts">
import { defineProps, defineEmits } from '@vue/runtime-core'

const props =
  defineProps<{
    modelValue: string
    disabled?: boolean
    label?: string
    name: string
  }>()

const emit = defineEmits(['update:modelValue'])

const handleClick = function () {
  if (props.disabled) {
    return false
  }
  emit('update:modelValue', !props.modelValue)
}
</script>