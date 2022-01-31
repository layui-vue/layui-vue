<script lang="ts">
export default {
  name: "LayScroll"
}
</script>

<script setup lang="ts">
import { defineProps } from "vue";
</script>

<template>
  <div class="layui-side-scroll">
    <slot></slot>
  </div>
</template>