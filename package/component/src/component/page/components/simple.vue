<!--
 * @Author: baobaobao
 * @Date: 2023-09-22 00:33:50
 * @LastEditTime: 2023-09-22 17:47:47
 * @LastEditors: baobaobao
-->
<template>
  <div class="layui-page-prev" @click="handlePrev">
    <lay-icon type="layui-icon-left" size="16px"></lay-icon>
  </div>
  <div class="layui-pager-jump">
    <lay-input
      :disabled="disabled"
      @blur="handleBlur"
      type="number"
      v-model="currentPage"
      style="height: 30px"
    ></lay-input>
    <span class="layui-simple-page-slash">／</span>
    <span>{{ pageCount }}</span>
  </div>
  <div class="layui-page-next" @click="handleNext">
    <lay-icon type="layui-icon-right" size="16px"></lay-icon>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayPageSimple",
};
</script>
<script setup lang="ts">
import { usePage } from "../usePage";
const {
  pageCount,
  disabled,
  currentPage,
  handlePrev,
  handleNext,
  handleBlur
} = usePage();
</script>
