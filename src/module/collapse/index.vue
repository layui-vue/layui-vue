<template>
  <div class="layui-collapse">
      <slot></slot>
  </div>
</template>

<script setup name="LayCollapse" lang="ts">
import { provide } from "vue";

const props =
  defineProps<{
    openKeys?:Array<string>
  }>()

provide('openKeys',props.openKeys);

</script>
