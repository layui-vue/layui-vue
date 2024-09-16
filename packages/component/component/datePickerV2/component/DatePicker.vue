<script setup lang="ts">
import type { UniquePickerProps } from "./interface";
import { computed, ref, watch } from "vue";
import dayjs, { type Dayjs } from "dayjs";

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

watch(
  () => dateType.value,
  (val) => {
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

  if (dateType.value === "date") {
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

  if (dateType.value === "date") {
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

const handleConfirm = (isConfirm = false) => {
  if (props.simple || isConfirm) {
    emits("pick", formatValue());
  }
};

const handleNow = () => {
  currentData.value = dayjs();
  inputDate.value = dayjs();
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
  <Date
    v-if="currentType === 'date'"
    :modelValue="currentData"
    :inputDate="inputDate"
    :dateType="dateType"
    @pick="handlePickDate"
    @year-month-change="handleDateChangeYearMonth"
    @type-change="(type) => (currentType = type)"
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
    :showConfirm="!simple"
    @confirm="handleConfirm(true)"
    @now="handleNow"
  >
    {{ footerValue() }}
  </Footer>
</template>
