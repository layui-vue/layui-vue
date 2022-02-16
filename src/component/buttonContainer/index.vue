<script lang="ts">
export default {
  name: "LayButtonContainer",
};
</script>

<script setup lang="ts">
import "./index.less";
</script>

<template>
  <div class="layui-btn-container">
    <slot></slot>
  </div>
</template>
