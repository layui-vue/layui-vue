<template>
  <input :type="type" :value="modelValue" :name="name" class="layui-input" @input="updateValue"/>
</template>

<script setup name="LayInput" lang="ts">
import { defineProps, defineEmits } from '@vue/runtime-core'

const props =
  defineProps<{
    name?: string
    type?: string
    modelValue?: string
  }>()

const emit = defineEmits(['update:modelValue'])

const updateValue = function(event: unknown,value: unknown) {
  emit('update:modelValue', value)
}

</script>
