<!--
 * @Author: baobaobao
 * @Date: 2023-09-22 00:33:50
 * @LastEditTime: 2023-09-24 12:01:56
 * @LastEditors: baobaobao
-->
<template>
  <div
    class="layui-page-next"
    :data-page="t('page.next')"
    :class="[
      {
        'is-disabled': pageCount <= currentPage,
      },
    ]"
    @click="handleNext"
  >
    <slot name="next">{{ t("page.next") }}</slot>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "../../../language";
import { usePage } from "../usePage";

defineOptions({
  name: "LayPageNext",
});
const { t } = useI18n();
const { pageCount, currentPage, handleNext, slots } = usePage();
</script>
