<script lang="ts">
export default {
  name: "LayHeader",
};
</script>

<script setup lang="ts">
import "./index.less";
</script>

<template>
  <div class="layui-header">
    <slot></slot>
  </div>
</template>
