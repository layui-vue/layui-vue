<script setup lang="ts">
import dayjs, { type Dayjs } from "dayjs";
import { computed, ref, watch } from "vue";
import type {
  RangePickerProps,
  DateContentSingleDateObject,
} from "./interface";
import type { Shortcuts as ShortcutsType } from "../interface";

import { useI18n } from "../../../language";
import { normalizeDayjsValue, setDateList } from "../util";
import { isArray } from "../../../utils";

import LayIcon from "../../icon";
import LayDropdown from "../../dropdown";
import DateContent from "./common/DateContent.vue";
import Time from "./common/Time.vue";
import Year from "./common/Year.vue";
import Month from "./common/Month.vue";
import Footer from "./common/Footer.vue";
import Shortcuts from "./common/Shortcuts.vue";

import { useBaseDatePicker } from "../hook/useBaseDatePicker";
import { useShortcutsRange } from "../hook/useShortcutsRange";

const props = withDefaults(defineProps<RangePickerProps>(), {});
const emits = defineEmits(["pick"]);

const { t } = useI18n();
const { getDefaultValue } = useBaseDatePicker(props);
const hookChangeShortcut = useShortcutsRange();

const startDate = ref<Dayjs | null>();
const endDate = ref<Dayjs | null>();
const leftDate = ref<Dayjs>(getDefaultValue());
const rightDate = ref<Dayjs>(getDefaultValue().add(1, "month"));

const hoverDate = ref<Dayjs | null>();

type DropdownRef = InstanceType<typeof LayDropdown>;

const yearLeftRef = ref<DropdownRef>();
const yearRightRef = ref<DropdownRef>();
const monthLeftRef = ref<DropdownRef>();
const monthRightRef = ref<DropdownRef>();
const timeLeftRef = ref<DropdownRef>();
const timeRightRef = ref<DropdownRef>();

