<script setup lang="ts">
import { useI18n } from "../../../language";
import { usePage } from "../usePage";

defineOptions({
  name: "LayPageNext",
});
const { t } = useI18n();
const { pageCount, currentPage, handleNext } = usePage();
</script>

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
    <slot name="next">
      {{ t("page.next") }}
    </slot>
  </div>
</template>
