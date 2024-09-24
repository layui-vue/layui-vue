<script setup lang="ts">
import dayjs, { type Dayjs } from "dayjs";
import { ref, watch } from "vue";
import type { RangePickerProps } from "./interface";

import { useI18n } from "../../../language";

import Time from "./common/Time.vue";
import Footer from "./common/Footer.vue";

const props = withDefaults(defineProps<RangePickerProps>(), {});
const emits = defineEmits(["pick"]);

const { t } = useI18n();

const startDate = ref();
const endDate = ref();

watch(
  () => props.modelValue,
  () => {
    const [start, end] = props.modelValue;
    startDate.value = start || dayjs();
    endDate.value = end || dayjs().add(1, "hour");
  },
  { immediate: true }
);

const handleLeftTimePick = (date: Dayjs) => {
  if (date.isSameOrAfter(endDate.value)) {
    startDate.value = endDate.value;
    endDate.value = date;
  } else {
    startDate.value = date;
  }
};

const handleRightTimePick = (date: Dayjs) => {
  if (date.isSameOrBefore(startDate.value)) {
    endDate.value = startDate.value;
    startDate.value = date;
  } else {
    endDate.value = date;
  }
};

const formatValue = () => {
  // format 正确传 format后的格式，否则传Date对象
  if (startDate.value && endDate.value) {
    return [startDate.value, endDate.value].map((date: Dayjs) => {
      return props.format ? date.format(props.format) : date.toDate();
    });
  } else {
    return [];
  }
};
const handleConfirm = () => {
  emits("pick", [startDate.value, endDate.value]);
};
</script>

<template>
  <div class="layui-laydate-range">
    <div class="layui-laydate-range-main">
      <Time
        :modelValue="startDate"
        :inputDate="startDate"
        @pick="handleLeftTimePick"
      >
        <template #header>
          <span class="laydate-time-text">{{ t("datePicker.startTime") }}</span>
        </template>
      </Time>
      <Time
        :modelValue="endDate"
        :inputDate="endDate"
        @pick="handleRightTimePick"
      >
        <template #header>
          <span class="laydate-time-text">{{ t("datePicker.endTime") }}</span>
        </template>
      </Time>
    </div>
    <Footer :showNow="false" @confirm="handleConfirm">
      {{ startDate?.format(props.inputFormat) }}
      {{ props.rangeSeparator }}
      {{ endDate?.format(props.inputFormat) }}
    </Footer>
  </div>
</template>
