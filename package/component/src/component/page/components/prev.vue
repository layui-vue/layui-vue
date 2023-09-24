<!--
 * @Author: baobaobao
 * @Date: 2023-09-22 00:33:50
 * @LastEditTime: 2023-09-24 12:02:18
 * @LastEditors: baobaobao
-->
<template>
  <div
    class="layui-page-prev"
    @click="handlePrev"
    :data-page="t('page.previous')"
    :class="[
      {
        'is-disabled': currentPage <= 1,
      },
    ]"
  >
    <slot name="prev">{{ t("page.previous") }}</slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayPagePrev",
};
</script>
<script setup lang="ts">
import { useI18n } from "../../../language";
import { usePage } from "../usePage";
const { t } = useI18n();
const { pageCount, currentPage, handlePrev } = usePage();
</script>
