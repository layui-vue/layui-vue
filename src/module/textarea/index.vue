<template>
    <textarea :value="modelValue" :placeholder="placeholder" :name="name" class="layui-textarea" @input="updateValue"></textarea>
</template>

<script setup name="LayTextarea" lang="ts">
import { defineProps, defineEmits } from '@vue/runtime-core'

const props =
  defineProps<{
    name?: string
    modelValue?: string
    placeholder?: string
  }>()

const emit = defineEmits(['update:modelValue'])

const updateValue = function(event: InputEvent) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

</script>
