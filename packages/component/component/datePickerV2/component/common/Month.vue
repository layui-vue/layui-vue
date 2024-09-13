<template>
  <div class="layui-laydate">
    <div class="layui-laydate-main laydate-main-list-0 laydate-ym-show">
      <div class="layui-laydate-header">
        <div class="laydate-set-ym" v-if="dateType === 'month'">
          <span>{{
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
      </div>
    </div>
    <div class="layui-laydate-content" style="height: 220px">
      <ul class="layui-laydate-list laydate-month-list">
        <li
          v-for="item of MONTH_NAME"
          :key="item"
          :class="{
            'layui-this': MONTH_NAME.indexOf(item) === Month,
            'layui-laydate-current':
              MONTH_NAME.indexOf(item) === dayjs().month(),
            'layui-disabled': cellDisabled(item),
          }"
          @click="handleMonthClick(item)"
        >
          {{ item.slice(0, 3) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { type BasePanelProps } from "../interface";
import { DATE_PICKER_CONTEXT } from "../../interface";

import { useI18n } from "../../../../language";
import { computed, ref, watch, inject } from "vue";

import LayIcon from "../../../icon";

defineOptions({
  name: "MonthPanel",
});

const props = withDefaults(defineProps<BasePanelProps>(), {});
const emits = defineEmits(["pick", "year-change", "type-change"]);

const DatePickerContext = inject(DATE_PICKER_CONTEXT)!;

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
  return (item: string) => {
    const month = MONTH_NAME.value.indexOf(item);
    if (
      DatePickerContext.min &&
      month < dayjs(DatePickerContext.min).month() + 1
    ) {
      return true;
    }
    if (
      DatePickerContext.max &&
      month > dayjs(DatePickerContext.max).month() + 1
    ) {
      return true;
    }
    return false;
  };
});

// 点击月份
const handleMonthClick = (item: string) => {
  if (cellDisabled.value(item)) {
    return;
  }

  const month = MONTH_NAME.value.indexOf(item);

  Month.value = month;
  emits("pick", month);
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

const handleYearChange = (val: number) => {
  emits("year-change", props.modelValue.year() + val);
};
</script>
