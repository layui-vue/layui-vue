<template>
  <div class="layui-header">
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  name: 'LayHeader',
}
</script>
<script setup lang="ts"></script>
<style>
.layui-header {
  box-sizing: border-box;
  height: 60px;
}
</style>
