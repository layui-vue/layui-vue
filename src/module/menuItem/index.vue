<template>
    <li class="layui-nav-item">
         <a href="">{{title}}</a>
    </li>
</template>

<script setup name="LayMenuItem" lang="ts">
import { defineProps } from 'vue'

const props =
  defineProps<{
    title: string
  }>()
</script>
