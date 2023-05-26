<template>
  <form>
    <textarea v-model="data.remark" :rows="10" :cols="40" />
  </form>
</template>
<script setup>
const emit = defineEmits("called");

const props = defineProps({
  data: Object,
});
</script>

<style scoped>
form {
  padding: 10px;
}
</style>
