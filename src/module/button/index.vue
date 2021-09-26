<template>
    <button class="layui-btn" :class="[type ? 'layui-btn-' + type : '']">
        <slot></slot>
    </button>
</template>

<script setup name="LayButton" lang="ts">
import { defineProps } from "@vue/runtime-core";

const props = defineProps<{
  type?: string
}>()

</script>
