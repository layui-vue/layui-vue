<script setup lang="ts">
import type { Dayjs } from "dayjs";
import type { DatePickerValueNotArray, Shortcuts as ShortcutsType } from "../interface";
import type {
  DateContentSingleDateObject,
  RangePickerProps,
} from "./interface";

import LayDropdown from "@layui/component/component/dropdown";
import LayIcon from "@layui/component/component/icon";
import { useI18n } from "@layui/component/language";
import dayjs from "dayjs";

import { computed, ref, watch } from "vue";
import { useBaseDatePicker } from "../hook/useBaseDatePicker";
import { useShortcutsRange } from "../hook/useShortcutsRange";
import { setDateList, setHMS } from "../util";
import DateContent from "./common/DateContent.vue";
import DatePickerRender from "./common/DatePickerRender.vue";
import Footer from "./common/Footer.vue";
import Month from "./common/Month.vue";
import Shortcuts from "./common/Shortcuts.vue";
import Time from "./common/Time.vue";
import Year from "./common/Year.vue";

const props = withDefaults(defineProps<RangePickerProps>(), {});
const emits = defineEmits(["pick"]);

const { t } = useI18n();
const {
  defaultTimeValue,
  getDefaultValue,
} = useBaseDatePicker(props);
const hookChangeShortcut = useShortcutsRange();

const startDate = ref<DatePickerValueNotArray>();
const endDate = ref<DatePickerValueNotArray>();
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

watch(
  () => props.modelValue,
  () => {
    const [start, end] = props.modelValue;
    startDate.value = start;
    endDate.value = end;

    const _defaultDate = getDefaultValue();
    const _leftDate = defaultTimeValue.value[0]
      ? setHMS(_defaultDate, defaultTimeValue.value[0])
      : _defaultDate;

    const _rightDate = defaultTimeValue.value[1]
      ? setHMS(_defaultDate.add(1, "month"), defaultTimeValue.value[1])
      : _defaultDate.add(1, "month");

    leftDate.value = start || _leftDate;
    rightDate.value = end || _rightDate;
  },
  { immediate: true },
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
  },
  { immediate: true },
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
        item.type === "current"
        && (startDate.value?.startOf("day").valueOf() === item.value
          || endDate.value?.startOf("day").valueOf() === item.value),
      "laydate-range-hover":
        item.type === "current"
        // 当前日期在开始时间之后 && 当前日期再结束(hover)时间之前 (第一次点击在前>第二次点击(hover)在后)
        // ||
        // 当前日期在开始时间之前 && 当前日期在结束(hover)时间之后 (第一次点击在后>第二次点击(hover)在前)
        && (!!(
          startDate.value
          && Date.isSameOrAfter(startDate.value, "day")
          && Date.isSameOrBefore(_endDate, "day")
        )
        || !!(
          startDate.value
          && Date.isSameOrBefore(startDate.value, "day")
          && Date.isSameOrAfter(_endDate, "day")
        )),
    };
  };
});

function handleDatePick(value: number) {
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
  }
  else if (unixDate.isSameOrBefore(startDate.value, "day")) {
    // 二次点击的时间在开始时间之前
    endDate.value = startDate.value
      .clone()
      .set("hour", rightDate.value.hour())
      .set("minute", rightDate.value.minute())
      .set("second", rightDate.value.second());
    startDate.value = _startDate;
  }
  else {
    endDate.value = _endDate;
  }

  if (_simple.value && startDate.value && endDate.value) {
    handleConfirm();
  }
}

function handleDateHover(val: number) {
  if (!startDate.value || endDate.value) {
    hoverDate.value = null;
    return;
  }

  hoverDate.value = dayjs(val);
}

// 点击year/month icon 进行切换
function handleChangeYearMonth(diffType: "add" | "subtract", type: "year" | "month") {
  leftDate.value = leftDate.value[diffType](1, type);
}

// 点击year/month进行切换
function handleChangeYearMonthLeftPick(val: Dayjs, type: "year" | "month", dropdownEl: DropdownRef) {
  const DateValue = val[type]();

  leftDate.value = leftDate.value[type](DateValue) as Dayjs;

  dropdownEl.hide();
}

function handleChangeYearMonthRightPick(val: Dayjs, type: "year" | "month", dropdownEl: DropdownRef) {
  const DateValue = val[type]();

  leftDate.value = (rightDate.value[type](DateValue) as Dayjs).subtract(
    1,
    "month",
  );

  dropdownEl.hide();
}

// 切换左侧time
function handleChangeLeftTimePick(hmsDate: Dayjs) {
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
}

// 切换右侧time
function handleChangeRightTimePick(hmsDate: Dayjs) {
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
}

function handleChangeShortcut(shortcuts: ShortcutsType) {
  const shortcutsValues = hookChangeShortcut(shortcuts);

  leftDate.value = shortcutsValues[0];
  rightDate.value = shortcutsValues[1];
  startDate.value = shortcutsValues[0];
  endDate.value = shortcutsValues[1];

  if (props.simple)
    handleConfirm();
}

