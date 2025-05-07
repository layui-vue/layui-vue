<script lang="ts" setup>
import type { DateContentSingleDateObject } from "../interface";
import { useI18n } from "@layui/component/language";

import dayjs from "dayjs";
import { computed, inject } from "vue";
import { DATE_PICKER_CONTEXT } from "../../interface";
import DatePickerRender from "./DatePickerRender.vue";

export interface DateContentProps {
  dateList: Array<DateContentSingleDateObject>;
  modelValue?: number | null;
  classes?: (val: DateContentSingleDateObject) => Record<string, boolean>;
}

defineOptions({
  name: "DateContent",
});

withDefaults(defineProps<DateContentProps>(), {
  modelValue: -1,
  classes: () => ({}),
});

const emits = defineEmits(["update:modelValue", "hover-cell"]);

const { t } = useI18n();

const WEEK_NAME = computed(() => [
  t("datePicker.sunday"),
  t("datePicker.monday"),
  t("datePicker.tuesday"),
  t("datePicker.wednesday"),
  t("datePicker.thursday"),
  t("datePicker.friday"),
  t("datePicker.saturday"),
]);

const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

// 判断日期是否可以点击
function cellDisabled(item: DateContentSingleDateObject) {
  if (item.type !== "current" && DatePickerContext.range) {
    return true;
  }

  if (DatePickerContext.disabledDate) {
    return DatePickerContext.disabledDate(dayjs(item.value).toDate());
  }

  if (
    DatePickerContext.min
    && dayjs(item.value).isBefore(dayjs(DatePickerContext.min), "day")
  ) {
    return true;
  }

  if (
    DatePickerContext.max
    && dayjs(item.value).isAfter(dayjs(DatePickerContext.max), "day")
  ) {
    return true;
  }
  return false;
}

// 点击日期
function handleDayClick(item: DateContentSingleDateObject) {
  if (cellDisabled(item))
    return;

  if (DatePickerContext.range && item.type !== "current")
    return;

  emits("update:modelValue", item.value);
}

function dayItemMouseEnter(item: DateContentSingleDateObject) {
  if (!DatePickerContext.range || cellDisabled(item))
    return;

  emits("hover-cell", item.value);
}
</script>

<template>
  <div class="layui-laydate-content">
    <table style="width: 100%">
      <thead>
        <tr>
          <th v-for="item of WEEK_NAME" :key="item">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="(_, i) of dateList.length % 7 === 0
            ? dateList.length / 7
            : Math.floor(dateList.length / 7) + 1"
          :key="i"
        >
          <tr>
            <td
              v-for="(item, index) of dateList.slice(i * 7, i * 7 + 7)"
              :key="index"
              :data-unix="item.value"
              :class="{
                'laydate-day-prev': item.type !== 'current',
                'layui-this': item.value === modelValue,
                'layui-disabled': cellDisabled(item),
                'layui-laydate-current':
                  item.value === dayjs().startOf('day').valueOf(),
                ...classes(item),
              }"
              @click="handleDayClick(item)"
              @mouseenter="dayItemMouseEnter(item)"
            >
              <DatePickerRender type="date" :unix="item.value" :dayjs="dayjs(item.value)">
                {{ item.day }}
              </DatePickerRender>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
