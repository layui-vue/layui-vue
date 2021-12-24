<script lang="ts">
export default {
  name: "LayPanel",
};
</script>

<script setup lang="ts">
import "./index.less";
</script>

<template>
  <div class="layui-panel">
    <slot />
  </div>
</template>
