<template>
  <div
    :class="['layui-date-picker', { 'layui-date-range-picker': range }]"
    :size="size"
  >
    <lay-dropdown
      ref="dropdownRef"
      :disabled="disabled"
      :autoFitMinWidth="false"
      :contentClass="contentClass"
      :contentStyle="contentStyle"
      updateAtScroll
    >
      <lay-input
        :name="name"
        :readonly="readonly"
        :placeholder="startPlaceholder"
        :prefix-icon="prefixIcon"
        :suffix-icon="suffixIcon"
        :disabled="disabled"
        v-model="dateValue"
        v-if="!range"
        @change="onChange"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        :allow-clear="!disabled && allowClear"
        :size="size"
        @clear="
          dateValue = '';
          onChange();
        "
      >
      </lay-input>
      <div class="laydate-range-inputs" v-else>
        <lay-input
          :readonly="readonly"
          :name="name"
          v-model="dateValue[0]"
          :placeholder="startPlaceholder"
          :disabled="disabled"
          @change="onChange"
          @blur="$emit('blur')"
          @focus="$emit('focus')"
          class="start-input"
          :size="size"
        >
        </lay-input>
        <span class="range-separator">{{ rangeSeparator }}</span>
        <lay-input
          :readonly="readonly"
          :name="name"
          :allow-clear="disabled && allowClear"
          :placeholder="endPlaceholder"
          v-model="dateValue[1]"
          :disabled="disabled"
          @change="onChange"
          @blur="$emit('blur')"
          @focus="$emit('focus')"
          class="end-input"
          :size="size"
          @clear="
            dateValue = [];
            onChange();
          "
        >
        </lay-input>
      </div>

      <template #content>
        <!-- 日期选择 -->
        <DatePanel
          v-if="!range && (showPanel === 'date' || showPanel === 'datetime')"
          v-model="currentDay"
        ></DatePanel>
        <!-- 时间选择 -->
        <TimePanel
          v-if="!range && showPanel === 'time'"
          v-model="hms"
        ></TimePanel>
        <!-- 年份选择器 -->
        <YearPanel
          v-if="!range && (showPanel === 'year' || showPanel === 'yearmonth')"
          v-model="currentYear"
        >
        </YearPanel>
        <!-- 月份选择器 -->
        <MonthPanel
          v-if="!range && showPanel === 'month'"
          v-model="currentMonth"
        ></MonthPanel>
        <!-- 范围选择 -->
        <DateRange
          v-if="range && (showPanel === 'date' || showPanel === 'datetime')"
          v-model:startTime="rangeValue.first"
          v-model:endTime="rangeValue.last"
        ></DateRange>

        <MonthRange
          v-if="range && showPanel === 'yearmonth'"
          v-model:startTime="rangeValue.first"
          v-model:endTime="rangeValue.last"
        >
        </MonthRange>
      </template>
    </lay-dropdown>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayDatePicker",
};
</script>

<script lang="ts" setup>
import "./index.less";
import dayjs from "dayjs";
import { LayIcon } from "@layui/icons-vue";
import LayInput from "../input/index.vue";
import LayDropdown from "../dropdown/index.vue";
import { getMonth, getYear, getDay } from "./day";
import {
  ref,
  watch,
  defineProps,
  defineEmits,
  reactive,
  provide,
  StyleValue,
  computed,
} from "vue";
import DatePanel from "./components/DatePanel.vue";
import TimePanel from "./components/TimePanel.vue";
import YearPanel from "./components/YearPanel.vue";
import MonthPanel from "./components/MonthPanel.vue";
import DateRange from "./components/DateRange.vue";
import MonthRange from "./components/MonthRange.vue";

