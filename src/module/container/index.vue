<template>
  <div :class="classes">
      <slot></slot>
  </div>
</template>

<script setup name="LayContainer" lang="ts">
import { defineProps } from '@vue/runtime-core'

const props =
  defineProps<{
    fluid?: boolean
  }>()

const classes = props.fluid ? 'layui-fluid' : 'layui-container'

</script>
