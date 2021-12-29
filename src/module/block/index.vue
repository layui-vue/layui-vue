<script lang="ts">
export default {
  name: "LayBlock",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";
import "./index.less";

const props = defineProps<{
  nm?: boolean;
}>();
</script>

<template>
  <blockquote class="layui-elem-quote" :class="{ 'layui-quote-nm': nm }">
    <slot></slot>
  </blockquote>
</template>
