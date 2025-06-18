<script setup>
const emit = defineEmits(["add", "sub"]);

function add() {
  emit("add");
}

function sub() {
  emit("sub");
}
</script>

<template>
  <form>
    <button type="button" style="width: 50%" @click="add">
      加
    </button>
    <button type="button" style="width: 50%" @click="sub">
      减
    </button>
  </form>
</template>

<style scoped>
form {
  padding: 10px;
}
</style>
