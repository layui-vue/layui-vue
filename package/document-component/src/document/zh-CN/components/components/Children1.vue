<template>
  <form>
    <input type="textarea" v-model="data.remark" />
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
