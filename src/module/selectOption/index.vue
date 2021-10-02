<template>
    <dd :value="value">
        <slot></slot>
    </dd>
</template>

<script setup name="LaySelectOption" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    value?: string
  }>()
</script>
