<script lang="ts">
export default {
  name: "LayAvatarList",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";
</script>

<template>
  <div class="layui-avatar-list">
    <slot></slot>
  </div>
</template>