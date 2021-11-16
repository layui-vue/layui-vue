<script lang="ts">
export default {
  name: "LayRow",
};
</script>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import "./index.less";

const props = defineProps<{
  space?: string;
}>();

const classes = computed(() => {
  return [props.space ? "layui-col-space" + props.space : ""];
});
</script>

<template>
  <div class="layui-row" :class="classes">
    <slot />
  </div>
</template>