const _simple = computed(() => {
  return props.simple && props.type !== "datetime";
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

const _defaultTime = computed(() => {
  if (props.type !== "datetime") return [];

  const times = isArray(props.defaultTime)
    ? props.defaultTime
    : [props.defaultTime, props.defaultTime];

  return times.map((t) => normalizeDayjsValue(t, "HH:mm:ss"));
});

const setHMS = (date: Dayjs, referDate: Dayjs) => {
  return date
    .hour(referDate.hour())
    .minute(referDate.minute())
    .second(referDate.second());
};

watch(
  () => props.modelValue,
  () => {
    const [start, end] = props.modelValue;
    startDate.value = start;
    endDate.value = end;

    const _defaultDate = getDefaultValue();
    const _leftDate = _defaultTime.value[0]
      ? setHMS(_defaultDate, _defaultTime.value[0])
      : _defaultDate;

    const _rightDate = _defaultTime.value[1]
      ? setHMS(_defaultDate.add(1, "month"), _defaultTime.value[1])
      : _defaultDate.add(1, "month");

    leftDate.value = start || _leftDate;
    rightDate.value = end || _rightDate;
  },
  { immediate: true }
);

watch(
  () => leftDate.value,
  (leftDate) => {
    const old = rightDate.value.clone();

    rightDate.value = leftDate
      .add(1, "month")
      .set("hour", old.hour())
      .set("minute", old.minute())
      .set("second", old.second());
  }
);

const leftDataList = computed(() => {
  return setDateList(leftDate.value.year(), leftDate.value.month()) || [];
});

const rightDataList = computed(() => {
  return setDateList(rightDate.value.year(), rightDate.value.month()) || [];
});

const classes = computed(() => {
  return (item: DateContentSingleDateObject) => {
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

  if (_simple.value && startDate.value && endDate.value) {
    handleConfirm();
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

const handleChangeShortcut = (shortcuts: ShortcutsType) => {
  const shortcutsValues = hookChangeShortcut(shortcuts);

  leftDate.value = shortcutsValues[0];
  rightDate.value = shortcutsValues[1];
  startDate.value = shortcutsValues[0];
  endDate.value = shortcutsValues[1];
};

const handleConfirm = () => {
  emits("pick", [startDate.value, endDate.value]);
};
</script>

<template>
  <div
    class="layui-laydate layui-laydate-range"
    :class="'layui-laydate-range-' + props.type"
  >
    <div class="layui-laydate-range-main">
      <Shortcuts @change-shortcut="handleChangeShortcut"></Shortcuts>

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
                  class="layui-laydate"
                  :modelValue="leftDate"
                  :showDate="leftDate"
                  @pick="(val: Dayjs) => handleChangeYearMonthPick(val, 'year', yearLeftRef!)"
                ></Year>
              </template>
            </LayDropdown>

            <LayDropdown ref="monthLeftRef">
              <span>{{ MONTH_NAME[leftDate.month()] }}</span>

              <template #content>
                <Month
                  class="layui-laydate"
                  :modelValue="leftDate"
                  :showDate="leftDate"
                  dateType="month"
                  @pick="(val: Dayjs) => handleChangeYearMonthPick(val, 'month', monthLeftRef!)"
                ></Month>
              </template>
            </LayDropdown>

            <LayDropdown ref="timeLeftRef" v-if="props.type === 'datetime'">
              <span>{{ leftDate.format("HH:mm:ss") }}</span>

              <template #content>
                <Time
                  class="layui-laydate"
                  :modelValue="startDate || leftDate"
                  :showDate="startDate || leftDate"
                  @pick="handleChangeLeftTimePick"
                ></Time>
              </template>
            </LayDropdown>
          </div>

          <LayIcon type="layui-icon-right" style="visibility: hidden"></LayIcon>
          <LayIcon type="layui-icon-next" style="visibility: hidden"></LayIcon>
        </div>
        <DateContent
          :classes="classes"
          :dateList="leftDataList"
          @update:model-value="handleDatePick"
          @hover-cell="handleDateHover"
        >
        </DateContent>
      </div>

      <div class="layui-laydate-main">
        <div class="layui-laydate-header">
          <LayIcon type="layui-icon-prev" style="visibility: hidden"></LayIcon>
          <LayIcon type="layui-icon-left" style="visibility: hidden"></LayIcon>
          <div class="laydate-set-ym">
            <LayDropdown ref="yearRightRef">
              <span>{{ rightDate.year() }} {{ t("datePicker.year") }}</span>
              <template #content>
                <Year
                  class="layui-laydate"
                  :modelValue="rightDate"
                  :showDate="rightDate"
                  @pick="(val: Dayjs) => handleChangeYearMonthPick(val, 'year', yearRightRef!)"
                ></Year>
              </template>
            </LayDropdown>

            <LayDropdown ref="monthRightRef">
              <span>{{ MONTH_NAME[rightDate.month()] }}</span>

              <template #content>
                <Month
                  class="layui-laydate"
                  :modelValue="rightDate"
                  :showDate="rightDate"
                  dateType="month"
                  @pick="(val: Dayjs) => handleChangeYearMonthPick(val.subtract(1, 'month'), 'month', monthRightRef!)"
                ></Month>
              </template>
            </LayDropdown>

            <LayDropdown ref="timeRightRef" v-if="props.type === 'datetime'">
              <span>{{ rightDate.format("HH:mm:ss") }}</span>

              <template #content>
                <Time
                  class="layui-laydate"
                  :modelValue="endDate || rightDate"
                  :showDate="endDate || rightDate"
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
    <Footer :showNow="false" :showConfirm="!_simple" @confirm="handleConfirm">
      {{ startDate?.format(props.inputFormat) }}
      {{ props.rangeSeparator }}
      {{ endDate?.format(props.inputFormat) }}
      <template #footer>
        <slot name="footer"> </slot>
      </template>
    </Footer>
  </div>
</template>
