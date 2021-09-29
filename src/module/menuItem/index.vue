<template>
    <li class="layui-nav-item">
        <a href="">{{title}}
            <i class="layui-icon layui-icon-down layui-nav-more" v-if="slots.default"></i>
        </a>
        <dl class="layui-nav-child" v-if="slots.default">
            <slot></slot>
        </dl>
    </li>
</template>

<script setup name="LayMenuItem" lang="ts">
import { defineProps, useSlots } from 'vue'
const slots = useSlots();

const props =
  defineProps<{
    title: string
  }>()
</script>
