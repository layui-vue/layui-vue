<template>
  <div
    class="layui-laydate-content"
    style="height: 220px; overflow-y: auto"
    ref="ScrollRef"
  >
    <ul class="layui-laydate-list laydate-year-list">
      <li
        v-for="item of yearList"
        :key="item"
        :class="{
          'layui-this': currentYear === item,
          'layui-laydate-current': item === dayjs().year(),
          'layui-disabled': cellDisabled(item),
        }"
        @click="handleYearClick(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { YEAR_CONTEXT, type BaseDateTypeProps } from "../interface";

import dayjs from "dayjs";
import { useI18n } from "../../../../language";
import { computed, inject, watch } from "vue";
import { useYearPanel } from "../../hook/useYearPanel";

defineOptions({
  name: "YearPanel",
});
const props = withDefaults(defineProps<BaseDateTypeProps>(), {
  // modelValue: "",
  // type: "date",
  // disabled: false,
  // readonly: false,
  // allowClear: false,
  // simple: false,
  // range: false,
  // rangeSeparator: "至",
  // prefixIcon: "layui-icon-date",
  // suffixIcon: "",
  // timestamp: false,
  // format: "",
  // yearPage: 15,
  // yearStep: 1,
});

const { yearList, currentYear, currentDate } = inject(YEAR_CONTEXT) as any;

const emits = defineEmits(["pick"]);

watch(
  () => props.modelValue,
  () => (currentDate.value = currentYear.value = props.modelValue.year()),
  { immediate: true }
);

const { t } = useI18n();

// 判断单元格是否可以点击(禁用)
const cellDisabled = computed(() => {
  return (item: number) => {
    if (props.min && item < dayjs(props.min).year()) {
      return true;
    }
    if (props.max && item > dayjs(props.max).year()) {
      return true;
    }
    return false;
  };
});

// 点击年份
const handleYearClick = (item: number) => {
  if (cellDisabled.value(item)) {
    return true;
  }

  currentYear.value = item;
  emits("pick", item);
};
</script>
