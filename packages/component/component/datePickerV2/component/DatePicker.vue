<script setup lang="ts">
import type { UniquePickerProps } from "./interface";
import { computed, ref, watch } from "vue";
import dayjs, { type Dayjs } from "dayjs";

import LayButton from "../../button/index.vue";
import Date from "./common/Date.vue";
import Time from "./common/Time.vue";
import Year from "./common/Year.vue";
import Month from "./common/Month.vue";
import Footer from "./common/Footer.vue";

const props = withDefaults(defineProps<UniquePickerProps>(), {});

const emits = defineEmits(["pick"]);

const inputDate = ref<Dayjs>(dayjs());
const currentData = ref<Dayjs>(dayjs());
const currentType = ref();

watch(
  () => props.modelValue,
  () => {
    currentData.value = props.modelValue;
    inputDate.value = props.modelValue;
  },
  { immediate: true }
);

const dateType = computed(() => {
  return props.type!;
});

// 非一次性选择 || datetime|time 类型
const showConfirm = computed(() => {
  return !props.simple || ["datetime", "time"].includes(dateType.value);
});

watch(
  () => dateType.value,
  (val) => {
    if (val === "datetime") {
      currentType.value = "date";
      return;
    }
    if (val === "yearmonth") {
      currentType.value = "month";
      return;
    }
    currentType.value = val;
  },
  { immediate: true }
);

const handlePickDate = (value: Dayjs) => {
  currentData.value = value;
  handleConfirm();
};

const handlePickTime = (value: Dayjs) => {
  currentData.value = value;
  handleConfirm();
};

const handlePickYear = (year: number) => {
  const data = currentData.value.year(year);

  if (["datetime", "date"].includes(dateType.value)) {
    currentData.value = data;
    currentType.value = "date";
  } else if (dateType.value === "yearmonth") {
    currentData.value = data;
    currentType.value = "month";
  } else {
    currentData.value = data;
    handleConfirm();
  }
};

const handlePickMonth = (month: number) => {
  const data = currentData.value.month(month);

  if (["datetime", "date"].includes(dateType.value)) {
    currentData.value = data;
    currentType.value = "date";
  } else {
    currentData.value = data;
    handleConfirm();
  }
};

const handleMonthChangeYear = (year: number) => {
  currentData.value = currentData.value.year(year);
};

const handleDateChangeYearMonth = (data: Dayjs) => {
  currentData.value = data;
};

const handleToggleTimePanel = () => {
  currentType.value = currentType.value === "date" ? "time" : "date";
};

const preCondition = () => {
  // datetime类型点击确定还原当前panel为date
  if (dateType.value === "datetime") {
    currentType.value = "date";
  }
};

const handleConfirm = (isConfirm = false) => {
  if (!showConfirm.value || isConfirm) {
    preCondition();

    emits("pick", currentData.value); // formatValue()
  }
};

const handleNow = () => {
  if (dayjs().isBefore(dayjs(props.min, props.format))) {
    inputDate.value = currentData.value = dayjs(props.min, props.format);
  } else if (dayjs().isAfter(dayjs(props.max, props.format))) {
    inputDate.value = currentData.value = dayjs(props.max, props.format);
  } else {
    inputDate.value = currentData.value = dayjs();
  }
};

const formatValue = () => {
  // format 正确传 format后的格式，否则传Date对象
  return props.format
    ? dayjs(currentData.value).format(props.format)
    : dayjs(currentData.value).toDate();
};

const footerValue = () => {
  return dayjs(currentData.value).format(props.defaultFormat);
};
</script>

<template>
  <!-- 当datetime模式下 切换为time时，只通过css隐藏date模块，不销毁date模块。 -->
  <!-- 防止date内部inputDate watch 因重新渲染而再次执行。 -->
  <!-- 再次执行会导致在非simple模式下切换日期重新赋值datepicker.modelValue -->
  <Date
    v-if="currentType === 'date' || currentType === 'time'"
    v-show="currentType === 'date'"
    :modelValue="currentData"
    :inputDate="inputDate"
    :dateType="dateType"
    @pick="handlePickDate"
    @year-month-change="handleDateChangeYearMonth"
    @type-change="(type: 'year' | 'month') => (currentType = type)"
  ></Date>
  <Time
    v-if="currentType === 'time'"
    :modelValue="currentData"
    :inputDate="inputDate"
    :dateType="dateType"
    @pick="handlePickTime"
  ></Time>
  <Year
    v-if="currentType === 'year'"
    :modelValue="currentData"
    :inputDate="inputDate"
    :dateType="dateType"
    @pick="handlePickYear"
  ></Year>
  <Month
    v-if="currentType === 'month'"
    :modelValue="currentData"
    :inputDate="inputDate"
    :dateType="dateType"
    @pick="handlePickMonth"
    @year-change="handleMonthChangeYear"
    @type-change="currentType = 'year'"
  ></Month>
  <Footer
    :showConfirm="showConfirm"
    @confirm="handleConfirm(true)"
    @now="handleNow"
  >
    <LayButton
      v-if="dateType === 'datetime'"
      size="xs"
      :class="{ 'type-time': currentType === 'time' }"
      @click="handleToggleTimePanel"
      >{{ currentType === "date" ? "选择时间" : "选择日期" }}</LayButton
    >
    <template v-else>{{ footerValue() }}</template>
  </Footer>
</template>
