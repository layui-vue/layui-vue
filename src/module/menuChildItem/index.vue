<template>
  <dd :class="[selectKey === id ? 'layui-this' : '']" @click="selectHandle()">
    <slot v-if="slots.title" name="title"></slot>
    <a v-else href="javascript:void(0)">
      {{title}}
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
