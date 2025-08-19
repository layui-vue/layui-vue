<script setup lang="ts">
import { useI18n } from "../../../language";
import { usePage } from "../usePage";

defineOptions({
  name: "LayPageCount",
});
const { t } = useI18n();
const { pageTotal } = usePage();
</script>

<template>
  <span class="layui-page-total-text">
    {{ t("page.total") }} {{ pageTotal }} {{ t("page.item") }}
  </span>
</template>
