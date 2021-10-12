<template>
  <div class="layui-card">
    <div class="layui-card-header">
      <slot name="header" />
    </div>
    <div class="layui-card-body">
      <slot name="body" />
    </div>
  </div>
</template>

<script setup name="LayCard" lang="ts"></script>
