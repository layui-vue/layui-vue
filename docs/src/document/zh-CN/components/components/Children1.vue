<script setup>
defineProps({
  data: Object,
});
</script>

<template>
  <form>
    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <input v-model="data.remark" type="textarea">
  </form>
</template>

<style scoped>
form {
  padding: 10px;
}
</style>
