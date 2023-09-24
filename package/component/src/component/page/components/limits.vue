<!--
 * @Author: baobaobao
 * @Date: 2023-09-22 00:33:50
 * @LastEditTime: 2023-09-22 14:41:51
 * @LastEditors: baobaobao
-->
<template>
  <div class="layui-page-limits">
    <lay-select v-model="inlimit" placeholder="请选择" :disabled="disabled">
      <lay-select-option
        :value="option"
        :label="getLabel(option)"
        v-for="option of limits"
        :key="option"
      ></lay-select-option>
    </lay-select>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayPageLimits",
};
</script>
<script setup lang="ts">
import { useI18n } from "../../../language";
import { usePage } from "../usePage";
const { t } = useI18n();
const { inlimit, disabled,  limits  } = usePage();
// 国际化分页文字
const getLabel = (page: number) => {
  const usePage = t("page.item") + "/" + t("page.page");
  return `${page} ${usePage}`;
};
</script>
