<script lang="ts">
export default {
  name: "LayRow",
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import "./index.less";

export interface RowProps {
  space?: string | number;
}

const props = defineProps<RowProps>();

const classes = computed(() => {
  return [props.space ? `layui-col-space${props.space}` : ""];
});
</script>

<template>
  <div class="layui-row" :class="classes">
    <slot></slot>
  </div>
</template>
