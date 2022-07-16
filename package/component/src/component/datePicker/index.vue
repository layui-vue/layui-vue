<template>
  <div>
    <lay-dropdown ref="dropdownRef" :disabled="disabled" :autoFitMinWidth="false">
      <lay-input readonly :name="name" :model-value="(dateValue as string)" :placeholder="placeholder"
        prefix-icon="layui-icon-date" :disabled="disabled" v-if="!range">
      </lay-input>
      <div class="laydate-range-inputs" v-else>
        <lay-input readonly :name="name" :model-value="dateValue[0]" :disabled="disabled" class="start-input">
        </lay-input>
        <span class="range-separator">{{ rangeSeparator }}</span>
        <lay-input readonly :name="name" :model-value="dateValue[1]" :disabled="disabled" class="end-input">
        </lay-input>
      </div>

      <template #content>
        <!-- 日期选择 -->
        <DatePanel v-if="!range && (showPanel === 'date' || showPanel === 'datetime')" v-model="currentDay"></DatePanel>
        <!-- 时间选择 -->
        <TimePanel v-if="!range && showPanel === 'time'" v-model="hms"></TimePanel>
        <!-- 年份选择器 -->
        <YearPanel v-if="!range && (showPanel === 'year' || showPanel === 'yearmonth')" v-model="currentYear">
        </YearPanel>
        <!-- 月份选择器 -->
        <MonthPanel v-if="!range && showPanel === 'month'" v-model="currentMonth"></MonthPanel>
        <!-- 范围选择 -->
        <DateRange v-if="range && (showPanel === 'date' || showPanel === 'datetime')"
          v-model:startTime="rangeValue.first" v-model:endTime="rangeValue.last"></DateRange>
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
import { ref, watch, defineProps, defineEmits, onMounted, reactive, provide } from "vue";
import DatePanel from './components/DatePanel.vue';
import TimePanel from './components/TimePanel.vue';
import YearPanel from './components/YearPanel.vue';
import MonthPanel from './components/MonthPanel.vue';
import DateRange from './components/DateRange.vue';

export interface LayDatePickerProps {
  type?: "date" | "datetime" | "year" | "time" | "month" | "yearmonth";
  placeholder?: string;
  modelValue?: string | string[];
  disabled?: boolean;
  simple?: boolean;
  name?: string;
  max?: string;
  min?: string;
  range?: boolean;
  rangeSeparator?: string;
}

const props = withDefaults(defineProps<LayDatePickerProps>(), {
  modelValue: "",
  type: "date",
  disabled: false,
  simple: false,
  range: false,
  rangeSeparator: '至'
});

const dropdownRef = ref(null);
const $emits = defineEmits(["update:modelValue"]);
const hms = ref({
  hh: 0,
  mm: 0,
  ss: 0,
});
const currentYear = ref<number>(0);
const currentMonth = ref<number>(0);
const currentDay = ref<number>(0);
const showPanel = ref<string>("date");
const rangeValue = reactive({ first: '', last: '' })

let unWatch = false;
// 计算结果日期
const dateValue = props.range ? ref(['', '']) : ref('');
const getDateValue = () => {
  unWatch = true;
  let dayjsVal;
  switch (props.type) {
    case "date":
      dayjsVal = currentDay.value !== -1 ? dayjs(currentDay.value).format("YYYY-MM-DD") : '';
      break;
    case "datetime":
      dayjsVal = currentDay.value !== -1 ? dayjs(currentDay.value).hour(hms.value.hh).minute(hms.value.mm).second(hms.value.ss).format("YYYY-MM-DD HH:mm:ss") : '';
      break;
    case "year":
      dayjsVal = currentYear.value !== -1 ? dayjs().year(currentYear.value).format('YYYY') : '';
      break;
    case "month":
      dayjsVal = currentMonth.value !== -1 ? (currentMonth.value + 1).toString() : '';
      break;
    case "time":
      dayjsVal = dayjs().hour(hms.value.hh).minute(hms.value.mm).second(hms.value.ss).format("HH:mm:ss");
      break;
    case "yearmonth":
      dayjsVal = dayjs().year(currentYear.value).month(currentMonth.value).format("YYYY-MM");
      break;
    default:
      dayjsVal = currentDay.value !== -1 ? dayjs(currentDay.value).hour(hms.value.hh).minute(hms.value.mm).second(hms.value.ss).format() : '';
      break;
  }
  dateValue.value = dayjsVal;
  $emits("update:modelValue", dayjsVal);
  setTimeout(() => { unWatch = false; }, 0);
};
const getDateValueByRange = () => {
  unWatch = true;
  if (rangeValue.first === '' || rangeValue.last === '') {
    dateValue.value = ['', ''];
    return;
  }
  let format = props.type === 'datetime' ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
  dateValue.value = [dayjs(rangeValue.first).format(format), dayjs(rangeValue.last).format(format)];
  $emits("update:modelValue", dateValue.value);
  setTimeout(() => { unWatch = false; }, 0);
}

// 确认事件
const ok = () => {
  if (!props.range) {
    if (props.type === 'time') {
      getDateValue()
    } else {
      getDateValue()
    }
  } else {
    getDateValueByRange()
  }
  if (dropdownRef.value)
    // @ts-ignore
    dropdownRef.value.hide();
  showPanel.value = props.type
};

//面板类型判断
watch(
  () => props.type,
  () => {
    showPanel.value = props.type;
    if (props.type === 'yearmonth') {
      showPanel.value = 'year';
    }
  },
  { immediate: true }
);

//监听modelValue改变
watch(() => props.modelValue, () => {
  if (unWatch) {
    return;
  }
  let initModelValue = props.range && props.modelValue ? (props.modelValue as string[])[0] || '' : props.modelValue as string;
  hms.value.hh = dayjs(initModelValue).hour();
  hms.value.mm = dayjs(initModelValue).minute();
  hms.value.ss = dayjs(initModelValue).second();

  if (initModelValue.length === 8 && props.type === 'time') { //dayjs 解析时间容错
    let modelValue = initModelValue;
    modelValue = '1970-01-01 ' + modelValue;
    hms.value.hh = dayjs(modelValue).hour();
    hms.value.mm = dayjs(modelValue).minute();
    hms.value.ss = dayjs(modelValue).second();
  }
  currentYear.value = getYear(initModelValue);
  currentMonth.value = getMonth(initModelValue);
  currentDay.value = getDay(initModelValue);

  rangeValue.first = initModelValue;
  rangeValue.last = props.range && props.modelValue ? (props.modelValue as string[])[1] || '' : '';
  if (!props.range) {
    getDateValue();
  } else {
    getDateValueByRange();
  }
}, { immediate: true })


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
  simple: props.simple
});
</script>
