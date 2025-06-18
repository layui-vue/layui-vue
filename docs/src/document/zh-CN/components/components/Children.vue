<script setup>
defineProps({
  data: Object,
});
</script>

<template>
  <form>
    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <textarea v-model="data.remark" :rows="10" :cols="40" />
  </form>
</template>

<style scoped>
form {
  padding: 10px;
}
</style>
