<script lang="ts">
export default {
  name: "LayRow",
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import "./index.less";

export interface LayRowProps {
  space?: string;
}

const props = defineProps<LayRowProps>();

const classes = computed(() => {
  return [props.space ? `layui-col-space${props.space}` : ""];
});
</script>

<template>
  <div class="layui-row" :class="classes">
    <slot></slot>
  </div>
</template>
