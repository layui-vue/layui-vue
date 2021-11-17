<script lang="ts">
export default {
  name: "LayIcon",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";

export interface LayIconProps {
  prefix?: string;
  color?: string;
  size?: string;
  type?: string;
}

const props = withDefaults(defineProps<LayIconProps>(), {
  prefix: "layui-icon",
});
</script>

<template>
  <i :class="[prefix, type]" :style="{ color: color, fontSize: size }" />
</template>