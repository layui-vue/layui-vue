<template>
  <dd :class="[selectKey === id ? 'layui-this' : '']" @click="selectHandle()">
    <a href="javascript:void(0)">
      <slot v-if="slots.title" name="title"></slot>
      <span v-else> {{ title }} </span>
    </a>
  </dd>
</template>

<script setup name="LayMenuChildItem" lang="ts">
import { defineProps, inject, Ref, useSlots } from 'vue'

const slots = useSlots()

const props =
  defineProps<{
    id: string
    title: string
  }>()

const selectKey: Ref<string> = inject('selectKey') as Ref<string>

const selectHandle = function () {
  selectKey.value = props.id
}
</script>
