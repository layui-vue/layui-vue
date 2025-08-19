<!--
 * @Author: baobaobao
 * @Date: 2023-09-22 00:33:50
 * @LastEditTime: 2023-09-24 12:05:50
 * @LastEditors: baobaobao
-->
<script setup lang="ts">
import { LayIcon } from "@layui/icons-vue";
import { useI18n } from "../../../language";
import LayInput from "../../input/index";

import { usePage } from "../usePage";

defineOptions({
  name: "LayPageSimple",
});

const { pageCount, disabled, currentPage, handlePrev, handleNext, handleBlur }
  = usePage();
const { t } = useI18n();
</script>

<template>
  <div
    :data-page="t('page.previous')"
    class="layui-page-prev"
    @click="handlePrev"
  >
    <LayIcon type="layui-icon-left" size="16px" />
  </div>
  <div class="layui-pager-jumper" :data-page="`${currentPage}/${pageCount}`">
    <LayInput
      v-model="currentPage"
      :disabled="disabled"
      type="number"
      @blur="handleBlur"
    />
    <span class="layui-simple-page-slash">／</span>
    <span>{{ pageCount }}</span>
  </div>
  <div :data-page="t('page.next')" class="layui-page-next" @click="handleNext">
    <LayIcon type="layui-icon-right" size="16px" />
  </div>
</template>
