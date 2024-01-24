<template>
  <form>
    <button type="button" @click="add">加</button>
    <button type="button" @click="sub">减</button>
  </form>
</template>
<script setup>
const emit = defineEmits(["add", "sub"]);

const add = () => {
  emit("add");
};

const sub = () => {
  emit("sub");
};
</script>

<style scoped>
form {
  padding: 10px;
}
</style>
