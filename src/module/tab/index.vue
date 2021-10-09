<template>
  <div class="layui-tab" :class="[type ? 'layui-tab-' + type : '']">
    <ul class="layui-tab-title">
      <li
        @click="change(ss.props.id)"
        v-for="ss in slots"
        :key="ss"
        :class="[ss.props.id === modelValue ? 'layui-this' : '']"
      >
        {{ ss.props.title }}
      </li>
    </ul>
    <div class="layui-tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup name="LayTab" lang="ts">
import { defineProps, inject, provide, ref, useSlots } from 'vue'

const slot = useSlots() as any
const slots = slot.default && slot.default()

const props =
  defineProps<{
    type?: string
    modelValue?: string
  }>()

// select update 时, 通知 change 事件
const emit = defineEmits(['update:modelValue'])

const active = ref(props.modelValue)

const change = function (id: any) {
  emit('update:modelValue', id)
  active.value = id
}

provide("active",active)
</script>
