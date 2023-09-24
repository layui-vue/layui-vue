<!--
 * @Author: baobaobao
 * @Date: 2023-09-22 00:33:50
 * @LastEditTime: 2023-09-24 12:05:50
 * @LastEditors: baobaobao
-->
<template>
  <div 
  :data-page="t('page.previous')"
   class="layui-page-prev" @click="handlePrev">
    <lay-icon type="layui-icon-left" size="16px"></lay-icon>
  </div>
  <div class="layui-pager-jumper" :data-page="currentPage + '/' + pageCount ">
    <lay-input
      :disabled="disabled"
      @blur="handleBlur"
      type="number"
      v-model="currentPage"
    ></lay-input>
    <span class="layui-simple-page-slash">／</span>
    <span>{{ pageCount }}</span>
  </div>
  <div
  :data-page="t('page.next')"
   class="layui-page-next" @click="handleNext">
    <lay-icon type="layui-icon-right" size="16px"></lay-icon>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayPageSimple",
};
</script>
<script setup lang="ts">
import { useI18n } from "../../../language";

import { usePage } from "../usePage";
const {
  pageCount,
  disabled,
  currentPage,
  handlePrev,
  handleNext,
  handleBlur
} = usePage();
const { t } = useI18n();

</script>