export interface DatePickerProps {
  type?: "date" | "datetime" | "year" | "time" | "month" | "yearmonth";
  placeholder?: string | string[];
  modelValue?: string | number | string[];
  disabled?: boolean;
  simple?: boolean;
  name?: string;
  max?: string;
  min?: string;
  range?: boolean;
  rangeSeparator?: string;
  readonly?: boolean;
  allowClear?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  prefixIcon?: string;
  suffixIcon?: string;
  timestamp?: boolean;
  contentClass?: string | Array<string | object> | object;
  contentStyle?: StyleValue;
  format?: string;
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: "",
  type: "date",
  disabled: false,
  simple: false,
  range: false,
  rangeSeparator: "至",
  readonly: false,
  allowClear: false,
  size: "md",
  prefixIcon: "layui-icon-date",
  suffixIcon: "",
  timestamp: false,
  format: "",
});

const startPlaceholder = computed(() => {
  if (Array.isArray(props.placeholder)) {
    return props.placeholder[0];
  }
  return props.placeholder;
});

const endPlaceholder = computed(() => {
  if (Array.isArray(props.placeholder)) {
    return props.placeholder[1];
  }
  return props.placeholder;
});

const dropdownRef = ref(null);
const $emits = defineEmits(["update:modelValue", "change", "blur", "focus"]);
const hms = ref({
  hh: 0,
  mm: 0,
  ss: 0,
});
const currentYear = ref<number>(0);
const currentMonth = ref<number>(0);
const currentDay = ref<number>(0);
const showPanel = ref<string>("date");
const rangeValue = reactive({ first: "", last: "" });

let unWatch = false;
// 计算结果日期
const dateValue = props.range ? ref(["", ""]) : ref("");
const getDateValue = () => {
  unWatch = true;
  let dayjsVal;
  switch (props.type) {
    case "date":
      dayjsVal =
        currentDay.value !== -1
          ? dayjs(currentDay.value).format(
              props.format ? props.format : "YYYY-MM-DD"
            )
          : "";
      break;
    case "datetime":
      dayjsVal =
        currentDay.value !== -1
          ? dayjs(currentDay.value)
              .hour(hms.value.hh)
              .minute(hms.value.mm)
              .second(hms.value.ss)
              .format(props.format ? props.format : "YYYY-MM-DD HH:mm:ss")
          : "";
      break;
    case "year":
      dayjsVal =
        currentYear.value !== -1
          ? dayjs().year(currentYear.value).format("YYYY")
          : "";
      break;
    case "month":
      dayjsVal =
        currentMonth.value !== -1 ? (currentMonth.value + 1).toString() : "";
      break;
    case "time":
      dayjsVal = dayjs()
        .hour(hms.value.hh)
        .minute(hms.value.mm)
        .second(hms.value.ss)
        .format(props.format ? props.format : "HH:mm:ss");
      break;
    case "yearmonth":
      dayjsVal =
        currentYear.value !== -1 && currentMonth.value !== -1
          ? dayjs()
              .year(currentYear.value)
              .month(currentMonth.value)
              .format(props.format ? props.format : "YYYY-MM")
          : "";
      break;
    default:
      dayjsVal =
        currentDay.value !== -1
          ? dayjs(currentDay.value)
              .hour(hms.value.hh)
              .minute(hms.value.mm)
              .second(hms.value.ss)
              .format()
          : "";
      break;
  }
  dateValue.value = dayjsVal !== "Invalid Date" ? dayjsVal : "";
  if (dayjsVal === "Invalid Date") {
    unWatch = false;
    $emits("update:modelValue", "");
    return;
  }
  if (props.timestamp) {
    $emits("update:modelValue", dayjs(dayjsVal).unix() * 1000);
    $emits("change", dayjs(dayjsVal).unix() * 1000);
  } else {
    $emits("update:modelValue", dayjsVal);
    $emits("change", dayjsVal);
  }
  setTimeout(() => {
    unWatch = false;
  }, 0);
};
const getDateValueByRange = () => {
  unWatch = true;
  if (rangeValue.first === "" || rangeValue.last === "") {
    dateValue.value = ["", ""];
    $emits("update:modelValue", dateValue.value);
    $emits("change", dateValue.value);
    return;
  }
  let format = "YYYY-MM-DD";
  switch (props.type) {
    case "date":
      format = props.format ? props.format : "YYYY-MM-DD";
      break;
    case "datetime":
      format = props.format ? props.format : "YYYY-MM-DD HH:mm:ss";
      break;
    case "yearmonth":
      format = props.format ? props.format : "YYYY-MM";
      break;
  }
  dateValue.value = [
    dayjs(rangeValue.first).format(format),
    dayjs(rangeValue.last).format(format),
  ];
  $emits("update:modelValue", dateValue.value);
  $emits("change", dateValue.value);
  setTimeout(() => {
    unWatch = false;
  }, 0);
};

