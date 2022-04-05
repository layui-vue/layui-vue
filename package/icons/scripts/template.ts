module.exports = {
  Component: (data) => {
    return `<script lang="ts">
export default {
  name: "${data.name}",
};
</script>
<script setup lang="ts">
import LayIcon from "../component/icon/index";
      
const props = defineProps<{
  color?: string;
  size?: string;
}>();
</script>
<template>
  <lay-icon
    :color="props.color"
    :size="props.size"
    type="${data.class}"
  />
</template>`;
  },
  Index: (names) => {
    let result = ``;
    names.forEach((name) => {
      result += `export { default as ${name} } from './${name}.vue';` + "\r\n";
    });
    return result;
  },
};
