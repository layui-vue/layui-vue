<template>
  <input :type="type" :value="modelValue" :placeholder="placeholder" :name="name" class="layui-input" @input="updateValue"/>
</template>

<script setup name="LayInput" lang="ts">
import { defineProps, defineEmits } from '@vue/runtime-core'

const props =
  defineProps<{
    name?: string
    type?: string
    modelValue?: string
    placeholder?: string
  }>()

const emit = defineEmits(['update:modelValue'])

const updateValue = function(event: InputEvent) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

</script>
