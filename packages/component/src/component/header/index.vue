<script setup lang="ts">
import "./index.less";

defineOptions({
  name: "LayHeader",
});
</script>

<template>
  <div class="layui-header">
    <slot></slot>
  </div>
</template>
