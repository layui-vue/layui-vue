<script setup lang="ts">
import { useI18n } from "../../../language";
import LaySelect from "../../select/index";
import LaySelectOption from "../../selectOption/index";
import { usePage } from "../usePage";

defineOptions({
  name: "LayPageLimits",
});

const { t } = useI18n();
const { inlimit, disabled, limits } = usePage();

// 国际化分页文字
function getLabel(page: number) {
  const usePage = `${t("page.item")}/${t("page.page")}`;
  return `${page} ${usePage}`;
}
</script>

<template>
  <div class="layui-page-limits">
    <LaySelect
      v-model="inlimit"
      placeholder="请选择"
      :disabled="disabled"
      :auto-fit-width="false"
    >
      <LaySelectOption
        v-for="option of limits"
        :key="option"
        :value="option"
        :label="getLabel(option)"
      />
    </LaySelect>
  </div>
</template>
