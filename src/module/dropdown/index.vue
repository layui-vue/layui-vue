<template>
  <div class="layui-dropdown" @click="open" :class="[openState?'layui-dropdown-up':'']">
    <slot></slot>
    <dl class="layui-anim layui-anim-upbit">
      <slot name="content"></slot>
    </dl>
  </div>
</template>

<script setup name="LaySelect" lang="ts">
import { defineProps, ref } from 'vue'

const props =
  defineProps<{
    trigger?: string
  }>()

const openState = ref(false)

const open = function() {
    openState.value = !openState.value
}
</script>
