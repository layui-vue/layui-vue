<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>
<script setup lang="ts">
import { inject, ref } from "vue";

const time = inject("time");
const transition = ref(`opacity ${time}s ease`);
</script>
<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: v-bind(transition);
}
</style>
