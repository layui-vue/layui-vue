<script setup>
const emit = defineEmits(["on-click"]);

const handleClick1 = () => {
  emit("on-click");
  console.log("123");
};
</script>

<template>
  <div class="demo">
    <lay-button @click="handleClick1">隐藏json-from-text</lay-button>
  </div>
</template>

<style scoped>
.demo {
  height: 200px;
  background-color: pink;
}
</style>
