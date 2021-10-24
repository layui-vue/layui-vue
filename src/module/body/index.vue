<template>
  <div class="layui-body">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'LayBody',
}
</script>

<script setup name="LayBody" lang="ts"></script>

<style>
.layui-body {
  display: block;
  flex: 1;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;
  min-height: 300px;
}
</style>