function handleConfirm() {
  emits("pick", [startDate.value, endDate.value]);
}
</script>

<template>
  <div
    class="layui-laydate layui-laydate-range"
    :class="`layui-laydate-range-${props.type}`"
  >
    <div class="layui-laydate-range-main">
      <Shortcuts @change-shortcut="handleChangeShortcut" />

      <div class="layui-laydate-main layui-laydate-main-date">
        <div class="layui-laydate-header">
          <LayIcon
            type="layui-icon-prev"
            @click="handleChangeYearMonth('subtract', 'year')"
          />
          <LayIcon
            type="layui-icon-left"
            @click="handleChangeYearMonth('subtract', 'month')"
          />
          <div class="laydate-set-ym">
            <LayDropdown ref="yearLeftRef">
              <span>{{ leftDate.year() }} {{ t("datePicker.year") }}</span>
              <template #content>
                <Year
                  class="layui-laydate"
                  :model-value="leftDate"
                  :show-date="leftDate"
                  @pick="(val: Dayjs) => handleChangeYearMonthLeftPick(val, 'year', yearLeftRef!)"
                />
              </template>
            </LayDropdown>

            <LayDropdown ref="monthLeftRef">
              <span>{{ MONTH_NAME[leftDate.month()] }}</span>

              <template #content>
                <Month
                  class="layui-laydate"
                  :model-value="leftDate"
                  :show-date="leftDate"
                  @pick="(val: Dayjs) => handleChangeYearMonthLeftPick(val, 'month', monthLeftRef!)"
                />
              </template>
            </LayDropdown>

            <LayDropdown v-if="props.type === 'datetime'" ref="timeLeftRef">
              <span>{{ leftDate.format("HH:mm:ss") }}</span>

              <template #content>
                <Time
                  class="layui-laydate"
                  :model-value="startDate || leftDate"
                  :show-date="startDate || leftDate"
                  @pick="handleChangeLeftTimePick"
                />
              </template>
            </LayDropdown>
          </div>

          <LayIcon type="layui-icon-right" style="visibility: hidden" />
          <LayIcon type="layui-icon-next" style="visibility: hidden" />
        </div>
        <DateContent
          :classes="classes"
          :date-list="leftDataList"
          @update:model-value="handleDatePick"
          @hover-cell="handleDateHover"
        />
      </div>

      <div class="layui-laydate-main layui-laydate-main-date">
        <div class="layui-laydate-header">
          <LayIcon type="layui-icon-prev" style="visibility: hidden" />
          <LayIcon type="layui-icon-left" style="visibility: hidden" />
          <div class="laydate-set-ym">
            <LayDropdown ref="yearRightRef">
              <span>{{ rightDate.year() }} {{ t("datePicker.year") }}</span>
              <template #content>
                <Year
                  class="layui-laydate"
                  :model-value="rightDate"
                  :show-date="rightDate"
                  @pick="(val: Dayjs) => handleChangeYearMonthRightPick(val, 'year', yearRightRef!)"
                />
              </template>
            </LayDropdown>

            <LayDropdown ref="monthRightRef">
              <span>{{ MONTH_NAME[rightDate.month()] }}</span>

              <template #content>
                <Month
                  class="layui-laydate"
                  :model-value="rightDate"
                  :show-date="rightDate"
                  date-type="month"
                  @pick="(val: Dayjs) => handleChangeYearMonthRightPick(val, 'month', monthRightRef!)"
                />
              </template>
            </LayDropdown>

            <LayDropdown v-if="props.type === 'datetime'" ref="timeRightRef">
              <span>{{ rightDate.format("HH:mm:ss") }}</span>

              <template #content>
                <Time
                  class="layui-laydate"
                  :model-value="endDate || rightDate"
                  :show-date="endDate || rightDate"
                  @pick="handleChangeRightTimePick"
                />
              </template>
            </LayDropdown>
          </div>

          <LayIcon
            type="layui-icon-right"
            @click="handleChangeYearMonth('add', 'month')"
          />
          <LayIcon
            type="layui-icon-next"
            @click="handleChangeYearMonth('add', 'year')"
          />
        </div>
        <DateContent
          :classes="classes"
          :date-list="rightDataList"
          @update:model-value="handleDatePick"
          @hover-cell="handleDateHover"
        />
      </div>
    </div>
    <Footer :show-now="false" :show-confirm="!_simple" @confirm="handleConfirm">
      <DatePickerRender render="footer" :start="startDate" :end="endDate">
        {{ startDate?.format(props.inputFormat) }}
        {{ props.rangeSeparator }}
        {{ endDate?.format(props.inputFormat) }}
      </DatePickerRender>

      <!-- {{ startDate?.format(props.inputFormat) }}
      {{ props.rangeSeparator }}
      {{ endDate?.format(props.inputFormat) }}
      <template #footer>
        <slot name="footer" />
      </template> -->
    </Footer>
  </div>
</template>
