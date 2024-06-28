<!--
 * @Author: baobaobao
 * @Date: 2023-09-22 00:33:50
 * @LastEditTime: 2023-09-22 14:35:48
 * @LastEditors: baobaobao
-->
<template>
  <span class="layui-page-total-text">
    {{ t("page.total") }} {{ pageTotal }} {{ t("page.item") }}
  </span>
</template>

<script setup lang="ts">
import { useI18n } from "../../../language";
import { usePage } from "../usePage";
const { t } = useI18n();
const { pageTotal } = usePage();

defineOptions({
  name: "LayPageCount",
});
</script>
