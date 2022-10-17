<script lang="ts">
export default {
  name: "LaySide",
};
</script>

<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import "./index.less";

export interface SideProps {
  width?: string | number;
}

const props = withDefaults(defineProps<SideProps>(), {
  width: "200px",
});

const styles = computed<CSSProperties>(() => {
  return {
    flex: `0 0 ${props.width}`,
    width: `${props.width}`,
  };
});
</script>

<template>
  <div class="layui-side" :style="styles">
    <slot></slot>
  </div>
</template>
