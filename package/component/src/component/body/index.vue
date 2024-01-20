<script setup lang="ts">
import "./index.less";

defineOptions({
  name: "LayBody",
});
</script>

<template>
  <div class="layui-body">
    <slot></slot>
  </div>
</template>
