<template>
  <div class="layui-laydate-main">
    <div class="layui-laydate-header">
      <LayIcon
        type="layui-icon-prev"
        @click="handleYearMonthChange('subtract', 'year')"
      ></LayIcon>
      <LayIcon
        type="layui-icon-left"
        @click="handleYearMonthChange('subtract', 'month')"
      ></LayIcon>
      <div class="laydate-set-ym">
        <span @click="handleTypeChange('year')"
          >{{ showDate.year() }} {{ t("datePicker.year") }}</span
        >
        <span @click="handleTypeChange('month')">
          {{ MONTH_NAME[showDate.month()] }}
        </span>
      </div>
      <LayIcon
        type="layui-icon-right"
        @click="handleYearMonthChange('add', 'month')"
      ></LayIcon>
      <LayIcon
        type="layui-icon-next"
        @click="handleYearMonthChange('add', 'year')"
      ></LayIcon>
    </div>

    <DateContent
      :date-list="dateList"
      :model-value="Day"
      @update:model-value="handlePickDay"
    ></DateContent>
  </div>
</template>

<script lang="ts" setup>
import type { BasePanelProps, DateContentSingleDateObject } from "../interface";

import { computed, ref, watch } from "vue";
import dayjs, { type Dayjs } from "dayjs";
import { useI18n } from "../../../../language";

import { setDateList } from "../../util";
import LayIcon from "../../../icon";
import DateContent from "./DateContent.vue";

defineOptions({
  name: "DatePanel",
});

const props = withDefaults(defineProps<BasePanelProps>(), {});
const emits = defineEmits<{
  (e: "year-month-change", data: Dayjs): void;
  (e: "type-change", type: "year" | "month"): void;
  (e: "pick", value: Dayjs): void;
}>();

const { t } = useI18n();

const currentDate = ref<Dayjs>(dayjs());
const Day = ref<number | null>();

const dateList = ref<Array<DateContentSingleDateObject>>([]);

const MONTH_NAME = computed(() => [
  t("datePicker.january"),
  t("datePicker.february"),
  t("datePicker.march"),
  t("datePicker.april"),
  t("datePicker.may"),
  t("datePicker.june"),
  t("datePicker.july"),
  t("datePicker.august"),
  t("datePicker.september"),
  t("datePicker.october"),
  t("datePicker.november"),
  t("datePicker.december"),
]);

watch(
  [() => props.modelValue, () => props.showDate],
  ([modelValue, showDate]) => {
    dateList.value = setDateList(showDate.year(), showDate.month());
    currentDate.value = modelValue || showDate;

    Day.value = modelValue ? modelValue.startOf("day").valueOf() : null; //unix
  },
  {
    immediate: true,
  }
);

const handleYearMonthChange = (
  calc: "add" | "subtract",
  type: "year" | "month"
) => {
  const date = props.showDate[calc](1, type);

  emits("year-month-change", date);
};

const handleTypeChange = (type: "year" | "month") => {
  emits("type-change", type);
};

const handlePickDay = (val: number) => {
  const unixDate = dayjs(val);

  const data = currentDate.value
    .clone()
    .set("year", unixDate.year())
    .set("month", unixDate.month())
    .set("date", unixDate.date());

  emits("pick", data);
};
</script>
