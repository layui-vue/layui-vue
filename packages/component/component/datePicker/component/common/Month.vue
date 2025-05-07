<script lang="ts" setup>
import type { Dayjs } from "dayjs";
import type { BasePanelProps } from "../interface";
import LayIcon from "@layui/component/component/icon";
import { useI18n } from "@layui/component/language";

import dayjs from "dayjs";
import { computed, inject, ref, watch } from "vue";

import { DATE_PICKER_CONTEXT } from "../../interface";
import DatePickerRender from "./DatePickerRender.vue";

defineOptions({
  name: "MonthPanel",
});

const props = withDefaults(defineProps<BasePanelProps>(), {
  classes: () => ({}),
});
const emits = defineEmits(["pick", "year-change", "type-change", "hover-cell"]);

const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

const currentMonth = ref<number | null>();
const currentDate = ref<Dayjs>(dayjs());

const { t } = useI18n();

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

// 判断单元格是否可以点击(禁用)
function cellDisabled(month: number) {
  if (DatePickerContext.disabledDate) {
    return DatePickerContext.disabledDate(fullMonthDay(month).toDate());
  }
  const fullMonth = fullMonthDay(month);

  if (
    DatePickerContext.min
    && fullMonth.isBefore(DatePickerContext.min, "month")
  ) {
    return true;
  }

  if (
    DatePickerContext.max
    && fullMonth.isAfter(DatePickerContext.max, "month")
  ) {
    return true;
  }

  return false;
}

const isActive = computed(() => {
  return (month: number, value: BasePanelProps["modelValue"]) => {
    const fullMonth = fullMonthDay(month);

    return value && value.isSame(fullMonth, "month");
  };
});

// 点击月份
function handleMonthClick(month: number) {
  if (cellDisabled(month)) {
    return;
  }

  const fullMonth = fullMonthDay(month);

  currentMonth.value = month;
  currentDate.value = fullMonth;

  emits("pick", DatePickerContext.range ? fullMonth : month);
}

function handleMonthMouseenter(month: number) {
  if (cellDisabled(month) || !DatePickerContext.range) {
    return;
  }

  const fullMonth = fullMonthDay(month);

  emits("hover-cell", fullMonth);
}

function fullMonthDay(month: number) {
  return currentDate.value.startOf("year").month(month);
}

watch(
  [() => props.modelValue, () => props.showDate],
  ([modelValue, showDate]) => {
    currentMonth.value = modelValue ? modelValue.month() : null;

    currentDate.value = showDate;
  },
  {
    immediate: true,
  },
);

function handleYearChange(val: number) {
  emits("year-change", currentDate.value.year() + val);
}
</script>

<template>
  <div class="layui-laydate-main layui-laydate-main-month">
    <div class="layui-laydate-header">
      <slot name="header">
        <div v-if="dateType === 'month'" class="laydate-set-ym">
          <span class="laydate-time-text">{{
            (Number(currentMonth) ?? -1) > -1
              ? MONTH_NAME[Number(currentMonth)]
              : t("datePicker.selectMonth")
          }}</span>
        </div>
        <template v-else>
          <LayIcon
            type="layui-icon-prev"
            @click="handleYearChange(-1)"
          />
          <div class="laydate-set-ym">
            <span @click="emits('type-change')">{{ currentDate.year() }}</span>
          </div>
          <LayIcon
            type="layui-icon-next"
            @click="handleYearChange(1)"
          />
        </template>
      </slot>
    </div>

    <div class="layui-laydate-content" style="height: 220px">
      <ul class="layui-laydate-list laydate-month-list">
        <li
          v-for="(item, month) of MONTH_NAME"
          :key="item"
          :class="{
            'layui-this': isActive(month, modelValue),
            'layui-laydate-current': isActive(month, dayjs()),
            'layui-disabled': cellDisabled(month),
            ...classes?.(fullMonthDay(month)),
          }"
          @click="handleMonthClick(month)"
          @mouseenter="handleMonthMouseenter(month)"
        >
          <DatePickerRender type="month" :unix="fullMonthDay(month).valueOf()" :dayjs="fullMonthDay(month)">
            {{ item.slice(0, 3) }}
          </DatePickerRender>
        </li>
      </ul>
    </div>
  </div>
</template>
