<template>
  <form>
    <button type="button" @click="add" style="width: 50%">加</button>
    <button type="button" @click="sub" style="width: 50%">减</button>
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
