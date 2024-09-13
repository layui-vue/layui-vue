<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0">
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
            >{{ Year }} {{ t("datePicker.year") }}</span
          >
          <span @click="handleTypeChange('month')">
            {{ MONTH_NAME[Month] }}
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
  </div>
</template>

<script lang="ts" setup>
import { type BasePanelProps } from "../interface";

import { computed, nextTick, ref, watch } from "vue";
import dayjs, { type Dayjs } from "dayjs";
import { useI18n } from "../../../../language";

import { setDateList } from "../../day";
import LayIcon from "../../../icon";
import DateContent from "./DateContent.vue";

defineOptions({
  name: "DatePanel",
});

// inputDate 用于保持 day 日期的状态，不被modelValue改变
const props = withDefaults(
  defineProps<BasePanelProps & { inputDate: Dayjs }>(),
  {}
);
const emits = defineEmits<{
  (e: "year-month-change", data: Dayjs): void;
  (e: "type-change", type: "year" | "month"): void;
  (e: "pick", value: Dayjs): void;
}>();

const { t } = useI18n();

const Day = ref();
const Year = ref();
const Month = ref();
const dateList = ref<any>([]);

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
  () => props.modelValue,
  () => {
    Day.value = dayjs(props.inputDate).startOf("day").valueOf(); //unix

    Year.value = dayjs(props.modelValue).year();
    Month.value = dayjs(props.modelValue).month();

    dateList.value = setDateList(Year.value, Month.value);
  },

  {
    immediate: true,
  }
);

const handleYearMonthChange = (
  calc: "add" | "subtract",
  type: "year" | "month"
) => {
  const date = props.modelValue[calc](1, type);

  emits("year-month-change", date);
};

const handleTypeChange = (type: "year" | "month") => {
  emits("type-change", type);
};

const handlePickDay = (val: number) => {
  emits("pick", dayjs(val));
  // 等待 props.modelValue watch 结束
  // 防止 Day.value 被inputData改变
  nextTick(() => {
    Day.value = val;
  });
};
</script>
