<script setup lang="ts">
import "./index.less";

defineOptions({
  name: "LayButtonContainer",
});
</script>

<template>
  <div class="layui-btn-container">
    <slot></slot>
  </div>
</template>
