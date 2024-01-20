<!--
 * @Author: baobaobao
 * @Date: 2023-09-22 00:33:50
 * @LastEditTime: 2023-09-22 17:48:17
 * @LastEditors: baobaobao
-->
<template>
  <div @click="handleRefresh" class="layui-page-refresh">
    <lay-icon type="layui-icon-refresh"></lay-icon>
  </div>
</template>

<script setup lang="ts">
import { LayIcon } from "@layui/icons-vue";
import { usePage } from "../usePage";

defineOptions({
  name: "LayPageRefresh",
});
const { currentPage, inlimit, disabled, limits, handleRefresh } = usePage();
</script>
