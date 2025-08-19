<script setup lang="ts">
import { LayIcon } from "@layui/icons-vue";
import { usePage } from "../usePage";

defineOptions({
  name: "LayPageRefresh",
});
const { handleRefresh } = usePage();
</script>

<template>
  <div class="layui-page-refresh" @click="handleRefresh">
    <LayIcon type="layui-icon-refresh" />
  </div>
</template>
