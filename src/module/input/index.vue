<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    class="layui-input"
    :class="{ 'layui-disabled': disabled }"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script setup name="LayInput" lang="ts">
import { defineProps, defineEmits } from 'vue'

const props =
  defineProps<{
    name?: string
    type?: string
    modelValue?: string
    placeholder?: string
    disabled?: boolean
  }>()

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur'])

const onInput = function (event: InputEvent) {
  const inputElement = event.target as HTMLInputElement
  emit('update:modelValue', inputElement.value)
  emit('input', event)
}

const onFocus = function (event: FocusEvent) {
  emit('focus', event)
}

const onBlur = function () {
  emit('blur')
}
</script>
