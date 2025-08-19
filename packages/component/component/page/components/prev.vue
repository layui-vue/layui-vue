<script setup lang="ts">
import { useI18n } from "../../../language";
import { usePage } from "../usePage";

defineOptions({
  name: "LayPagePrev",
});
const { t } = useI18n();
const { currentPage, handlePrev } = usePage();
</script>

<template>
  <div
    class="layui-page-prev"
    :data-page="t('page.previous')"
    :class="[
      {
        'is-disabled': currentPage <= 1,
      },
    ]"
    @click="handlePrev"
  >
    <slot name="prev">
      {{ t("page.previous") }}
    </slot>
  </div>
</template>
