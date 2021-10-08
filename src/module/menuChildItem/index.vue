<template>
  <dd :class="[selectKey === id ? 'layui-this':'']" @click="selectHandle()">
    <a href="javascript:void(0)">{{ title }}</a>
  </dd>
</template>

<script setup name="LayMenuChildItem" lang="ts">
import { defineProps, inject, Ref } from 'vue'

const props =
  defineProps<{
    id: string
    title: string
  }>()

const selectKey: Ref<String> = inject("selectKey") as Ref<String>

const selectHandle = function() {
    selectKey.value = props.id
}
</script>
