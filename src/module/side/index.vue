<script lang="ts">
export default {
  name: "LaySide",
};
</script>

<script setup lang="ts">
import { computed, defineProps, CSSProperties } from "vue";
import "./index.less";

export interface LaySideProps {
  width?: string | number;
}

const props = withDefaults(defineProps<LaySideProps>(), {
  width: "200",
});

const styles = computed<CSSProperties>(() => {
  return {
    width: `${props.width}px`,
  };
});
</script>

<template>
  <div class="layui-side" :style="styles">
    <slot />
  </div>
</template>