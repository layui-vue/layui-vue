<script lang="ts">
export default {
  name: "LayTimeline",
};
</script>

<script setup lang="ts">
import "./index.less"
</script>

<template>
  <ul class="layui-timeline">
    <slot />
  </ul>
</template>