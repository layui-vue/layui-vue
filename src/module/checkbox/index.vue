<template>
  <span @click="handleClick">
    <input type="checkbox" :name="name" :value="label" />
    <div
      class="layui-unselect"
      :class="[
        {
          'layui-checkbox-disbaled layui-disabled': disabled,
        },
        'layui-form-checkbox',
        props.modelValue.includes(props.label) ? 'layui-form-checked' : '',
      ]"
      :lay-skin="skin"
    >
      <span><slot /></span>
      <i v-if="skin == 'primary'" class="layui-icon layui-icon-ok" />
      <i v-if="!skin" class="layui-icon layui-icon-ok" />
    </div>
  </span>
</template>

<script setup name="LayCheckbox" lang="ts">
import { defineProps, ref, watch } from 'vue'

const props =
  defineProps<{
    modelValue: string[]
    label: string
    disabled?: boolean
    name?: string
    skin?: string
  }>()

const hasValue = ref(false)

const emit = defineEmits(['update:modelValue'])

const handleClick = function () {
  if (!props.disabled) {
    if (!props.modelValue.includes(props.label)) {
      props.modelValue.push(props.label)
    } else {
      let index = props.modelValue.indexOf(props.label)
      props.modelValue.splice(index, 1)
    }
    emit('update:modelValue', props.modelValue)
  }
}
</script>
