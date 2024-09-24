<script setup lang="ts">
import dayjs, { type Dayjs } from "dayjs";
import { computed, ref, watch } from "vue";
import type { RangePickerProps } from "./interface";

import { useI18n } from "../../../language";
import { setDateList } from "../day";

import LayIcon from "../../icon";
import LayDropdown from "../../dropdown";
import DateContent from "./common/DateContent.vue";
import Time from "./common/Time.vue";
import Year from "./common/Year.vue";
import Month from "./common/Month.vue";
import Footer from "./common/Footer.vue";

const props = withDefaults(defineProps<RangePickerProps>(), {});
const emits = defineEmits(["pick"]);

const { t } = useI18n();

const startDate = ref<Dayjs | null>();
const endDate = ref<Dayjs | null>();
const leftDate = ref<Dayjs>(dayjs().startOf("day"));
const rightDate = ref<Dayjs>(dayjs().startOf("day").add(1, "month"));

const hoverDate = ref<Dayjs | null>();

type DropdownRef = InstanceType<typeof LayDropdown>;

const yearLeftRef = ref<DropdownRef>();
const yearRightRef = ref<DropdownRef>();
const monthLeftRef = ref<DropdownRef>();
const monthRightRef = ref<DropdownRef>();
const timeLeftRef = ref<DropdownRef>();
const timeRightRef = ref<DropdownRef>();

const leftDataList = computed(() => {
  return setDateList(leftDate.value.year(), leftDate.value.month()) || [];
});

const rightDataList = computed(() => {
  return setDateList(rightDate.value.year(), rightDate.value.month()) || [];
});

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
    const [start, end] = props.modelValue;
    startDate.value = start;
    endDate.value = end;
    leftDate.value = start || leftDate.value;
    rightDate.value = end || rightDate.value;
  },
  { immediate: true }
);

watch(
  () => leftDate.value,
  () => {
    const old = rightDate.value.clone();
    rightDate.value = leftDate.value
      .add(1!, "month")
      .set("hour", old.hour())
      .set("minute", old.minute())
      .set("second", old.second());
  }
);

const classes = computed(() => {
  return (item: any) => {
    const Date = dayjs(item.value);
    const _endDate = endDate.value || hoverDate.value;

    return {
      "layui-this":
        startDate.value?.startOf("day").valueOf() === item.value ||
        endDate.value?.startOf("day").valueOf() === item.value,
      "laydate-range-hover":
        item.type === "current" &&
        // 当前日期在开始时间之后 && 当前日期再结束(hover)时间之前 (第一次点击在前>第二次点击(hover)在后)
        // ||
        // 当前日期在开始时间之前 && 当前日期在结束(hover)时间之后 (第一次点击在后>第二次点击(hover)在前)
        (!!(
          startDate.value &&
          Date.isSameOrAfter(startDate.value, "day") &&
          Date.isSameOrBefore(_endDate, "day")
        ) ||
          !!(
            startDate.value &&
            Date.isSameOrBefore(startDate.value, "day") &&
            Date.isSameOrAfter(_endDate, "day")
          )),
    };
  };
});

const handleDatePick = (value: number) => {
  const unixDate = dayjs(value);
  const _startDate = (startDate.value || leftDate.value)
    .clone()
    .set("year", unixDate.year())
    .set("month", unixDate.month())
    .set("date", unixDate.date());

  const _endDate = (endDate.value || rightDate.value)
    .clone()
    .set("year", unixDate.year())
    .set("month", unixDate.month())
    .set("date", unixDate.date());

  // 点击开始时间
  if (!startDate.value || (startDate.value && endDate.value)) {
    startDate.value = _startDate;
    endDate.value = undefined;
  } else if (unixDate.isSameOrBefore(startDate.value, "day")) {
    // 二次点击的时间在开始时间之前
    endDate.value = startDate.value
      .clone()
      .set("hour", rightDate.value.hour())
      .set("minute", rightDate.value.minute())
      .set("second", rightDate.value.second());
    startDate.value = _startDate;
  } else {
    endDate.value = _endDate;
  }
};

const handleDateHover = (val: number) => {
  if (!startDate.value || endDate.value) {
    hoverDate.value = null;
    return;
  }

  hoverDate.value = dayjs(val);
};

// 点击year/month icon 进行切换
const handleChangeYearMonth = (
  diffType: "add" | "subtract",
  type: "year" | "month"
) => {
  leftDate.value = leftDate.value[diffType](1, type);
};

// 点击year/month进行切换
const handleChangeYearMonthPick = (
  val: Dayjs,
  type: "year" | "month",
  dropdownEl: DropdownRef
) => {
  const DateValue = val[type]();
  leftDate.value = leftDate.value[type](DateValue) as Dayjs;

  dropdownEl.hide();
};

// 切换左侧time
const handleChangeLeftTimePick = (hmsDate: Dayjs) => {
  leftDate.value = leftDate.value
    .clone()
    .set("hour", hmsDate.hour())
    .set("minute", hmsDate.minute())
    .set("second", hmsDate.second());

  if (startDate.value) {
    startDate.value = startDate.value
      .set("hour", leftDate.value.hour())
      .set("minute", leftDate.value.minute())
      .set("second", leftDate.value.second());
  }
};

