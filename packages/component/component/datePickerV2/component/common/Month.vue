<template>
  <div class="layui-laydate-main">
    <div class="layui-laydate-header">
      <slot name="header">
        <div class="laydate-set-ym" v-if="dateType === 'month'">
          <span class="laydate-time-text">{{
            typeof Month !== "string"
              ? MONTH_NAME[Month]
              : t("datePicker.selectMonth")
          }}</span>
        </div>
        <template v-else>
          <lay-icon
            type="layui-icon-prev"
            @click="handleYearChange(-1)"
          ></lay-icon>
          <div class="laydate-set-ym">
            <span @click="emits('type-change')">{{ modelValue.year() }}</span>
          </div>
          <lay-icon
            type="layui-icon-next"
            @click="handleYearChange(1)"
          ></lay-icon>
        </template>
      </slot>
    </div>

    <div class="layui-laydate-content" style="height: 220px">
      <ul class="layui-laydate-list laydate-month-list">
        <li
          v-for="(item, month) of MONTH_NAME"
          :key="item"
          :class="{
            'layui-this': isActive(month, currentDate),
            'layui-laydate-current': isActive(month, dayjs()),
            'layui-disabled': cellDisabled(month),
            ...classes?.(fullMonthDay(month)),
          }"
          @click="handleMonthClick(month)"
          @mouseenter="handleMonthMouseenter(month)"
        >
          {{ item.slice(0, 3) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs, { type Dayjs } from "dayjs";
import { type BasePanelProps } from "../interface";
import { DATE_PICKER_CONTEXT } from "../../interface";

import { useI18n } from "../../../../language";
import { computed, ref, watch, inject } from "vue";

import LayIcon from "../../../icon";

defineOptions({
  name: "MonthPanel",
});

const props = withDefaults(defineProps<BasePanelProps>(), {
  classes: () => ({}),
});
const emits = defineEmits(["pick", "year-change", "type-change", "hover-cell"]);

const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

const currentDate = ref();
const Month = ref();

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
const cellDisabled = computed(() => {
  if (props.dateType === "month") {
    return (month: number) => {
      if (
        DatePickerContext.min &&
        month < dayjs(DatePickerContext.min, DatePickerContext.format).month()
      ) {
        return true;
      }
      if (
        DatePickerContext.max &&
        month > dayjs(DatePickerContext.max, DatePickerContext.format).month()
      ) {
        return true;
      }
      return false;
    };
  } else {
    return (month: number) => {
      const fullMonth = fullMonthDay(month);

      if (
        DatePickerContext.min &&
        fullMonth.isBefore(DatePickerContext.min, "month")
      ) {
        return true;
      }

      if (
        DatePickerContext.max &&
        fullMonth.isAfter(DatePickerContext.max, "month")
      ) {
        return true;
      }

      return false;
    };
  }
});

const isActive = computed(() => {
  return (month: number, value: Dayjs) => {
    const fullMonth = fullMonthDay(month);

    return value.isSame(fullMonth, "month");
  };
});

// 点击月份
const handleMonthClick = (month: number) => {
  if (cellDisabled.value(month)) {
    return;
  }

  const fullMonth = fullMonthDay(month);

  Month.value = month;
  currentDate.value = fullMonth;

  emits("pick", DatePickerContext.range ? fullMonth : month);
};

const handleMonthMouseenter = (month: number) => {
  if (cellDisabled.value(month) || !DatePickerContext.range) {
    return;
  }

  const fullMonth = fullMonthDay(month);

  emits("hover-cell", fullMonth);
};

const fullMonthDay = (month: number) => {
  return props.modelValue.startOf("year").month(month);
};

watch(
  () => props.modelValue,
  () => {
    Month.value = props.modelValue.month();
  },
  {
    immediate: true,
  }
);

watch(
  () => props.inputDate,
  () => {
    currentDate.value = props.inputDate;
  },
  {
    immediate: true,
  }
);

const handleYearChange = (val: number) => {
  emits("year-change", props.modelValue.year() + val);
};
</script>
