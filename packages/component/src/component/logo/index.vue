<template>
  <div class="layui-logo">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import "./index.less";

defineOptions({
  name: "LayLogo",
});
</script>