// 切换右侧time
const handleChangeRightTimePick = (hmsDate: Dayjs) => {
  rightDate.value = rightDate.value
    .clone()
    .set("hour", hmsDate.hour())
    .set("minute", hmsDate.minute())
    .set("second", hmsDate.second());

  if (endDate.value) {
    endDate.value = endDate.value
      .set("hour", rightDate.value.hour())
      .set("minute", rightDate.value.minute())
      .set("second", rightDate.value.second());
  }
};

const handleConfirm = () => {
  emits("pick", [startDate.value, endDate.value]);
};
</script>

<template>
  <div class="layui-laydate-range" :class="'layui-laydate-range-' + props.type">
    <div class="layui-laydate-range-main">
      <div class="layui-laydate">
        <div class="layui-laydate-main">
          <div class="layui-laydate-header">
            <LayIcon
              type="layui-icon-prev"
              @click="handleChangeYearMonth('subtract', 'year')"
            ></LayIcon>
            <LayIcon
              type="layui-icon-left"
              @click="handleChangeYearMonth('subtract', 'month')"
            ></LayIcon>
            <div class="laydate-set-ym">
              <LayDropdown ref="yearLeftRef">
                <span>{{ leftDate.year() }} {{ t("datePicker.year") }}</span>
                <template #content>
                  <Year
                    :modelValue="leftDate"
                    @pick="(val: Dayjs) => handleChangeYearMonthPick(val, 'year', yearLeftRef!)"
                  ></Year>
                </template>
              </LayDropdown>

              <LayDropdown ref="monthLeftRef">
                <span>{{ MONTH_NAME[leftDate.month()] }}</span>

                <template #content>
                  <Month
                    :modelValue="leftDate"
                    :inputDate="leftDate"
                    dateType="month"
                    @pick="(val: Dayjs) => handleChangeYearMonthPick(val, 'month', monthLeftRef!)"
                  ></Month>
                </template>
              </LayDropdown>

              <LayDropdown ref="timeLeftRef" v-if="props.type === 'datetime'">
                <span>{{ leftDate.format("HH:mm:ss") }}</span>

                <template #content>
                  <Time
                    :modelValue="startDate || leftDate"
                    :inputDate="startDate || leftDate"
                    @pick="handleChangeLeftTimePick"
                  ></Time>
                </template>
              </LayDropdown>
            </div>

            <LayIcon
              type="layui-icon-right"
              style="visibility: hidden"
            ></LayIcon>
            <LayIcon
              type="layui-icon-next"
              style="visibility: hidden"
            ></LayIcon>
          </div>
          <DateContent
            :classes="classes"
            :dateList="leftDataList"
            @update:model-value="handleDatePick"
            @hover-cell="handleDateHover"
          >
          </DateContent>
        </div>
      </div>

      <div class="layui-laydate">
        <div class="layui-laydate-main">
          <div class="layui-laydate-header">
            <LayIcon
              type="layui-icon-prev"
              style="visibility: hidden"
            ></LayIcon>
            <LayIcon
              type="layui-icon-left"
              style="visibility: hidden"
            ></LayIcon>
            <div class="laydate-set-ym">
              <LayDropdown ref="yearRightRef">
                <span>{{ rightDate.year() }} {{ t("datePicker.year") }}</span>
                <template #content>
                  <Year
                    :modelValue="leftDate"
                    @pick="(val: Dayjs) => handleChangeYearMonthPick(val, 'year', yearRightRef!)"
                  ></Year>
                </template>
              </LayDropdown>

              <LayDropdown ref="monthRightRef">
                <span>{{ MONTH_NAME[rightDate.month()] }}</span>

                <template #content>
                  <Month
                    :modelValue="leftDate"
                    :inputDate="leftDate"
                    dateType="month"
                    @pick="(val: Dayjs) => handleChangeYearMonthPick(val.subtract(1, 'month'), 'month', monthRightRef!)"
                  ></Month>
                </template>
              </LayDropdown>

              <LayDropdown ref="timeRightRef" v-if="props.type === 'datetime'">
                <span>{{ rightDate.format("HH:mm:ss") }}</span>

                <template #content>
                  <Time
                    :modelValue="endDate || rightDate"
                    :inputDate="endDate || rightDate"
                    @pick="handleChangeRightTimePick"
                  ></Time>
                </template>
              </LayDropdown>
            </div>

            <LayIcon
              type="layui-icon-right"
              @click="handleChangeYearMonth('add', 'month')"
            ></LayIcon>
            <LayIcon
              type="layui-icon-next"
              @click="handleChangeYearMonth('add', 'year')"
            ></LayIcon>
          </div>
          <DateContent
            :classes="classes"
            :dateList="rightDataList"
            @update:model-value="handleDatePick"
            @hover-cell="handleDateHover"
          >
          </DateContent>
        </div>
      </div>
    </div>
    <Footer :showNow="false" @confirm="handleConfirm">
      {{ startDate?.format(props.inputFormat) }}
      {{ props.rangeSeparator }}
      {{ endDate?.format(props.inputFormat) }}
    </Footer>
  </div>
</template>