// 确认事件
const ok = () => {
  if (!props.range) {
    getDateValue();
  } else {
    getDateValueByRange();
  }
  if (dropdownRef.value)
    // @ts-ignore
    dropdownRef.value.hide();
  showPanel.value = props.type;
};

//面板类型判断
watch(
  () => props.type,
  () => {
    showPanel.value = props.type;
    if (props.type === "yearmonth" && !props.range) {
      showPanel.value = "year";
    }
  },
  { immediate: true }
);

//监听modelValue改变
watch(
  () => props.modelValue,
  () => {
    if (unWatch) {
      return;
    }
    let initModelValue: string =
      props.range && props.modelValue
        ? (props.modelValue as string[])[0] || ""
        : (props.modelValue as string);
    if (props.type === "month" || props.type === "year") {
      initModelValue += "";
    }

    hms.value.hh = isNaN(dayjs(initModelValue).hour())
      ? 0
      : dayjs(initModelValue).hour();
    hms.value.mm = isNaN(dayjs(initModelValue).minute())
      ? 0
      : dayjs(initModelValue).minute();
    hms.value.ss = isNaN(dayjs(initModelValue).second())
      ? 0
      : dayjs(initModelValue).second();

    if (initModelValue.length === 8 && props.type === "time") {
      let modelValue = initModelValue;
      modelValue = "1970-01-01 " + modelValue;
      hms.value.hh = dayjs(modelValue).hour();
      hms.value.mm = dayjs(modelValue).minute();
      hms.value.ss = dayjs(modelValue).second();
    }

    currentYear.value = initModelValue ? getYear(initModelValue) : -1;
    currentMonth.value = initModelValue ? getMonth(initModelValue) : -1;
    currentDay.value = initModelValue ? getDay(initModelValue) : -1;
    if (props.type === "date" || props.type === "datetime") {
      if (currentYear.value === -1) currentYear.value = dayjs().year();
      if (currentMonth.value === -1) currentMonth.value = dayjs().month();
      if (props.timestamp) {
        currentDay.value = initModelValue
          ? dayjs(parseInt(initModelValue)).startOf("date").unix() * 1000
          : -1;
      }
    }
    rangeValue.first = initModelValue;
    rangeValue.last =
      props.range && props.modelValue
        ? (props.modelValue as string[])[1] || ""
        : "";
    if (!props.range) {
      getDateValue();
    } else {
      getDateValueByRange();
    }
  },
  { immediate: true }
);

const onChange = () => {
  if (dropdownRef.value)
    // @ts-ignore
    dropdownRef.value.hide();
  $emits("update:modelValue", dateValue.value);
};

provide("datePicker", {
  currentYear: currentYear,
  currentMonth: currentMonth,
  currentDay: currentDay,
  dateValue: dateValue,
  type: props.type,
  showPanel: showPanel,
  hms: hms,
  ok: () => ok(),
  getDateValue: () => getDateValue,
  range: props.range,
  rangeValue: rangeValue,
  rangeSeparator: props.rangeSeparator,
  simple: props.simple,
  timestamp: props.timestamp,
});
</script>
