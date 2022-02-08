<script lang="ts">
export default {
  name: "LayBlock",
};
</script>

<script setup lang="ts">
import "./index.less";

const props = defineProps<{
  nm?: boolean | string;
}>();
</script>

<template>
  <blockquote class="layui-elem-quote" :class="{ 'layui-quote-nm': nm }">
    <slot></slot>
  </blockquote>
</template>
