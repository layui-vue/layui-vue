<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    class="layui-input"
    :class="{ 'layui-disabled': disabled }"
    @input="updateValue"
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
    disabled?: Boolean
  }>()

const emit = defineEmits(['update:modelValue', 'input'])

const updateValue = function (event: InputEvent) {
  const inputElement = event.target as HTMLInputElement
  emit('update:modelValue', inputElement.value)
  emit('input', inputElement.value)
}
</script>
