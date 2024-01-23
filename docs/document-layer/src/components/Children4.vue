<template>
  <button @click="load">加载</button>
  <ul>
    <li v-for="index of list">{{ index }}</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";

const list = ref(10);

const load = function () {
  list.value = 30;
};
</script>
