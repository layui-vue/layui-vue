<template>
  <span @click="handleClick">
    <input type="checkbox" :name="name" title="写作" :value="label" />
    <div
      class="layui-unselect"
      :class="[
        {
          'layui-checkbox-disbaled layui-disabled': disabled,
        },
        'layui-form-checkbox',
        hasValue ? 'layui-form-checked' : '',
      ]"
      :lay-skin="skin"
    >
      <span><slot></slot></span>
      <i v-if="skin == 'primary'" class="layui-icon layui-icon-ok"></i>
      <i v-if="!skin" class="layui-icon layui-icon-ok"></i>
    </div>
  </span>
</template>

<script setup name="LayCheckbox" lang="ts">
import { defineProps, ref, watch } from 'vue'

const props =
  defineProps<{
    modelValue: Array<unknown>
    label: string
    disabled: boolean
    name: string
    skin: string
  }>()

const hasValue = ref(false)

watch(props.modelValue, (val) => {
  if (props.modelValue.includes(props.label)) {
    hasValue.value = true
  } else {
    hasValue.value = false
  }
},{immediate: true})

const emit = defineEmits(['update:modelValue'])

const handleClick = function () {
  if (!props.disabled) {
    if (!props.modelValue.includes(props.label)) {
      props.modelValue.push(props.label)
    } else {
      let index = props.modelValue.indexOf(props.label)
      props.modelValue.splice(index, 1)
    }
    props.modelValue.includes(props.label)
      ? (hasValue.value = true)
      : (hasValue.value = false)
    if (props.modelValue.includes(props.label)) {
      hasValue.value = true
    } else {
      hasValue.value = false
    }
    emit('update:modelValue', props.modelValue)
  }
}
</script>
