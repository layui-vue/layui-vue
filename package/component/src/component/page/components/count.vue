<!--
 * @Author: baobaobao
 * @Date: 2023-09-22 00:33:50
 * @LastEditTime: 2023-09-22 14:35:48
 * @LastEditors: baobaobao
-->
<template>
  <span class="layui-page-total-text">
    {{ t("page.total") }} {{ pageCount }} {{ t("page.item") }}
  </span>
</template>

<script lang="ts">
export default {
  name: "LayPageCount",
};
</script>
<script setup lang="ts">
import { useI18n } from "../../../language";
import { usePage } from "../usePage";
const { t } = useI18n();
const { pageCount } = usePage();
</script>
