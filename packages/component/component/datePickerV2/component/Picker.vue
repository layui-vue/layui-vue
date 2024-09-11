<script setup lang="ts">
import type { DatePickerProps } from "../interface";
import { computed, ref, watch } from "vue";
import dayjs from "dayjs";

import Year from "./common/Year.vue";
import Month from "./common/Month.vue";

const props = withDefaults(defineProps<DatePickerProps>(), {});

const emits = defineEmits(["pick"]);

const currentData = ref();
const currentType = ref();

watch(
  () => props.modelValue,
  () => {
    currentData.value = props.modelValue;
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

const handlePickYear = (year: number) => {
  const data = currentData.value.year(year);

  if (dateType.value === "date") {
    // Todo
  } else if (dateType.value === "yearmonth") {
    currentData.value = data;
    currentType.value = "month";
  } else {
    currentData.value = data;
    emits("pick", formatValue());
  }
};

const handlePickMonth = (month: number) => {
  const data = currentData.value.month(month);

  if (dateType.value === "date") {
    // Todo
  } else if (dateType.value === "yearmonth") {
    currentData.value = data;
    emits("pick", formatValue());
  } else {
    emits("pick", formatValue());
  }
};

const handleMonthChangeYear = (year: number) => {
  currentData.value = currentData.value.year(year);
};

const formatValue = () => {
  return dayjs(currentData.value).format(props.format);
};
</script>

<template>
  <div></div>
  <Year
    v-if="currentType === 'year'"
    :modelValue="currentData"
    :dateType="dateType"
    @pick="handlePickYear"
  ></Year>
  <Month
    v-if="currentType === 'month'"
    :model-value="currentData"
    :dateType="dateType"
    @pick="handlePickMonth"
    @year-change="handleMonthChangeYear"
    @type-change="currentType = 'year'"
  ></Month>
</template>
